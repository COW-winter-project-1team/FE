const CommonTag = ({ children }) => {
  const colors = {
    행복: 'bg-[#FFE75C]',
    슬픔: 'bg-[#9BCFF9]',
    화남: 'bg-[#F99BAB]',
    신남: 'bg-[#9BDFC4]',
    지침: 'bg-[#D8AEF5]',
  };
  return (
    <div
      className={`w-[80px] h-[34px] text-[16px] rounded-[30px] flex justify-center items-center text-black p-1 font-semibold ${
        colors[children] || 'bg-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

export default CommonTag;
