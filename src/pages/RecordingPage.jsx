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
  const userState = useSelector((state) => state.user.nickName);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [moodText, setMoodText] = useState("");

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
          const wavBlob = await convertBlobToWav(blob);
          const wavFile = new File([wavBlob], "userMood.wav", {
            type: "audio/wav",
            lastModified: new Date().getTime(),
          });
          setAudioUrl(wavFile);
          setRecordingCompleted(true);
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
    <div className='w-full h-screen relative overflow-hidden'>
      <AnimatePresence mode='wait'>
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
      </AnimatePresence>
    </div>
  );
};

export default RecordingPage;
