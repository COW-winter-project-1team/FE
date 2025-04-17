import { useState } from "react";

const EmotionTag = ({ children, isActive }) => {
  const colors = {
    행복: "border-[#FFE75C] bg-[#FFE75C]/20 hover:bg-[#FFE75C] active:bg-[#FFE75C]",
    슬픔: "border-[#82C7FF] bg-[#82C7FF]/20 hover:bg-[#82C7FF] active:bg-[#82C7FF]",
    화남: "border-[#FF5875] bg-[#FF5875]/20 hover:bg-[#FF5875] active:bg-[#FF5875]",
    신남: "border-[#9BDFC4] bg-[#9BDFC4]/20 hover:bg-[#9BDFC4] active:bg-[#9BDFC4]",
    지침: "border-[#D8AEF5] bg-[#D8AEF5]/20 hover:bg-[#D8AEF5] active:bg-[#D8AEF5]",
  };

  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`w-[80px] h-[34px] text-[16px] rounded-[30px] flex justify-center items-center text-white p-1 font-medium border-2 transition-all duration-300 ease-in-out
        ${isActive ? colors[children] : "border-gray-300 text-gray-400 bg-transparent"}
        ${clicked && isActive ? colors[children].split(" ")[1] : ""}
      `}
      onClick={() => setClicked(!clicked)}
    >
      {children}
    </div>
  );
};

export default EmotionTag;
