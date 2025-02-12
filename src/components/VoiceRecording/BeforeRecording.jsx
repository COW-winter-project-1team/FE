import VoiceBtn from '../VoiceBtn';

const BeforeRecording = ({ username, startVoiceRecording }) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-700 gap-[70px] '>
      <div>
        <p className='text-[16px] font-[600]'>파이에게 {username} 님의</p>
        <p className='text-[16px] font-[600]'>기분을 말해 주세요</p>
      </div>
      <img
        src='src/assets/Note.png'
        alt='note'
        className='flex mx-auto w-[16px] h-[auto]'
      />
      <VoiceBtn onClick={startVoiceRecording} />
    </div>
  );
};

export default BeforeRecording;
