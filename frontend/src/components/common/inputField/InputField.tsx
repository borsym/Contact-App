import { FieldApi } from "@tanstack/react-form";

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
const InputField = (
  form: any,
  handleFieldChange: (fieldName: string, value: string) => void,
  label: string,
  placeholder: string,
  name: string,
  type: string = "text",
  validators: any = {},
  inputClassName: string = "w-[316px] h-10 px-3 py-2 text-white bg-[#1E1E1E] border border-[#282828] rounded-lg focus:border-[#414141] active:bg-[#282828] active:border-[#414141] hover:border-[#373737]",
  labelClassName: string = "text-[#FFFFFF8F]",
  containerClassName: string = "flex flex-col"
) => {
  return (
    <div className={containerClassName}>
      <form.Field
        validators={validators}
        name={name}
        children={(field) => (
          <>
            <label htmlFor={field.name} className={labelClassName}>
              {label}
            </label>
            <input
              placeholder={placeholder}
              type={type}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value);
                handleFieldChange(field.name, e.target.value);
              }}
              className={inputClassName}
            />
            <FieldInfo field={field} />
          </>
        )}
      />
    </div>
  );
};

export default InputField;
