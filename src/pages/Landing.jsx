import { AnimatePresence, motion } from "framer-motion";
import CommonInput from "../components/ui/CommonInput";
import DefaultBtn from "../components/ui/CommonBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, getUserInfo } from "../api/User";
import { useDispatch } from "react-redux"; // ✅ 추가
import { setUser } from "../redux/UserSlice"; // ✅ 추가

const Landing = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch(); // ✅ 위치 옮김
  const navigate = useNavigate();

  const Login = async () => {
    if (id.trim() && pw.trim()) {
      try {
        const userData = {
          email: id,
          password: pw,
        };

        await login(userData); // ✅ 로그인 요청 (토큰 저장됨)

        const userInfo = await getUserInfo(); // ✅ 사용자 정보 가져오기

        // ✅ Redux에 저장
        dispatch(
          setUser({
            nickname: userInfo.username,
            email: userInfo.email,
          }),
        );

        navigate("/main"); // ✅ 이동은 정보 저장 이후에!
      } catch (err) {
        console.log("로그인 실패: ", err);
        alert("로그인 중 오류 발생", err);
      }
    } else {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
    }
  };

  const moveToJoin = () => {
    navigate("/join");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className='w-full flex flex-col justify-center gap-[38px]'
      >
        <img
          src='src/assets/FullLogo.png'
          alt='logo'
          className='flex mx-auto w-[260px] h-[160px]'
        />
        <CommonInput
          placeholder='아이디'
          type='text'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <CommonInput
          placeholder='비밀번호'
          type='password'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <DefaultBtn type='submit' onClick={Login}>
          로그인
        </DefaultBtn>
        <p
          className='text-center font-medium -mt-5 cursor-pointer'
          onClick={moveToJoin}
        >
          회원가입
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Landing;
