import { useState } from 'react';
import data from '../data';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonBtn';

const Playlist = ({ isEditing }) => {
  const [playlists, setPlaylists] = useState([...data]);
  const navigate = useNavigate();

  const moveToSonglist = (index) => {
    if (!isEditing) {
      navigate(`/tracklist/${index}`);
    }
  };

  const deletePlaylist = (playlistId) => {
    //삭제함수
    setPlaylists((prevPlaylist) =>
      prevPlaylist.filter((playlist) => playlist.index !== playlistId),
    );
    console.log(isEditing);
  };

  if (!playlists || playlists.length === 0) {
    return (
      <p className='text-gray-400 p-4 text-center'>플레이리스트가 없습니다.</p>
    );
  }

  return (
    <div className='flex justify-center bg-[#343434]'>
      <div className='w-full max-w-4xl h-[43rem] overflow-y-auto scrollbar-hide px-4'>
        {/* //스크롤 컨테이너 */}
        <div className='grid grid-cols-2 gap-5'>
          {playlists.map((playlist, index) => (
            <div key={playlist.id} className='flex flex-col'>
              <img
                key={index}
                src={playlist.imgUrl}
                alt={playlist.title}
                onClick={() => {
                  moveToSonglist(playlist.index);
                }}
              />
              <div className='flex items-center justify-between mt-2'>
                <h3 className='text-white font-bold pt-2'>{playlist.title}</h3>
                {isEditing && (
                  <CommonButton
                    className='text-white font-bold pt-2'
                    onClick={() => deletePlaylist(playlist.index)}
                  >
                    <p>삭제</p>
                  </CommonButton>
                )}
              </div>
              <p className='text-[#FFFFFF80] font-medium'>{playlist.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
