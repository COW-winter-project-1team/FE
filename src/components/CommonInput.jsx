const CommonInput = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-[312px] h-[52px] rounded-[20px] border-2 border-[#343434] bg-white px-4 py-2 font-[500] text-[16px] focus:outline-none '
    />
  );
};

export default CommonInput;
