import { useParams } from "react-router-dom";
import TrackList from "./Tracklist";
import PlaylistBackground from "./PlaylistBackground";
import MainHeader from "../MainUi/MainHeader";
import { useState, useEffect } from "react";
import { fetchPlaylistCard, deleteTracks } from "../api/playlist";

const TrackListPage = () => {
  const { index } = useParams();
  const playlistId = Number(index); // URL에서 playlistId 추출

  const [isEdit, setIsEdit] = useState(false);
  const [tracks, setTracks] = useState([]); // 트랙 데이터 저장
  const [playlist, setPlaylist] = useState(null); // 플레이리스트 데이터 저장

  useEffect(() => {
    const getTrackList = async () => {
      try {
        const response = await fetchPlaylistCard({
          playlistNumber: playlistId,
        });
        const playlistData = response.data.playlist;
        const trackData = response.data.track;

        console.log(trackData);
        console.log("API 응답 데이터:", response);

        setPlaylist(playlistData);
        setTracks(trackData);
      } catch (error) {
        console.log("트랙을 가져오는데 에러가 발생했습니다 : ", error);
      }

      console.log(playlist);
      console.log(tracks);
    };

    getTrackList();
  }, [playlistId]);

  const trackHandler = () => {
    setIsEdit(!isEdit);
  };

  const deleteHandler = async (trackId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("사용자 인증 토큰이 없습니다.");
      return;
    }
    try {
      await deleteTracks({ playlistNumber: playlistId, trackId });
      setTracks((prevTracks) =>
        prevTracks.filter((track) => track.trackId !== trackId),
      );
    } catch (error) {
      console.log("트랙을 삭제하는 중 오류가 발생했습니다 : ", error);
    }
  };

  if (!playlist || tracks.length === 0) {
    return (
      <div className='text-white p-4'>
        플레이리스트 또는 트랙을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#242723]'>
      <MainHeader isHide='' />
      <div className='w-screen bg-[#242723]'>
        <div className='max-w-[1280px] mx-auto'>
          {/* 배경 이미지 */}
          <PlaylistBackground
            isEdit={isEdit}
            trackHandler={trackHandler}
            backgroundImageUrl={playlist.playlistImage} // 플레이리스트의 배경 이미지 URL 전달
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
