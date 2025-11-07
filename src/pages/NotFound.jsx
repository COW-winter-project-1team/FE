const NotFound = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2.375'>
      <img
        src='src/assets/FullLogo.png'
        alt='logo'
        className='flex mx-auto w-16.25 h-10'
      />
      <p className='text-5 font-[600] '>404 Not found</p>
    </div>
  );
};

export default NotFound;
