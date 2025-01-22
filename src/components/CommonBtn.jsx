const CommonButton = ({
  children,
  onClick,
  type = 'button',
  className = `w-[236px] h-[52px] rounded-[20px] bg-[#343434] text-white text-center text-[22px] font-[500] focus:outline-none`,
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default CommonButton;
