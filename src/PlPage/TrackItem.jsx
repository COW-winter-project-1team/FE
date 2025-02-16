import CommonButton from "../components/CommonBtn";

const TrackItem = ({ track, isDelete, isEdit, trackCount }) => {
  return (
    <div className='w-full bg-[#242723]'>
      <div className='flex items-center gap-[2rem] p-[0.75rem] px-[2rem]'>
        <div className='flex items-center gap-[2rem] flex-grow'>
          <img
            src={track.imageUrl}
            alt={track.trackName}
            className='w-[4rem] h-[4rem] rounded-lg object-cover'
          />
          <div className='flex-grow'>
            <h3 className='text-base font-semibold'>{track.trackName}</h3>
            <p className='text-gray-400 text-sm'>{track.artistName}</p>
          </div>
        </div>
        <div>
          {isEdit && trackCount > 1 && (
            <CommonButton
              className='text-lg'
              onClick={() => isDelete(track.trackId)}
            >
              삭제
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
