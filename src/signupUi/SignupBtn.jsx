import React from 'react';

const SignupBtn = ({ InputedText }) => {
  return (
    <button
      type='submit'
      className='flex justify-center ml-14 mt-5 w-40 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300'
    >
      {InputedText}
    </button>
  );
};

export default SignupBtn;
