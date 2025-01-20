import React from 'react';

const SignupInput = ({
  InputedText,
  Placeholder,
  inputType,
  value,
  onChange,
}) => {
  return (
    <div>
      <p className='block text-sm font-bold text-gray-700 mb-1 m-1 my-2'>
        {InputedText}
      </p>
      <input
        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        type={inputType}
        placeholder={Placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default SignupInput;
