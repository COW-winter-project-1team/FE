import CommonInput from '../components/CommonInput';
import DefaultBtn from '../components/CommonBtn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const Login = () => {
    if (id.trim() && pw.trim()) {
      //성공 로직
    } else {
      alert('아이디와 비밀번호를 모두 입력해 주세요.');
    }
  };
  const navigate = useNavigate();

  const moveToJoin = () => {
    navigate('/join');
  };
  return (
    <div className='flex w-[312px] flex-col justify-center align-middle gap-[38px]'>
      <img
        src='src/assets/FullLogo.png'
        alt='logo'
        className='flex mx-auto w-[260px] h-[180px]'
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
      <DefaultBtn type='submit' className='mx-auto' onClick={Login}>
        로그인
      </DefaultBtn>
      <p
        className='text-center font-medium -mt-5 cursor-pointer'
        onClick={moveToJoin}
      >
        회원가입
      </p>
    </div>
  );
};

export default Landing;
