import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommonButton from "../CommonBtn";

const Recording = ({ username, stopVoiceRecording }) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const [error, setError] = useState(null);
  // 녹음 자동 종료 타이머
  const silenceTimeoutRef = useRef(null);

  // 음량에 따른 animation bar
  const NUM_BARS = 5;
  const [bars, setBars] = useState(Array(NUM_BARS).fill(0));
  const navigate = useNavigate();

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateBars = () => {
          analyser.getByteFrequencyData(dataArray);

          const segmentSize = Math.floor(dataArray.length / NUM_BARS);
          const weights = [0.5, 0.6, 0.9, 0.8, 0.6];

          const barHeights = Array.from({ length: NUM_BARS }, (_, i) => {
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
      })
      .catch((err) => {
        console.error("마이크 접근 오류:", err);
        setError("마이크 권한을 허용하려면 브라우저 설정을 확인해주세요");
      });

    return () => {
      audioContext.close();
      clearTimeout(silenceTimeoutRef.current);
    };
  }, [stopVoiceRecording]);

  return (
    <motion.div
      initial={{ backgroundColor: "#7CE5CC", opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-[62px] bg-gradient-to-b from-[#7CE5CC] to-[#9DA2EA]'
    >
      {error ? (
        <>
          <div className='text-black font-medium text-center'>{error}</div>
          <CommonButton
            type='button'
            className='w-[180px] h-[52px] rounded-[20px] bg-[#343434] text-white text-center text-[18px] font-[500] focus:outline-none'
            onClick={() => navigate(window.location.reload())}
          >
            다시 녹음하기
          </CommonButton>
        </>
      ) : (
        <>
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
                  transition: "transform 0.1s linear",
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Recording;
