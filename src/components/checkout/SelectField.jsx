export default function SelectField({
  label,
  required = false,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  valueKey = "id",
  labelKey = "name",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

<select
  value={value}
  onChange={onChange}
  className={`w-full h-11 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  {...props}
>
  <option value="">{placeholder}</option>

  {options.map((option) => (
    <option key={option[valueKey]} value={option[valueKey]}>
      {option[labelKey]}
    </option>
  ))}
</select>
    </div>
  );
}