import { useState } from 'react';
import BeforeRecording from '../components/VoiceRecording/BeforeRecording';
import Recording from '../components/VoiceRecording/Recording';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordingComplete from '../components/VoiceRecording/RecordingComplete';

const RecordingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true },
  );
  const username = '유라';

  const startVoiceRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    stopRecording();
    setAudioUrl(mediaBlobUrl);
    setRecordingCompleted(true);
  };

  return (
    <div className='w-full h-100vh'>
      {recordingCompleted ? (
        <RecordingComplete
          username={username}
          audioUrl={audioUrl}
          moodText='오늘 데이트를 다녀와서 기분이 정말 좋아 기분 좋은 사랑 노래가 듣고 싶어'
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
    </div>
  );
};

export default RecordingPage;
