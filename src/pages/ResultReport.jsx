import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Emotion from "../components/Report/emotion";
import Playlist from "../components/Report/Playlist";
import Loading from "../components/Loading";
import { getReportInfo } from "../api/Report";
import { useSelector } from "react-redux";

const ResultReport = () => {
  const [searchParams] = useSearchParams();
  const playlistNumber = searchParams.get("playlistNumber");
  const [reportData, setReportData] = useState(null);

  const loadingText = "파이가 열심히 플레이리스트를 생성하고 있어요";
  const [loading, setLoading] = useState(true);

  //리덕스로 닉네임 관리
  const userName = useSelector((state) => state.user.nickName);

  const navigate = useNavigate();
  const playMusic = () => {
    navigate("/main");
  };

  useEffect(() => {
    const fetchReportData = async () => {
      if (!playlistNumber) return;
      try {
        const res = await getReportInfo(playlistNumber);
        setReportData(res.data.data);
      } catch (err) {
        console.log("레포트 데이터 패치 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, [playlistNumber]);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loading loadingText={loadingText} />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className='w-full flex flex-col justify-center gap-[38px]'
      >
        <div className='bg-[#242723] w-full h-screen overflow-y-auto text-white flex flex-col'>
          {/* 감정 태그 및 플레이리스트 */}
          <div className='w-full flex flex-col items-center'>
            <Emotion
              emotion={reportData.playlist.emotion}
              userName={userName}
            />
            <Playlist reportData={reportData} />
          </div>
          <div className='w-full flex flex-col items-center mt-8 pb-16'>
            <p className='text-white text-center font-semibold text-sm'>
              지금 바로 음악 재생하기
            </p>
            <img
              src='src/assets/PlayBtn.png'
              alt='play button'
              className='w-[47px] h-[48px] mt-4 cursor-pointer'
              onClick={playMusic}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultReport;
