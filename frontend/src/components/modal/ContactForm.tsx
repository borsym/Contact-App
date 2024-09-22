import { FieldApi, useForm } from "@tanstack/react-form";
import { useUsers } from "../../hooks/useUsers";
import { useModalContext } from "../../context/ModalContext";
import { LOCAL_STORAGE_KEY } from "../../utilts";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
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
      MyImage: null,
    };

  const form = useForm({
    defaultValues: initialFormData,
    onSubmit: async ({ value }) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      const formData = new FormData();
      formData.append("file", value.MyImage);
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

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Add contact</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A name is required"
                  : value.length < 3
                  ? "Name must be at least 3 characters"
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    handleFieldChange(field.name, e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        {/* Email field */}
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "An email is required"
                  : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "Invalid email address"
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Email:</label>
                <input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    handleFieldChange(field.name, e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        {/* Phone number field */}
        <div>
          <form.Field
            name="phoneNumber"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A phone number is required"
                  : !/^\+?[1-9]\d{1,14}$/.test(value)
                  ? "Invalid phone number"
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Phone number:</label>
                <input
                  type="tel"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    handleFieldChange(field.name, e.target.value);
                  }}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        {/* Image upload field */}
        <div>
          <form.Field name="MyImage">
            {(field) => (
              <>
                <label htmlFor={field.name}>Profile picture:</label>
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  onChange={(e) => {
                    field.handleChange(
                      e.target.files ? e.target.files[0] : null
                    );
                  }}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : isEditMode ? "Update" : "Add"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default ContactForm;
