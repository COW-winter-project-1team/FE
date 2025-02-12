//매인페이지 메뉴 모달
import CommonButton from '../components/CommonBtn';

const MenuModal = ({ setOpenModal }) => {
  return (
    // 모달컨테이너
    <div className='fixed top-8 right-4 w-[10.625rem] h-[22.625rem] bg-black bg-opacity-70 text-white rounded-lg p-4 shadow-lg z-50'>
      <div className='flex flex-col text-center space-y-4'>
        {/* 닫기버튼 */}
        <CommonButton
          onClick={() => {
            setOpenModal(false);
          }}
          children='X'
          className='text-white'
        />
        {/* 나머지 버튼 */}
        <CommonButton children='AI 플레이리스트 생성' className=' text-white' />
        <CommonButton children='마이페이지' className='  text-white' />
        <CommonButton children='로그아웃' className='  text-white' />
      </div>
    </div>
  );
};

export default MenuModal;
