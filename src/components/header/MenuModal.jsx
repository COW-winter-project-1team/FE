//매인페이지 메뉴 모달
import { useNavigate } from "react-router-dom";
import CommonButton from "../ui/CommonBtn";

const MenuModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  return (
    // 모달컨테이너
    <div className='fixed top-8 right-4 w-[10.625rem] h-[22.625rem] bg-black bg-opacity-70 text-white rounded-lg p-4 shadow-lg z-50'>
      <div className='flex flex-col text-center space-y-4'>
        {/* 닫기버튼 */}
        <CommonButton
          onClick={() => {
            setOpenModal(false);
          }}
          className='text-white'
        >
          X
        </CommonButton>
        {/* 나머지 버튼 */}
        <CommonButton className=' text-white'>
          AI 플레이리스트 생성
        </CommonButton>
        <CommonButton
          onClick={() => navigate("/mypage")}
          className='text-white'
        >
          마이페이지
        </CommonButton>
        <CommonButton className='  text-white'>로그아웃</CommonButton>
      </div>
    </div>
  );
};

export default MenuModal;
