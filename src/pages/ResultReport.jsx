import Emotion from '../components/Report/emotion';
import Playlist from '../components/Report/Playlist';
import { useNavigate } from 'react-router-dom';

const ResultReport = () => {
  const navigate = useNavigate();

  const playMusic = () => {
    navigate('/');
  };
  return (
    <div className='bg-[#242723] w-full h-auto text-white flex flex-col overflow-scroll m-auto'>
      <Emotion />
      <Playlist />
      <p className='text-white text-center font-semibold text-sm mt-[72px]'>
        지금 바로 음악 재생하기
      </p>
      <img
        src='src/assets/PlayBtn.png'
        alt='play button'
        className='flex w-[47px] h-[48px] my-[23px] m-auto'
        onClick={playMusic}
      />
    </div>
  );
};

export default ResultReport;
