import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUserName } from "../api/User";
import DefaultBtn from "../components/CommonBtn";
import MainHeader from "../MainUi/MainHeader.jsx";

const MyPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("사용자 이름");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  const handleNameChange = async () => {
    try {
      await updateUserName(name);
      alert("이름이 변경되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("이름 변경 오류:", error);
      alert("이름 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className='bg-[#242723] w-screen h-screen'>
      <MainHeader isHide='fontLogo' />

      {/* 프로필 섹션 */}
      <div className='flex flex-col items-center justify-center p-8  space-y-[34px] text-center'>
        <img
          src='src/assets/EngLogo.png'
          alt='fontLogo'
          className='m-auto w-[250px]'
        />
          <div className="flex flex-col items-center justify-center w-80 p-6 bg-gradient-to-b from-[#444444] rounded-lg shadow-lg mt-10">
          <img
            src="src/assets/pieInCircle.png"
            alt="profile"
            className="w-36 h-36 rounded-full mb-4 object-cover"
          />

        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded text-center w-full mb-2 text-white bg-transparent caret-white"
            />
            <p className="text-white cursor-pointer mt-1" onClick={handleNameChange}>확인</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <p className="text-white cursor-pointer mt-1" onClick={() => setIsEditing(true)}>변경</p>
          </>
        )}
        </div>
      </div>

      {/* 회원탈퇴 */}
      <div className="flex flex-col items-center mt-3">
        <p className="text-white cursor-pointer" onClick={handleDeleteAccount}>
          회원 탈퇴
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-7 rounded-lg text-center w-80">
            <p>회원 탈퇴 시 모든 정보가 사라지게 됩니다.</p>
            <p className="mt-4">회원탈퇴를 계속 하시겠습니까?</p>
            <div className="flex justify-between mt-5 gap-10">
              <DefaultBtn onClick={() => setShowModal(false)}>취소</DefaultBtn>
              <DefaultBtn onClick={confirmDelete}>확인</DefaultBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
