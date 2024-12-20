import React from 'react'

const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <label className="form-control w-full max-w-xs mb-4">
      <div className="label">
        <span className="label-text capitalize font-normal">{label}</span>
      </div>
      <input
        name={name}
        type={type}
        placeholder="Type here"
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </label>
  )
}

export default FormInput
