import TrackItem from './TrackItem';

const TrackList = ({ musicSet, isEdit, isDelete, trackCount }) => {
  if (!musicSet || musicSet.length === 0) {
    return <p className='text-gray-400 p-4'>트랙이 없습니다.</p>;
  }

  return (
    <div className='grid grid-cols-2 gap-4 mt-4'>
      <div className='p-4'>
        {musicSet.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isEdit={isEdit}
            isDelete={isDelete}
            trackCount={trackCount}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
