import { motion } from "framer-motion";
import VoiceBtn from "../VoiceBtn";
import { useState } from "react";

const BeforeRecording = ({ username, startVoiceRecording }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  const handleClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      startVoiceRecording();
    }, 400); // 애니메이션 지속 시간과 동일하게 설정
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={startAnimation ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-[70px] bg-gradient-to-b from-white to-gray-700'
    >
      <div>
        <p className='text-[16px] font-[600]'>파이에게 {username} 님의</p>
        <p className='text-[16px] font-[600]'>기분을 말해 주세요</p>
      </div>
      <img
        src='src/assets/Note.png'
        alt='note'
        className='flex mx-auto w-[16px] h-[auto]'
      />
      <VoiceBtn onClick={handleClick} />
    </motion.div>
  );
};

export default BeforeRecording;
