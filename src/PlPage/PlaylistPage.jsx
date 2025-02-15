import MainHeader from "../MainUi/MainHeader";
import Playlist from "./PlayList";
import CommonButton from "../components/CommonBtn";
import { useState, useEffect } from "react";
import { fetchPlaylist } from "../api/playlist";

function PlaylistPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlaylist();
        console.log("데이터 확인 : ", data);
        setPlaylistData(data);
      } catch (error) {
        console.log(error, "플레이리스트 조회 중 에러발생");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("변경된 데이터 확인", playlistData);
  }, [playlistData]);

  return (
    <>
      <div className='bg-[#242723] w-screen h-screen'>
        <MainHeader />
        <div className='text-end text-white m-auto p-8'>
          <span>플레이리스트</span>
          <span>•</span>
          <CommonButton onClick={() => setIsEditing(!isEditing)} className=''>
            {isEditing ? "완료" : "편집"}
          </CommonButton>
        </div>
        <div>
          <Playlist isEditing={isEditing} playlist={playlistData} />
        </div>
      </div>
    </>
  );
}

export default PlaylistPage;
