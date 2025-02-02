import CommonButton from '../components/CommonBtn';

const TrackItem = ({ track, isDelete, isEdit, trackCount }) => {
  return (
    <div className='flex items-center gap-8 p-3 justify-between w-full'>
      <img
        src={track.cover}
        alt={track.title}
        className='w-16 h-16 rounded-lg object-cover'
      />
      <div className='flex-grow'>
        <h3 className='text-base font-semibold'>{track.title}</h3>
        <p className='text-gray-400 text-sm'>{track.artist}</p>
      </div>
      <div className='flex-shrink-0'>
        {isEdit && trackCount > 1 && (
          <CommonButton
            className='text-gray-400 hover:text-red-500 text-lg'
            onClick={() => isDelete(track.id)}
          >
            🗑
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default TrackItem;
