//매인페이지 메뉴 모달
import CommonButton from '../components/CommonBtn';

const MenuModal = ({ setOpenModal }) => {
  return (
    <div className='fixed inset-x-[365px]  flex justify-end z-50'>
      <div className='flex top-0 right-0 w-60 h-full shadow-lg p-5 flex-col bg-black bg-opacity-70 space-y-[20px]'>
        {/* 닫기버튼 */}
        <CommonButton
          onClick={() => {
            setOpenModal(false);
            console.log('닫혀라 모달');
          }}
          children='X'
          className='bg-black bg-opacity-70 text-white'
        />
        {/* 나머지 버튼 */}
        <CommonButton
          children='AI 플레이리스트 생성'
          className='bg-black bg-opacity-70 text-white'
        />
        <CommonButton
          children='마이페이지'
          className='bg-black bg-opacity-70 text-white'
        />
        <CommonButton
          children='로그아웃'
          className='bg-black bg-opacity-70 text-white'
        />
      </div>
    </div>
  );
};

export default MenuModal;
