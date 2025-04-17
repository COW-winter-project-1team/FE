import MusicController from "./MusicController";
import PlayerInfo from "./PlayerInfo";

const MusicPlayer = () => {
  return (
    <div className='flex bg-[#242723]'>
      <MusicController />
      <PlayerInfo />
    </div>
  );
};

export default MusicPlayer;
