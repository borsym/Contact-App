import { FieldApi, useForm } from "@tanstack/react-form";
import { useContacts } from "../../hooks/useContacts";
import { useModalContext } from "../../context/ModalContext";
import { LOCAL_STORAGE_KEY } from "../../utilts";
import { ChangeIcon, PlusIcon } from "../../assets/icons/Icons";
import { useState, useEffect } from "react";
import { UserProps } from "../../types/types";
import defaultAvatar from "../../assets/images/default.png";
import Button from "../common/button/Button";
import CustomInputField from "../common/inputField/InputField";

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
  const { createContactMutation, updateContactMutation } = useContacts();
  const { currentContact, closeModal } = useModalContext();
  const isEditMode = !!currentContact;

  const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialFormData: UserProps = currentContact ||
    JSON.parse(savedFormData) || {
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      imageName: null,
    };

  const form = useForm({
    defaultValues: initialFormData,
    onSubmit: async ({ value }) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      if (isEditMode && currentContact) {
        await updateContactMutation.mutateAsync({
          contactId: currentContact.id,
          contact: value,
        });
      } else {
        await createContactMutation.mutateAsync({
          userId: "96deb1b9-d39a-4958-95d3-51f6843fab54",
          contact: value,
        });
      }

      closeModal();
    },
  });

  const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);

  useEffect(() => {
    if (isEditMode && currentContact) {
      setImagePreview((currentContact.imageName as string) || defaultAvatar);
    } else if (form.state.values.imageName) {
      const objectUrl = URL.createObjectURL(
        form.state.values.imageName as unknown as Blob | MediaSource
      );
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(defaultAvatar);
    }
  }, [isEditMode, currentContact, form.state.values.imageName]);

  const handleFieldChange = (fieldName: string, value: string) => {
    const updatedFormData = { ...form.state.values, [fieldName]: value };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData));
  };

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
                name="imageName"
                children={(field) => (
                  <>
                    <label className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white">
                      <Button
                        icon={
                          isEditMode && currentContact?.imageName ? (
                            <ChangeIcon />
                          ) : (
                            <PlusIcon />
                          )
                        }
                        label={
                          form.state.values.imageName ||
                          (isEditMode && currentContact?.imageName)
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
                          const file = e.target.files
                            ? e.target.files[0]
                            : defaultAvatar;
                          field.handleChange(file);
                          if (file) {
                            const objectUrl = URL.createObjectURL(file);
                            setImagePreview(objectUrl);
                            return () => URL.revokeObjectURL(objectUrl);
                          }
                        }}
                      />
                    </label>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <CustomInputField
              form={form}
              handleFieldChange={handleFieldChange}
              label="Name"
              placeholder="Name"
              name="name"
              type="text"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "A name is required"
                    : value.length < 3
                    ? "Name must be at least 3 characters"
                    : undefined,
              }}
            />
            <CustomInputField
              form={form}
              handleFieldChange={handleFieldChange}
              label="Phone Number"
              placeholder="Phone number"
              name="phoneNumber"
              type="tel"
            />
            <CustomInputField
              form={form}
              handleFieldChange={handleFieldChange}
              label="Email"
              placeholder="email"
              name="email"
              type="email"
            />
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
