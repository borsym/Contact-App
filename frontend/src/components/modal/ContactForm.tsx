import { FieldApi, useForm } from "@tanstack/react-form";
import { useContacts } from "../../hooks/useContacts";
import { useModalContext } from "../../context/ModalContext";
import { LOCAL_STORAGE_KEY } from "../../utilts";
import { ChangeIcon, DeleteIcon, PlusIcon } from "../../assets/icons/Icons";
import React, { useState, useEffect } from "react";
import { ImageUploadProps, MockIdProps, UserProps } from "../../types/types";
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

const ContactForm: React.FC<MockIdProps> = ({ userId }) => {
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

      try {
        if (isEditMode && currentContact) {
          await updateContactMutation.mutateAsync({
            contactId: currentContact.id,
            contact: value,
          });
        } else {
          await createContactMutation.mutateAsync({
            userId: userId,
            contact: value,
          });
        }
        closeModal();
      } catch (error: any) {
        alert(error.message);
      }
    },
  });

  const [imagePreview, setImagePreview] = useState<string>(defaultAvatar);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isImgChanged, setIsImgChanged] = useState(false);

  useEffect(() => {
    const updateImagePreview = () => {
      if (isDeleted) {
        setImagePreview(defaultAvatar);
      } else if (isEditMode && currentContact && !isImgChanged) {
        setImagePreview(currentContact.imageName || defaultAvatar);
      } else if (
        form.state.values.imageName &&
        form.state.values.imageName !== defaultAvatar
      ) {
        const objectUrl =
          typeof form.state.values.imageName === "string"
            ? form.state.values.imageName
            : URL.createObjectURL(
                form.state.values.imageName as Blob | MediaSource
              );

        setImagePreview(objectUrl);
        return () => {
          if (typeof objectUrl !== "string") {
            URL.revokeObjectURL(objectUrl);
          }
        };
      } else {
        setImagePreview(defaultAvatar);
      }
    };

    updateImagePreview();
  }, [
    isEditMode,
    currentContact,
    form.state.values.imageName,
    isDeleted,
    isImgChanged,
  ]);

  const handleFieldChange = (fieldName: string, value: string) => {
    const updatedFormData = { ...form.state.values, [fieldName]: value };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData));
  };

  const handleImageChange = (
    field: FieldApi<any, any, any, any>,
    file: File | null
  ) => {
    setIsDeleted(false);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setIsImgChanged(true);
      field.handleChange(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(defaultAvatar);
    }
  };

  const handleImageDelete = (field: FieldApi<any, any, any, any>) => {
    setIsDeleted(true);
    setIsImgChanged(false);
    field.handleChange(defaultAvatar);
    setImagePreview(defaultAvatar);
  };
  const handleCancel = () => {
    if (isEditMode) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    form.reset();
    closeModal();
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
            <h2 className="font-medium text-white mb-6 font-glysa">
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
              <ImageUploadField
                form={form}
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                handleImageDelete={handleImageDelete}
              />
            </div>

            <CustomInputField
              form={form}
              handleFieldChange={handleFieldChange}
              placeholder="Jamie Wright"
              label="Name"
              name="name"
              type="text"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: ({ value }) =>
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
              placeholder="+01 234 5678"
              label="Phone number"
              name="phoneNumber"
              type="tel"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: ({ value }) =>
                  !value
                    ? "A phone number is required"
                    : !/^\+?\d{10,20}$/.test(value)
                    ? "Invalid phone number"
                    : undefined,
              }}
            />
            <CustomInputField
              form={form}
              handleFieldChange={handleFieldChange}
              label="Email address"
              placeholder="jamie.wright@mail.com"
              name="email"
              type="email"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: ({ value }) =>
                  !value
                    ? "An email is required"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? "Invalid email address"
                    : undefined,
              }}
            />
          </div>
          <div className="min-w-[364px] flex justify-end items-center pt-6 pr-6 gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
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

function ImageUploadField({
  form,
  imagePreview,
  handleImageChange,
  handleImageDelete,
}: ImageUploadProps) {
  return (
    <form.Field
      name="imageName"
      children={(field) => (
        <>
          <div className="flex items-center">
            <label
              htmlFor={field.name}
              className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
            >
              <Button
                icon={
                  form.state.values.imageName &&
                  form.state.values.imageName !== defaultAvatar ? (
                    <ChangeIcon />
                  ) : (
                    <PlusIcon />
                  )
                }
                label={
                  form.state.values.imageName &&
                  form.state.values.imageName !== defaultAvatar
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
                  const file = e.target.files ? e.target.files[0] : null;
                  handleImageChange(field, file);
                }}
              />
            </label>
            {imagePreview !== defaultAvatar && (
              <Button
                icon={<DeleteIcon />}
                onClick={() => handleImageDelete(field)}
              />
            )}
          </div>
          <FieldInfo field={field} />
        </>
      )}
    />
  );
}
