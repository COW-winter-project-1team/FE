import { useParams } from 'react-router-dom';
import data from '../data';
import CommonButton from '../components/CommonBtn';
const PlaylistBackground = ({ isEdit, trackHandler }) => {
  const playlistsData = [...data];
  const { index } = useParams();
  const playlistId = Number(index);
  const playlist = playlistsData.find((song) => song.index === playlistId);

  return (
    <div className='relative  w-full h-64 md:h-80 lg:h-96 overflow-hidden'>
      <img
        src={playlist.imgUrl}
        alt={playlist.title}
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div>
        //편집모드 버튼
        <CommonButton
          className='absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm'
          onClick={trackHandler}
        >
          {isEdit ? '완료' : '편집'}
        </CommonButton>
      </div>
      <CommonButton className='absolute bottom-4 right-4 w-12 h-12 bg-white text-black p-2 rounded-full'>
        ▶
      </CommonButton>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center'>
        <h1 className='text-3xl font-bold'>{playlist.title}</h1>

        <p className='pt-4'>감정태그자리</p>
      </div>
    </div>
  );
};

export default PlaylistBackground;
