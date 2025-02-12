import MainHeader from '../MainUi/MainHeader';
import Playlist from './PlayList';
import CommonButton from '../components/CommonBtn';
import { useState } from 'react';

function PlaylistPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className='bg-[#242723] w-screen h-screen'>
        <MainHeader />
        <div className='text-end text-white m-auto p-8'>
          <span>플레이리스트</span>
          <span>•</span>
          <CommonButton onClick={() => setIsEditing(!isEditing)} className=''>
            {isEditing ? '완료' : '편집'}
          </CommonButton>
        </div>
        <div>
          <Playlist isEditing={isEditing} />
        </div>
      </div>
    </>
  );
}

export default PlaylistPage;
