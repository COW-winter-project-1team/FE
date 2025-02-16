const ReportLoading = ({ loadingText }) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#7CE5CC] to-[#9DA2EA] gap-10'>
      <div className='text-center'>
        <p className='text-[16px] font-medium'>{loadingText}</p>
      </div>
      <div className='mt-[50px]'>
        <div className='flex gap-2'>
          <div className='w-4 h-4 bg-white rounded animate-bounce delay-0'></div>
          <div className='w-4 h-4 bg-white rounded animate-bounce delay-200'></div>
          <div className='w-4 h-4 bg-white rounded animate-bounce delay-400'></div>
        </div>
      </div>
    </div>
  );
};

export default ReportLoading;
