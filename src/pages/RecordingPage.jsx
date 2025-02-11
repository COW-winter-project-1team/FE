import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import BeforeRecording from '../components/VoiceRecording/BeforeRecording';
import Recording from '../components/VoiceRecording/Recording';
import RecordingComplete from '../components/VoiceRecording/RecordingComplete';
import { convertVoiceToText } from '../api/Voice';

// WebM → WAV 변환 함수
const convertBlobToWav = async (webmBlob) => {
  const arrayBuffer = await webmBlob.arrayBuffer();
  return new Blob([arrayBuffer], { type: 'audio/wav' });
};

const RecordingPage = () => {
  //음성녹음 상태 관리
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  //STT 결과 텍스트
  const [moodText, setMoodText] = useState('');

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
    setRecordingCompleted(true);
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then(async (blob) => {
          //WebM → WAV 변환
          const wavBlob = await convertBlobToWav(blob);
          const wavFile = new File([wavBlob], 'userMood.wav', {
            type: 'audio/wav',
            lastModified: new Date().getTime(),
          });
          setAudioUrl(wavFile);
          setRecordingCompleted(true);
          // Clova STT API 요청
          try {
            const VoiceToText = await convertVoiceToText(wavFile);
            setMoodText(VoiceToText.text);
          } catch (err) {
            console.error('음성 인식 오류:', err);
          }
        })
        .catch((err) => console.log('파일 변환 오류: ', err));
    }
  }, [mediaBlobUrl]);

  return (
    <div className='w-full h-100vh'>
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
    </div>
  );
};

export default RecordingPage;
