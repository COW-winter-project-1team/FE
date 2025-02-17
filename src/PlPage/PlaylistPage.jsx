import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainHeader from "../MainUi/MainHeader";
import Playlist from "./Playlist";
import CommonButton from "../components/CommonBtn";
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
        console.log(fetchPlaylist());
      } catch (error) {
        console.log(error, "플레이리스트 조회 중 에러발생");
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className='bg-[#242723] w-screen h-screen'
      >
        <>
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
        </>
      </motion.div>
    </AnimatePresence>
  );
}

export default PlaylistPage;
