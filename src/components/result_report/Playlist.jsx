const Playlist = ({ reportData }) => {
  return (
    <div className='w-full h-auto mx-auto mt-4 flex flex-col justify-center items-center'>
      {/* 플레이리스트 이미지 */}
      <div className='relative w-full h-64 md:h-80 lg:h-96 overflow-hidden'>
        <img
          src={reportData.playlist.playlistImage}
          alt={reportData.title}
          className='absolute inset-0 w-[80%] h-full object-cover mx-auto'
        />
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center'>
          <h1 className='w-[290px] text-l font-bold'>
            {reportData.playlist.title}
          </h1>
        </div>
      </div>

      {/* 트랙 리스트 */}
      <div className='w-[90%] mt-4 h-auto overflow-y-auto scrollbar-hide'>
        {reportData.track.map((track) => (
          <div
            key={track.trackId}
            className='w-3rem bg-[#343434] bg-opacity-90 rounded-md m-3'
          >
            <div className='flex items-center gap-[1rem] p-[0.75rem] px-[2rem]'>
              <div className='flex items-center gap-[2rem] flex-grow'>
                <img
                  src={track.imageUrl}
                  alt={track.trackName}
                  className='w-[2rem] h-[2rem] rounded-lg object-cover'
                />
                <div className='flex-grow'>
                  <h3 className='text-base font-semibold'>{track.trackName}</h3>
                  <p className='text-gray-400 text-sm'>{track.artistName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
