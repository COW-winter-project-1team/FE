import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import { useState } from "react";

const MusicController = () => {
  // const [isPlaying, setIsPlaying] = useState(false); 음악 재생 관리
  const [pause, setPause] = useState(false);

  const stopHandler = () => {
    setPause((prev) => !prev);
    console.log(pause);
  };

  return (
    <div className='flex'>
      <div>
        <IoPlaySkipBack style={{ color: "white" }} />
      </div>
      <div>
        {pause ? (
          <IoPlay onClick={stopHandler} style={{ color: "white" }} />
        ) : (
          <IoPause onClick={stopHandler} style={{ color: "white" }} />
        )}
      </div>
      <div>
        <IoPlaySkipForward style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default MusicController;
