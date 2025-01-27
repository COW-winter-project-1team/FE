import { useRef, useEffect, useState } from 'react';

const Recording = ({ username, stopVoiceRecording }) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // 녹음 자동 종료 타이머
  const silenceTimeoutRef = useRef(null);

  // 음량에 따른 animation bar
  const [bars, setBars] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateBars = () => {
        analyser.getByteFrequencyData(dataArray);

        const numBars = bars.length;
        const segmentSize = Math.floor(dataArray.length / numBars);

        const weights = [0.5, 0.6, 0.9, 0.8, 0.6];

        const barHeights = Array.from({ length: numBars }, (_, i) => {
          const start = i * segmentSize;
          const end = start + segmentSize;
          const slice = dataArray.slice(start, end);

          const average =
            slice.reduce((sum, value) => sum + value, 0) / slice.length;

          const normalized = average / (Math.max(...slice) || 1);

          const baseHeight = Math.max(normalized * 170 * weights[i], 50);
          return Math.min(baseHeight, 170);
        });

        setBars(barHeights);
        requestAnimationFrame(updateBars);
      };
      updateBars();

      const detectSilence = () => {
        analyser.getByteFrequencyData(dataArray);
        const averageVolume =
          dataArray.reduce((a, b) => a + b) / dataArray.length;

        if (averageVolume < 50) {
          if (!silenceTimeoutRef.current) {
            silenceTimeoutRef.current = setTimeout(() => {
              stopVoiceRecording();
            }, 3000);
          }
        } else {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        requestAnimationFrame(detectSilence);
      };
      detectSilence();
    });

    return () => {
      audioContext.close();
      clearTimeout(silenceTimeoutRef.current);
    };
  }, [stopVoiceRecording, bars.length]);
  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#7CE5CC] to-[#9DA2EA] gap-[62px] '>
      <div>
        <p className='text-[16px] font-[600]'>
          파이가 {username} 님의 음성을 듣고 있어요
        </p>
      </div>
      <img
        src='src/assets/Note.png'
        alt='note'
        className='flex mx-auto w-[16px] h-[auto] mb-4'
      />
      <div className='w-[200px] h-[100px] flex justify-between items-center'>
        {bars.map((bar, index) => (
          <div
            key={index}
            className='w-[200px] bg-white rounded-xl transform origin-center mx-1'
            style={{
              height: `${bar}px`,
              transform: `scaleY(${bar / 100})`,
              transition: 'transform 0.1s linear',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Recording;
