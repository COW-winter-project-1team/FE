import { useParams } from 'react-router-dom';
import TrackList from './Tracklist';
import data from '../data';
import PlaylistBackground from './PlaylistBackground';
import MainHeader from '../MainUi/MainHeader';
import { useState } from 'react';

const PlaylistInner = () => {
  const playlistsData = [...data];
  //URL에서 플레이리스트 ID 가져오기
  const { index } = useParams();
  const playlistId = Number(index);
  const playlist = playlistsData.find((song) => song.index === playlistId);

  const [isEdit, setIsEdit] = useState(false); //편집 시
  const [tracks, setTracks] = useState(playlist.songs || []); //삭제 할 때 필요한 상태관리

  const trackHandler = () => {
    //편집모드 실행함수
    setIsEdit(!isEdit);
    console.log(isEdit);
  };

  const deleteTrack = (trackId) => {
    //삭제함수
    setTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId),
    );
  };

  if (!playlist) {
    return (
      <div className='text-white p-4'>플레이리스트를 찾을 수 없습니다.</div>
    );
  }
  return (
    <div className='bg-[#242723]'>
      <MainHeader isHide='' />
      <div>
        <div className='w-full'>
          <PlaylistBackground isEdit={isEdit} trackHandler={trackHandler} />
        </div>
        <div className=' bg-[#242723] text-white  p-4'>
          <div className='flex items-start justify-start text-gray-400 gap-2'>
            <p>{playlist.date}</p>
            <span>•</span>
            <p>{tracks.length} 곡</p>
          </div>
          <div className=''>
            <TrackList
              musicSet={tracks}
              isEdit={isEdit}
              isDelete={deleteTrack}
              trackCount={tracks.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInner;
