import CommonButton from '../components/CommonBtn';

const TrackItem = ({ track, isDelete, isEdit, trackCount }) => {
  return (
    <div className='w-full bg-[#242723]'>
      <div className='flex items-center gap-[2rem] p-[0.75rem] px-[2rem]'>
        <div className='flex items-center gap-[2rem] flex-grow'>
          <img
            src={track.cover}
            alt={track.title}
            className='w-[4rem] h-[4rem] rounded-lg object-cover'
          />
          <div className='flex-grow'>
            <h3 className='text-base font-semibold'>{track.title}</h3>
            <p className='text-gray-400 text-sm'>{track.artist}</p>
          </div>
        </div>
        <div className=''>
          {isEdit && trackCount > 1 && (
            <CommonButton
              className='text-lg'
              onClick={() => isDelete(track.id)}
            >
              🗑
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
