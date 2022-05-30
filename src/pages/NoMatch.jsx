import React from 'react'

const NoMatch = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center text-[40px] text-black font-[500] font-sans">
      {" "}
          <div> 404 Page</div>
          <div className='text-[30px] font-[400]'>This page doesn't Exist</div>
    </div>
  );
}

export default NoMatch