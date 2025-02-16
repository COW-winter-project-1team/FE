import { useState, useEffect } from "react";
import Emotion from "../components/Report/emotion";
import Playlist from "../components/Report/Playlist";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReportLoading from "../components/Loading";
import { getReportInfo } from "../api/Report";

const ResultReport = () => {
  const [searchParams] = useSearchParams();
  const playlistNumber = searchParams.get("playlistNumber");
  const [reportData, setReportData] = useState(null);

  const loadingText = "파이가 열심히 플레이리스트를 생성하고 있어요";
  const [loading, setLoading] = useState(true);

  const userName = "yura";

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

  if (!reportData || !reportData.playlist) {
    return (
      <div className='bg-[#242723] w-full h-screen flex justify-center items-center text-white overflow-y-auto'>
        <p>
          레포트 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ReportLoading loadingText={loadingText} />
      </div>
    );
  }

  return (
    <div className='bg-[#242723] w-full h-screen overflow-y-auto text-white flex flex-col'>
      {/* 감정 태그 및 플레이리스트 */}
      <div className='w-full flex flex-col items-center'>
        <Emotion emotion={reportData.playlist.emotion} userName={userName} />
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
  );
};

export default ResultReport;
