import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonBtn";

const Playlist = ({ isEditing, playlist }) => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(typeof playlist);
    if (playlist && Array.isArray(playlist.data)) {
      setPlaylists(playlist.data);
    } else {
      setPlaylists([]);
    }
  }, [playlist]);

  const moveToSonglist = (id) => {
    if (!isEditing) {
      navigate(`/tracklist/${id}`);
    }
  };

  const deletePlaylist = (playlistId) => {
    //플레이리스트 삭제함수
    setPlaylists((prev) =>
      prev.filter((pl) => pl.playlistNumber !== playlistId),
    );
  };

  if (!playlists || playlists.length === 0) {
    return (
      <p className='text-gray-400 p-4 text-center'>플레이리스트가 없습니다.</p>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-4xl h-[43rem] overflow-y-auto scrollbar-hide px-4 '>
        {/* //스크롤 컨테이너 */}
        <div className='grid grid-cols-2 gap-5'>
          {playlists.map((item) => (
            <div className='flex flex-col' key={item.playlistNumber}>
              <img
                src={item.playlistImage}
                alt={item.title}
                onClick={() => {
                  moveToSonglist(item.playlistNumber);
                }}
                className='cursor-pointer'
              />
              <div className='flex items-center justify-between mt-2'>
                <h3 className='text-white font-bold pt-2'>{item.title}</h3>
                {isEditing && (
                  <CommonButton
                    className='text-white font-bold pt-2'
                    onClick={() => deletePlaylist(item.playlistNumber)}
                  >
                    <p>삭제</p>
                  </CommonButton>
                )}
              </div>
              <p className='text-[#FFFFFF80] font-medium'>{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
