import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonBtn";
import { deletePlaylist } from "../api/playlist";

const Playlist = ({ isEditing, playlist }) => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (playlist && Array.isArray(playlist.data)) {
      setPlaylists(playlist.data);
    } else {
      setPlaylists([]);
    }
  }, [playlist]);

  const moveToSonglist = (id) => {
    if (!isEditing && !isNaN(Number(id))) {
      navigate(`/tracklist/${id}`);
    }
  };

  const handledDeletePlaylist = async (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((pl) => pl.playlistNumber !== playlistId),
    );

    try {
      await deletePlaylist({ playlistNumber: playlistId });
    } catch (error) {
      console.log("플레이리스트 삭제 중 오류 발생: ", error);
    }
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
                    onClick={() =>
                      handledDeletePlaylist(item.playlistTrackNumber)
                    }
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
