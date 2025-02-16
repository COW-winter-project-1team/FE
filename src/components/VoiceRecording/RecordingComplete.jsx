import { useEffect, useState } from "react";
import CommonBtn from "../CommonBtn";
import { useNavigate } from "react-router-dom";
import ReportLoading from "../ReportLoading";
import { clovaStudio, createReport, spotifyTrackSave } from "../../api/Voice";

const RecordingComplete = ({ username, moodText }) => {
  const [emotion, setEmotion] = useState("");
  const [title, setTitle] = useState("그날의 무디파이 추천 노래");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("파이가 음성을 분석 중이에요");

  const navigate = useNavigate();

  const hanldeConfirmButton = async () => {
    try {
      setLoading(true);
      // clova Studio chatbot api 연결
      const clovaRes = await clovaStudio(moodText);
      const obj = JSON.parse(clovaRes);
      setTitle(obj.title);
      setEmotion(obj.emotion);
      setPlaylist(obj.playlist);
    } catch (err) {
      console.log("버튼 클릭 실행 중 오류", err);
    }
  };
  //화면 렌더링 전 로딩화면
  useEffect(() => {
    if (moodText) {
      setLoading(false);
    }
  }, [moodText]);

  useEffect(() => {
    if (emotion && title && playlist.length > 0) {
      saveTracks();
    }
  }, [emotion, title, playlist]);

  //트랙 생성
  const saveTracks = async () => {
    try {
      setLoadingText("파이가 열심히 플레이리스트를 생성하고 있어요");
      //스포티파이 api 호출
      const spotifyRes = await spotifyTrackSave(playlist);
      const reportInfo = {
        "title": title,
        "playlistImage": spotifyRes.data.data[0].imageUrl,
        "emotion": emotion,
        "trackIds": spotifyRes.data.data.map((track) => track.trackId),
      };

      //플레이리스트 생성
      const reportRes = await createReport(reportInfo);
      navigate(`/report?playlistNumber=${reportRes.data.playlistNumber}`);
    } catch (err) {
      console.error("플레이리스트 생성 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ReportLoading username={username} loadingText={loadingText} />
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#7CE5CC] to-[#9DA2EA]'>
      <div>
        <p className='text-center text-[16px] font-semibold mb-[40px]'>
          파이가 분석한 {username} 님의 현재 기분
        </p>
        <textarea
          className='w-[280px] h-[150px] rounded-md text-[14px] text-center p-4 resize-none focus:outline-none mb-[40px] font-medium'
          value={moodText}
          readOnly
        />
      </div>

      <CommonBtn
        className='w-[180px] h-[52px] rounded-[20px] bg-[#343434] text-white text-center text-[22px] font-[500] focus:outline-none mb-[15px]'
        onClick={hanldeConfirmButton}
      >
        확인
      </CommonBtn>

      <p
        className='text-[14px] font-medium cursor-pointer'
        onClick={() => navigate(window.location.reload())}
      >
        다시 녹음하기
      </p>
    </div>
  );
};

export default RecordingComplete;
