import { useState } from 'react';
import MenuModal from './MenuModal';

const MainHeader = ({ hideImage }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className='flex items-center justify-between px-4 py-2 text-white'>
        {/* 조건별 이미지 숨김 기능 추가*/}
        {hideImage !== 'fontLogo' ? (
          <img
            src='src/assets/fontLogoWhite.png'
            alt='fontLogo'
            className='w-[100px]'
          />
        ) : (
          <div className='h-10' />
        )}
        {/* 메뉴버튼 */}
        {hideImage !== 'menuIcon' ? (
          <img
            src='src/assets/menuIcon.png'
            alt='menuIcon'
            className=' w-[50px] pt-9 cursor-pointer '
            onClick={() => {
              setOpenModal(true);
              console.log('열려라 모달');
            }}
          />
        ) : (
          <div className='h-8' />
        )}
      </header>
      {/* 모달창 */}
      <div>{openModal && <MenuModal setOpenModal={setOpenModal} />}</div>
    </>
  );
};
export default MainHeader;
