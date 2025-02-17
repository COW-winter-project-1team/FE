import { useEffect, useState } from "react";

const Loading = ({ loadingText }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);

      setTimeout(() => {
        setShowImage(false);
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showImage]);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#7CE5CC] to-[#9DA2EA] gap-10'>
      {!showImage ? (
        <>
          <div className='mt-[50px] flex flex-col'>
            <div className='text-center mb-16 mx-auto'>
              <p className='text-[16px] font-medium'>{loadingText}</p>
            </div>
            <div className='flex gap-4 mx-auto'>
              <div className='w-4 h-4 bg-white rounded-full animate-custom-bounce'></div>
              <div className='w-4 h-4 bg-white rounded-full animate-custom-bounce delay-[200ms]'></div>
              <div className='w-4 h-4 bg-white rounded-full animate-custom-bounce delay-[400ms]'></div>
            </div>
          </div>
        </>
      ) : (
        <img
          src='src/assets/EngLogo.png'
          alt='fontLogo'
          className='m-auto w-[250px] transition-opacity duration-500 opacity-100'
        />
      )}
    </div>
  );
};

export default Loading;
