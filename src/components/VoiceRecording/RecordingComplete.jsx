import { useEffect, useState } from "react";
import CommonBtn from "../CommonBtn";
import { useNavigate } from "react-router-dom";
import ReportLoading from "../ReportLoading";
import { clovaStudio, spotifyTrackSave } from "../../api/Voice";

const RecordingComplete = ({ username, moodText }) => {
  const dummyData = `{
    "emotion": "SAD",
    "playlist": [
        {"trackName": "눈사람 (Feat. 정승환)", "artistName": "악동뮤지션"},
        {"trackName": "너였다면", "artistName": "정승환"},
        {"trackName": "나만 안되는 연애", "artistName": "볼빨간사춘기"},
        {"trackName": "그때 헤어지면 돼", "artistName": "로이킴"},
        {"trackName": "첫눈처럼 너에게 가겠다", "artistName": "에일리"},
        {"trackName": "안아줘", "artistName": "정준일"},
        {"trackName": "가끔 미치도록 네가 안고 싶어질 때가 있어", "artistName": "가을방학"},
        {"trackName": "소주 한잔", "artistName": "임창정"},
        {"trackName": "체념", "artistName": "빅마마"},
        {"trackName": "야생화", "artistName": "박효신"}
    ]
}`;

  //새롭게 적은 상태변수들
  const [emotion, setEmotion] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [reportInfo, setReportInfo] = useState('');

  const navigate = useNavigate();

  const hanldeConfirmButton = async () => {
    try {
      //case 1. 클로바 스튜디오 api 데이터
      //감정 텍스트를 감정 태그와 플레이리스트로 변환
      // const res = await clovaStudio(moodText);
      // console.log("컴포넌트 res 확인 콘솔:");
      // console.log(res, typeof res);

      //case 2.  api 테스트용 더미데이터

      // JSON 문자열을 객체로 변환해서 state에 emotion, playlist 저장
      const obj = JSON.parse(dummyData);
      console.log(obj.emotion);
      setEmotion(obj.emotion);

      console.log(obj.playlist);
      setPlaylist(obj.playlist);
    } catch (err) {
      console.log("버튼 클릭 실행 중 오류", err);
    }
  };
  //여러 개의 api 통신을 동기적으로 처리하기 위해, useEffect를 사용
  useEffect(() => {
    console.log("state 현재 상태 확인:", emotion, ",", playlist);
    if (emotion && playlist.length > 0) {
      saveTracks();
    }
  }, [emotion, playlist]);

  const saveTracks = async () => {
    try {
      console.log("스포티파이를 위한 playlist 확인:", playlist);
      const spotifyRes = await spotifyTrackSave(playlist);
      console.log("스포티파이에 저장됐는지 확인:", spotifyRes);
    } catch (error) {
      console.error("스포티파이 저장 중 오류 발생:", error);
    }
  };

  //레포트 생성 api
  // const generateReport = async () => {
  //   try {
  //     if (chatbotRes) {
  //       setLoading(false);
  //       const reportInfo = await createReport(chatbotRes);
  //       console.log("생성된 플레이리트:", reportInfo);
  //       navigate("/report");
  //     }
  //     setLoading(true); // test 해보기
  //   } catch (err) {
  //     console.log("레포트 생성 error:", err);
  //   }
  //   setLoading(true);
  // };

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ReportLoading username={username} />
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
        className='text-[14px] font-medium cursor-pointer '
        onClick={() => navigate(window.location.reload())}
      >
        다시 녹음하기
      </p>
    </div>
  );
};

export default RecordingComplete;
