import EmotionTag from "../EmotionTag";

const Emotion = ({ emotion, userName }) => {
  // ✅ 감정 태그 매핑
  const emotionMapping = {
    TIRED: "지침",
    HAPPY: "행복",
    SAD: "슬픔",
    EXCITING: "신남",
    ANGRY: "화남",
  };

  const selectedEmotionTag = emotionMapping[emotion]; // ✅ 선택된 감정 태그

  // ✅ 모든 감정 태그 리스트
  const allEmotionTags = ["지침", "행복", "슬픔", "신남", "화남"];

  return (
    <div className='grid place-items-center gap-y-[58px] text-center'>
      <img
        src='src/assets/EngLogo.png'
        alt='logo'
        className='w-[148px] h-[auto] mt-8'
      />
      <p className='text-[14px] font-medium'>
        파이가 분석한 {userName} 님의 플레이리스트는 다음과 같아요
      </p>
      <div id='emotionWrapper'>
        <p className='text-[14px] font-normal mb-[34px]'>
          새로 만든 플레이리스트의 감정 태그
        </p>
        <div
          id='emotionBox'
          className='grid grid-cols-3 gap-x-[13px] gap-y-[20px] place-items-center mb-10'
        >
          {allEmotionTags.map((tag) => (
            <EmotionTag key={tag} isActive={tag === selectedEmotionTag}>
              {tag}
            </EmotionTag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emotion;
