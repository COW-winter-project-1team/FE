import { useParams } from "react-router-dom";
import TrackList from "./Tracklist";
import PlaylistBackground from "./PlaylistBackground";
import MainHeader from "../MainUi/MainHeader";
import { useState, useEffect } from "react";
import { fetchPlaylistCard, deleteTracks } from "../api/playlist";

const TrackListPage = () => {
  const { index } = useParams();
  const playlistId = Number(index);
  const [isEdit, setIsEdit] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isNaN(playlistId)) {
      setError("유효하지 않은 플레이리스트 ID입니다.");
      setPlaylist(null);
      return;
    }

    const getTrackList = async () => {
      try {
        const response = await fetchPlaylistCard({
          playlistNumber: playlistId,
        });

        if (!response.data?.playlist) {
          setError("플레이리스트 데이터를 찾을 수 없습니다.");
          setPlaylist(null);
          return;
        }

        setPlaylist(response.data.playlist);
        setTracks(response.data.track || []);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        setError(error.message || "데이터를 불러오는데 실패했습니다.");
        setPlaylist(null);
      }
    };

    getTrackList();
  }, [playlistId]);

  const trackHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const deleteHandler = async (playlistTrackNumber) => {
    console.log("삭제 요청된 트랙 번호:", playlistTrackNumber); // 디버깅용 콘솔 추가
    if (!playlistTrackNumber) {
      alert("삭제할 트랙 번호가 없습니다!");
      return;
    }

    try {
      await deleteTracks(playlistId, playlistTrackNumber); // 객체 전달 X, 숫자만 전달

      setTracks((prevTracks) =>
        prevTracks.filter(
          (track) => track.playlistTrackNumber !== playlistTrackNumber,
        ),
      );
    } catch (error) {
      console.error("트랙 삭제 실패:", error);
      alert(error.message || "트랙 삭제에 실패했습니다.");
    }
  };

  if (error) return <div className='text-white p-4'>{error}</div>;
  if (!playlist) return <div className='text-white p-4'>로딩 중...</div>;

  return (
    <div className='min-h-screen bg-[#242723]'>
      <MainHeader isHide='' />
      <div className='w-screen bg-[#242723]'>
        <div className='max-w-[1280px] mx-auto'>
          {/* 배경 이미지 */}
          <PlaylistBackground
            isEdit={isEdit}
            trackHandler={trackHandler}
            backgroundImageUrl={playlist.playlistImage}
          />
          <div className='bg-[#242723] text-white px-8 py-4'>
            <div
              key={playlist.id}
              className='flex items-start justify-start text-gray-400 gap-2'
            >
              <p>{playlist.timestamp}</p>
              <span>•</span>
              <p>{tracks.length} 곡</p>
            </div>
            <div>
              {/* 트랙 리스트 */}
              <TrackList
                musicSet={tracks}
                isEdit={isEdit}
                isDelete={deleteHandler}
                trackCount={tracks.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackListPage;
