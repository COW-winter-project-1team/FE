const VoiceBtn = ({ onClick }) => {
  return (
    <img
      onClick={onClick}
      src='src/assets/Mic.png'
      alt='Mic'
      className='w-[141px] h-[auto] cursor-pointer'
    />
  );
};

export default VoiceBtn;
