import { fetchTracklist } from "../../api/Playlist";
import { useEffect, useState } from "react";

const PlayerInfo = () => {
  const [trackInfo, setTrackInfo] = useState();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetchTracklist({
          trackId: trackInfo,
        });
        setTrackInfo(response.data.trackId);
      } catch (error) {
        console.error("곡 정보를 불러오는데 실패했습니다.", error);
        setTrackInfo(null);
      }
    };
    fetchTrack();
  }, [trackInfo]);

  if (!trackInfo) {
    return <div>트랙정보를 불러오고 있어요!</div>;
  }

  return (
    <div>
      <img src={trackInfo.imageUrl} alt={trackInfo.trackName} />
      <h3>{trackInfo.trackName}</h3>
      <h3>{trackInfo.artistName}</h3>
    </div>
  );
};

export default PlayerInfo;
