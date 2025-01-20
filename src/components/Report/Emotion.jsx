import EmotionTag from '../EmotionTag';
import { useState } from 'react';

const Emotion = () => {
  const [name, setName] = useState('이유라');
  return (
    <div className='grid place-items-center gap-y-[58px] text-center'>
      <img
        src='src/assets/EngLogo.png'
        alt='logo'
        className='w-[148px] h-[auto] mt-8'
      />
      <p className='text-[14px] font-medium '>
        파이가 분석한 {name} 님의 플레이리스트는 다음과 같아요
      </p>
      <div id='emotionWrapper'>
        <p className='text-[14px] font-normal mb-[34px] '>
          새로 만든 플레이리스트의 감정 태그
        </p>
        <div
          id='emotionBox'
          className='grid grid-cols-3 gap-x-[13px] gap-y-[20px] place-items-center mb-10 '
        >
          <EmotionTag>지침</EmotionTag>
          <EmotionTag>행복</EmotionTag>
          <EmotionTag>슬픔</EmotionTag>
          <EmotionTag>신남</EmotionTag>
          <EmotionTag>화남</EmotionTag>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
