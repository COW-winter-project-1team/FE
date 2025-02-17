import TrackItem from './TrackItem';

const TrackList = ({ musicSet, isEdit, isDelete, trackCount }) => {
  if (!musicSet || musicSet.length === 0) {
    return <p className='text-gray-400 p-4'>트랙이 없습니다.</p>;
  }

  return (
    <div className='w-full mt-4 max-h-[43rem] overflow-y-auto scrollbar-hide'>
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
  );
};

export default TrackList;
