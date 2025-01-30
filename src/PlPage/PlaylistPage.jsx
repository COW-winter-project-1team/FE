import MainHeader from '../MainUi/MainHeader';
import Playlist from './PlayList';
function PlaylistPage() {
  return (
    <>
      <div className='bg-[#242723] w-screen h-screen'>
        <MainHeader />
        <div className='text-end text-white m-auto p-8'>
          <span>플레이리스트</span>
          <span>-</span>
          <span>편집</span>
        </div>
        <div>
          <Playlist />
        </div>
      </div>
    </>
  );
}

export default PlaylistPage;
