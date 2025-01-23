const CommonTag = ({ children }) => {
  const colors = {
    행복: 'border-[#FFE75C]',
    슬픔: 'border-[#82C7FF]',
    화남: 'border-[#FF5875]',
    신남: 'border-[#9BDFC4]',
    지침: 'border-[#D8AEF5]',
  };
  return (
    <div
      className={`w-[80px] h-[34px] text-[16px] rounded-[30px] flex justify-center items-center text-white p-1 font-medium border-2  ${
        colors[children] || 'bg-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

export default CommonTag;
