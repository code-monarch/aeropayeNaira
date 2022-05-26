import React from 'react'
import { ReactComponent as Wave } from '../../../assets/dashboard-icons/wave.svg';

import {BannerSub} from '../data'

const Banner = ({userName}) => {
  return (
    <div className='welcome-div h-[164px] sticky z-[3] top-[4.5rem] w-full'>
    <div className='welcome-div_message'>
      <p className='title'>Welcome Back, <span className='username'>&nbsp;{userName}</span><span className='message-icon'><Wave /></span></p>
      <p className='text'>{BannerSub}</p>
    </div>
    
  </div>
  )
}

export default Banner