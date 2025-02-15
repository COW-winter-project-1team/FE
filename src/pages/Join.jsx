import CommonInput from "../components/CommonInput";
import CommonButton from "../components/CommonBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/User";
import { useDispatch } from "react-redux";
import { setUser } from "/src/redux/UserSlice.js";

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const nicknamePattern = /^[a-zA-Z0-9]{1,16}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z0-9-]+/;

const Join = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkInput = () => {
    const newErrors = {};
    //닉네임 검사
    if (!nicknamePattern.test(nickname)) {
      newErrors.nickname = "영문 16자 이내로 작성해 주세요.";
    }
    //이메일 검사
    if (!emailPattern.test(email)) {
      newErrors.email = "올바른 이메일 양식을 작성해 주세요";
    }
    //비밀번호 검사
    if (!passwordPattern.test(password)) {
      newErrors.password = "비밀번호는 8 ~ 16 자 및 특수문자를 포함해 주세요.";
    }
    //비밀번호 확인칸 검사
    if (confirmPassword === "") {
      newErrors.confirmPassword = "비밀번호를 입력해 주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) {
      return null;
    }

    try {
      const userData = {
        username: nickname,
        email: email,
        password: password,
      };

      const result = await signup(userData);
      console.log("회원가입이 완료입니다!", result);

      alert("회원가입 성공!");

      dispatch(setUser({ nickname, email }));
    } catch (err) {
      console.error("회원가입 실패: ", err);
      alert("회원가입에 실패했습니다.");
    }
    navigate("/");
  };

  return (
    <div className='pl-[31px] pr-[32px] pt-[15px] pb-[94px]'>
      <h1 className='text-center font-bold m-10 text-2xl mb-[71px]'>
        회원가입
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col content-center text-left text-base font-semibold gap-2'
        >
          <p className='pl-[15px] pt-2'>닉네임</p>

          <CommonInput
            placeholder='영문 16자 이내'
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {error.nickname && (
            <p className='text-red-500 text-sm pl-[5px]'>{error.nickname}</p>
          )}

          <p className='pl-[15px] pt-2'>이메일</p>

          <CommonInput
            placeholder='ex)moodi@pie.com'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <p className='text-red-500 text-sm pl-[5px]'>{error.email}</p>
          )}

          <p className='pl-[15px] pt-2'>비밀번호</p>

          <CommonInput
            placeholder='영문 16자 이내'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='새 비밀번호'
          />
          {error.password && (
            <p className='text-red-500 text-sm pl-[5px]'>{error.password}</p>
          )}

          <p className='pl-[15px] pt-2'>비밀번호 확인</p>

          <CommonInput
            placeholder='비밀번호를 한 번 더 입력해 주세요'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='새 비밀번호'
          />
          {error.confirmPassword && (
            <p className='text-red-500 text-sm pl-[5px]'>
              {error.confirmPassword}
            </p>
          )}
          <div className='flex justify-center items-center mt-[71px]'>
            <CommonButton
              type='submit'
              className='w-[180px] h-[52px] rounded-[20px] bg-[#343434] text-white text-center text-[22px] font-[500] focus:outline-none'
            >
              확인
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
