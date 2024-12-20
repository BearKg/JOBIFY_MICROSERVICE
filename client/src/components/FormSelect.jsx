const FormSelect = ({ label, name, defaultValue, size, list }) => {
  return (
    <label className="form-control w-full max-w-xs mb-4">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <select
        className={`select select-bordered ${size}`}
        name={name}
        defaultValue={defaultValue}
        id={name}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </label>
  )
}
export default FormSelect
