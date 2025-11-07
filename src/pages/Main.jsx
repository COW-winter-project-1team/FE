import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CommonButton from "../components/ui/CommonBtn";
import MainHeader from "../components/header/MainHeader";

const Main = () => {
  const navigate = useNavigate();
  const generatePlaylist = () => {
    navigate("/recording");
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className='bg-[#242723] w-screen h-screen'
      >
        <MainHeader isHide='fontLogo' />

        <div className='flex flex-col items-center justify-center p-8  space-y-[2.125rem] text-center'>
          <img
            src='src/assets/EngLogo.png'
            alt='fontLogo'
            className='m-auto w-[15.625rem]'
          />

          <p className='text-[#A8A8A8] font-bold text-1 '>
            생성한 플레이리스트가 아직 없어요
            <br /> 지금 바로 생성하러 갈까요?
          </p>

          <CommonButton
            className='bg-[#343434] text-white w-[7.813rem] h-[2.5rem] rounded-2xl font-[500]'
            onClick={generatePlaylist}
          >
            생성하기
          </CommonButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Main;
