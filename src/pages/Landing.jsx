import { AnimatePresence, motion } from "framer-motion";
import CommonInput from "../components/ui/CommonInput";
import DefaultBtn from "../components/ui/CommonBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, getUserInfo } from "../api/User";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";
import { toast } from "react-toastify";

const Landing = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Login = async () => {
    if (id.trim() && pw.trim()) {
      try {
        const userData = {
          email: id,
          password: pw,
        };

        await login(userData);

        const userInfo = await getUserInfo();

        dispatch(
          setUser({
            nickname: userInfo.username,
            email: userInfo.email,
          }),
        );
        toast.success("로그인 성공!", {
          position: "top-right",
        });
        navigate("/main");
      } catch (err) {
        console.log("로그인 실패: ");
        toast.error("로그인 중 오류 발생", {
          position: "top-right",
        });
      }
    } else {
      toast.error("아이디와 비밀번호를 모두 입력해 주세요.", {
        position: "top-right",
      });
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
        className='w-full flex flex-col justify-center gap-[2.375rem]'
      >
        <img
          src='src/assets/FullLogo.png'
          alt='logo'
          className='flex mx-auto w-[16.25rem] h-10'
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
          className='text-center font-medium mt-5 cursor-pointer'
          onClick={moveToJoin}
        >
          회원가입
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Landing;
