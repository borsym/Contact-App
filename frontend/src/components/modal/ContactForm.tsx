import { FieldApi, useForm } from "@tanstack/react-form";
import { useUsers } from "../../hooks/useUsers";
import { useModalContext } from "../../context/ModalContext";
import { LOCAL_STORAGE_KEY } from "../../utilts";
import { PlusIcon } from "../../assets/icons/Icons";
import defaultAvatar from "../../assets/images/default.png";
import InputField from "../common/inputField/InputField";
import Button from "../common/button/Button";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500 text-sm">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const ContactForm = () => {
  const { addUserMutation, updateUserMutation } = useUsers();
  const { currentContact, closeModal } = useModalContext();
  const isEditMode = !!currentContact;

  const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialFormData = currentContact ||
    JSON.parse(savedFormData) || {
      name: "",
      email: "",
      phoneNumber: "",
      imgUrl: null,
    };

  const form = useForm({
    defaultValues: initialFormData,
    onSubmit: async ({ value }) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      const formData = new FormData();
      formData.append("file", value.imgUrl);
      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              name: value.name,
              email: value.email,
              phoneNumber: value.phoneNumber,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (isEditMode && currentContact) {
        await updateUserMutation.mutateAsync({
          ...value,
          id: currentContact.id,
        });
      } else {
        await addUserMutation.mutateAsync(value);
      }

      closeModal();
    },
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    const updatedFormData = { ...form.state.values, [fieldName]: value };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData));
  };

  const imagePreview = isEditMode
    ? currentContact.imgUrl || defaultAvatar
    : form.state.values.imgUrl
    ? URL.createObjectURL(form.state.values.imgUrl)
    : defaultAvatar;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[364px] h-[540px] bg-[#141414] rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="min-w-[316px] min-h-[404px] p-6 space-y-5">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {isEditMode ? "Edit contact" : "Add contact"}
            </h2>
            <div className="flex items-center">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <form.Field
                name="imgUrl"
                children={(field) => (
                  <>
                    <label className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white">
                      <Button
                        icon={<PlusIcon />}
                        onClick={() => {}}
                        label={
                          form.state.values.imgUrl ||
                          (isEditMode && currentContact?.imgUrl)
                            ? "Change picture"
                            : "Add picture"
                        }
                      />
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          field.handleChange(
                            e.target.files ? e.target.files[0] : null
                          );
                        }}
                      />
                    </label>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            {InputField(
              form,
              handleFieldChange,
              "Name",
              "Name",
              "name",
              "text",
              {
                onChange: ({ value }) =>
                  !value
                    ? "A name is required"
                    : value.length < 3
                    ? "Name must be at least 3 characters"
                    : undefined,
              }
            )}
            {InputField(
              form,
              handleFieldChange,
              "Phone Number",
              "Phone number",
              "phoneNumber"
            )}
            {InputField(
              form,
              handleFieldChange,
              "Email",
              "email",
              "email",
              "email"
            )}
          </div>
          <div className="min-w-[364px] flex justify-end items-center pt-6 pr-6 gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              label="Cancel"
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  disabled={!canSubmit}
                  label={isSubmitting ? "..." : "Done"}
                />
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
