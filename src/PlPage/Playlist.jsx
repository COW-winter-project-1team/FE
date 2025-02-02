import data from '../data';
import { useNavigate } from 'react-router-dom';

const Playlist = () => {
  const playlists = [...data];
  const navigate = useNavigate();
  const moveToSonglist = (index) => {
    navigate(`/tracklist/${index}`);
  };
  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-4xl h-[43rem] overflow-y-auto scrollbar-hide px-4 '>
        {/* //스크롤 컨테이너 */}
        <div className='grid grid-cols-2 gap-5'>
          {playlists.map((playlist, index) => (
            <div className='flex flex-col'>
              <img
                key={index}
                src={playlist.imgUrl}
                alt={playlist.title}
                onClick={() => {
                  moveToSonglist(playlist.index);
                }}
              />
              <h3 className='text-white font-bold'>{playlist.title}</h3>
              <p className='text-[#FFFFFF80] font-medium'>{playlist.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
