import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { ReactComponent as NavIcon} from '../../assets/nav-icon.svg';
import { GrClose } from "react-icons/gr";

const MobileNav = ({ showNav, openNav }) => {
    
  return (
        <nav className='p-6 sticky z-10 top-0 mobile-nav'>
            <div className="flex justify-between items-center ">
                <NavLink to="/"  className='w-auto'>
                    <Logo />
                </NavLink>
                {
                openNav ? 
                <button onClick={showNav}>
                    <GrClose className='text-2xl' />
                </button> :
                <button className="" onClick={showNav}>
                    <NavIcon className='text-2xl' />
                </button>
                }
            </div>
            
            {
            openNav && 
            <div className="flex flex-col items-center py-8 mobile-nav-items transition duration-700 ease-in-out">
                <a href='#faq' className='mobile-nav-items-list'>FAQ</a>
                <NavLink to='/' className='mobile-nav-items-list'>Contact Us</NavLink>
                <NavLink to='/' className='mobile-nav-items-list'>Aero News</NavLink>
            
                <NavLink to='/login' className='mobile-nav-items-list'>Log In</NavLink>
                <NavLink to='/signup' className='mobile-nav-items-button transition duration-700 ease-in-out'>
                    Get started
                </NavLink>
        
            </div>
        }
        </nav>
  )
};

export default MobileNav;