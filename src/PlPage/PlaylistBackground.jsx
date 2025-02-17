import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPlaylistCard } from "../api/playlist";
import CommonButton from "../components/CommonBtn";

const PlaylistBackground = ({ isEdit, trackHandler }) => {
  const { index } = useParams();
  const playlistId = Number(index);
  const [playlist, setPlaylist] = useState(null); // 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // useEffect를 사용하여 API에서 데이터 가져오기
  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await fetchPlaylistCard({
          playlistNumber: playlistId,
        });
        setPlaylist(response.data.playlist);
      } catch (error) {
        setError(
          error.message || "플레이리스트를 불러오는 중 오류가 발생했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };
    getPlaylistData();
  }, [playlistId]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }

  if (error) {
    return <div>{error}</div>; // 에러 표시
  }

  if (!playlist) {
    return <div>해당 플레이리스트를 찾을 수 없습니다.</div>; // 플레이리스트가 없을 경우
  }

  return (
    <div className='relative w-full h-64 md:h-80 lg:h-96 overflow-hidden'>
      <img
        src={playlist.playlistImage} // API에서 받아온 이미지 URL 사용
        alt={playlist.title}
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div>
        {/* 편집모드 버튼 */}
        <CommonButton
          className='absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm'
          onClick={trackHandler}
        >
          {isEdit ? "완료" : "편집"}
        </CommonButton>
      </div>
      <CommonButton className='absolute bottom-4 right-4 w-12 h-12 bg-white text-black p-2 rounded-full'>
        ▶
      </CommonButton>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center'>
        <h1 className='text-3xl font-bold'>{playlist.title}</h1>
        <p className='pt-4'>{playlist.emotion}</p> {/* 감정 태그 표시 */}
      </div>
    </div>
  );
};

export default PlaylistBackground;
