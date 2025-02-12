const MenuIcon = ({ setOpenModal }) => {
  return (
    <div>
      <img
        src='/src/assets/menuIcon.png'
        alt='menuIcon'
        className='w-14 md:w-24 pt-9 cursor-pointer'
        onClick={() => {
          setOpenModal(true);
        }}
      />
    </div>
  );
};

export default MenuIcon;
