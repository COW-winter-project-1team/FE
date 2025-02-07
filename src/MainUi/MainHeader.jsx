import { useState } from 'react';
import MenuModal from './MenuModal';
import HiddenIcon from '/src/components/HiddenIcon.jsx';
import HeaderIcon from '/src/components/HeaderIcon.jsx';
import MenuIcon from '/src/components/MenuIcon.jsx';

const MainHeader = ({ isHide }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className='flex items-center justify-between px-4 py-2 text-white bg-[#242723] '>
        {/* 조건별 이미지 숨김 기능 추가*/}
        {isHide !== 'fontLogo' ? <HeaderIcon /> : <HiddenIcon />}
        {/* 메뉴버튼 */}
        {isHide !== 'menuIcon' ? (
          <MenuIcon setOpenModal={setOpenModal} />
        ) : (
          <HiddenIcon />
        )}
      </header>
      {/* 모달창 */}
      {openModal && <MenuModal setOpenModal={setOpenModal} />}
    </>
  );
};
export default MainHeader;
