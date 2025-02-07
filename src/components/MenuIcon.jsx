const MenuIcon = ({ setOpenModal }) => {
  return (
    <div>
      <img
        src='/src/assets/menuIcon.png'
        alt='menuIcon'
        className=' w-24 pt-9 cursor-pointer '
        onClick={() => {
          setOpenModal(true);
          console.log('열려라 모달');
        }}
      />
    </div>
  );
};

export default MenuIcon;
