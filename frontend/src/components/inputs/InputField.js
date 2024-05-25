// Create a file for InputField component, e.g., InputField.js

import React from 'react';

const InputField = ({ label, id, name, value, onChange, type, autoComplete, placeholder, forgotLink }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {forgotLink && (
        <div className="mt-2 text-sm">
          <a href={forgotLink} className="font-semibold text-gray hover:text-black-500">
            Forgot password?
          </a>
        </div>
      )}
    </div>
  );
};

export default InputField;
