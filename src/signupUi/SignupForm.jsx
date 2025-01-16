import React from 'react';
import SignupBtn from './SignupBtn';
import SignupInput from './SignupInput';
import { useState } from 'react';

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const nicknamePattern = /^[a-zA-Z0-9]{1,16}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/;

const SignupForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});

  const checkInput = () => {
    const newErrors = {};

    //닉네임 검사
    if (!nicknamePattern.test(nickname)) {
      newErrors.nickname = '영문 16자 이내로 작성해줘야 합니다';
    }
    //이메일 검사
    if (!emailPattern.test(email)) {
      newErrors.email = '옳바른 이메일 양식을 작성해 주세요';
    }
    //비밀번호 검사
    if (!passwordPattern.test(password)) {
      newErrors.password =
        '비밀번호는 8 ~ 16 자 및 특수문자를 포함해야 합니다.';
    }
    //비밀번호 확인칸 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInput()) {
      alert('회원가입 성공!');
    }
  };

  return (
    <div className=' p-6 rounded-lg shadow-md w-80'>
      <h1 Style='text-center text-2xl font-bold mb-6'>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <SignupInput
          InputedText='닉네임'
          Placeholder='영문 16자 이내'
          inputType='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {error.nickname && (
          <p className='text-red-500 text-sm'>{error.nickname}</p>
        )}

        <SignupInput
          InputedText='아이디'
          Placeholder='ex)moodi@pie.com'
          inputType='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}

        <SignupInput
          InputedText='비밀번호'
          Placeholder='영문 16자 이내'
          inputType='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <p className='text-red-500 text-sm'>{error.password}</p>
        )}

        <SignupInput
          InputedText='비밀번호 확인'
          Placeholder='비밀번호를 한 번 더 입력해 주세요'
          inputType='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error.confirmPassword && (
          <p className='text-red-500 text-sm'>{error.confirmPassword}</p>
        )}

        <SignupBtn InputedText='확인' />
      </form>
    </div>
  );
};

export default SignupForm;
