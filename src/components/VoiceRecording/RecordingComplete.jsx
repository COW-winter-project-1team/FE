import { useState } from 'react';
import CommonBtn from '../CommonBtn';
import { useNavigate } from 'react-router-dom';
import ReportLoading from '../ReportLoading';

const RecordingComplete = ({ username, moodText }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateReport = async () => {
    setLoading(true);
    setTimeout(() => {
      alert('API 호출 테스트 (결과 페이지 이동)');
      setLoading(false);
      navigate('/report');
    }, 5000);
  };

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
        onClick={generateReport}
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
