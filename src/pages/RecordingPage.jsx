import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { AnimatePresence } from "framer-motion";
import BeforeRecording from "../components/VoiceRecording/BeforeRecording";
import Recording from "../components/VoiceRecording/Recording";
import RecordingComplete from "../components/VoiceRecording/RecordingComplete";
import { convertVoiceToText } from "../api/Voice";
import { useSelector } from "react-redux";

// WebM → WAV 변환 함수
const convertBlobToWav = async (webmBlob) => {
  const arrayBuffer = await webmBlob.arrayBuffer();
  return new Blob([arrayBuffer], { type: "audio/wav" });
};

const RecordingPage = () => {
  //리덕스 데이터로 이름 전역관리
  const userState = useSelector((state) => state.user.nickName);
  //음성녹음 상태 관리
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  //case1. STT api 사용
  const [moodText, setMoodText] = useState("");
  //case2. STT 더미데이터 사용

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true },
  );

  const startVoiceRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    stopRecording();
    setRecordingCompleted(true);
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then(async (blob) => {
          //WebM → WAV 변환
          const wavBlob = await convertBlobToWav(blob);
          const wavFile = new File([wavBlob], "userMood.wav", {
            type: "audio/wav",
            lastModified: new Date().getTime(),
          });
          setAudioUrl(wavFile);
          setRecordingCompleted(true);
          // Clova STT API 요청
          try {
            const VoiceToText = await convertVoiceToText(wavFile);
            setMoodText(VoiceToText.text);
          } catch (err) {
            console.error("음성 인식 오류:", err);
          }
        })
        .catch((err) => console.log("파일 변환 오류: ", err));
    }
  }, [mediaBlobUrl]);

  return (
    <div className='w-full h-100vh'>
      {recordingCompleted ? (
        <RecordingComplete
          username={userState}
          audioUrl={audioUrl}
          moodText={moodText}
        />
      ) : isRecording ? (
        <Recording
          username={userState}
          mediaBlobUrl={mediaBlobUrl}
          stopVoiceRecording={stopVoiceRecording}
        />
      ) : (
        <BeforeRecording
          username={userState}
          startVoiceRecording={startVoiceRecording}
        />
      )}
    <div className='w-full h-100vh relative overflow-hidden'>
      <AnimatePresence mode='wait'>
        {recordingCompleted ? (
          <RecordingComplete
            username={username}
            audioUrl={audioUrl}
            moodText={moodText}
          />
        ) : isRecording ? (
          <Recording
            username={username}
            mediaBlobUrl={mediaBlobUrl}
            stopVoiceRecording={stopVoiceRecording}
          />
        ) : (
          <BeforeRecording
            username={username}
            startVoiceRecording={startVoiceRecording}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecordingPage;
