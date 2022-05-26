import React, {useState} from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { ReactComponent as NavIcon} from '../../assets/nav-icon.svg';
import { GrClose } from "react-icons/gr";
import { ReactComponent as Notification } from '../../assets/dashboard-icons/Notification.svg';
import { ReactComponent as Arrow } from '../../assets/dashboard-icons/arrow-down.svg';
import { ReactComponent as Profile } from '../../assets/Profile.svg';
import { ReactComponent as Home } from '../../assets/dashboard-icons/Home.svg';
import { ReactComponent as Plane } from '../../assets/dashboard-icons/plane.svg';
import { ReactComponent as Wallet } from '../../assets/dashboard-icons/Wallet.svg';
import { ReactComponent as Swap } from '../../assets/dashboard-icons/Swap.svg';
import { ReactComponent as Setting } from '../../assets/dashboard-icons/Setting.svg';
import { ReactComponent as HomeActive } from '../../assets/dashboard-icons/Home-active.svg';
import { ReactComponent as PlaneActive } from '../../assets/dashboard-icons/plane-active.svg';
import { ReactComponent as WalletActive } from '../../assets/dashboard-icons/Wallet-active.svg';
import { ReactComponent as SwapActive } from '../../assets/dashboard-icons/Swap-active.svg';
import { ReactComponent as SettingActive } from '../../assets/dashboard-icons/Setting-active.svg';

const AirlineMobileNav = ({ isActive, setIsActive }) => {
    const [ showOption, setShowOption ] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const showNav = () => {
        setOpenNav(!openNav); 
    }
  return (
    <nav className='sticky z-10 top-0 w-full px-4'>
        <div className="flex items-center justify-between">
            <div className=''>
                <NavLink to='/dashboard'>
                <Logo className='w-auto' />
                </NavLink>
            </div>
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
        <div className="nav-mobile-container">
            <div className='flex items-center w-full'>
                <button className='mobile_btn-badge'>
                <span className='w-[18px] h-[18px]'>
                     <Notification />
                </span>
                <span className='notify'>
                     Notification
                </span>
                <span className='badge'>5</span>
            </button>

            <button className="mobile_profile-btn relative" 
            onClick={() => setShowOption(!showOption)}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Profile /> 
                        <span className='profile-name'>
                            Derek
                        </span>
                    </div>
                    <Arrow />
              </div>

              {
                showOption &&  
                <ul className="profile-dropdown absolute top-8 z-[99999] right-0 mt-[12px] ">
                  <li>
                    <NavLink to='/dashboard' className="settings">Settings</NavLink>
                  </li>
                   <li>
                     <NavLink to='/login' className="log-out">Logout</NavLink>
                  </li>
                </ul>
                }
              </button>
            </div>

            <div className='line'></div>

    <div className='nav-mobile-container_list'>
        <NavLink to='/dashboard' 
        className={`nav-mobile-container_list-item ${isActive === 'home' &&  'active-mobile-nav'}`} 
        onClick={() => setIsActive('home')}>
            {
                isActive === 'home' ? 
                <HomeActive className='mr-[8px]' /> : 
                <Home className='mr-[8px]'/>
            }
            Home
        </NavLink>

        <NavLink to='/flight'  
        className={`nav-mobile-container_list-item ${isActive === 'flight' &&  'active-mobile-nav'}`} 
        onClick={() => setIsActive('flight')}>
            {
            isActive === 'flight' ? 
            <PlaneActive className='mr-[8px]' /> : 
            <Plane className='mr-[8px]'/>
            }
            Flights
        </NavLink>

        <NavLink to='/wallet'  
        className={`nav-mobile-container_list-item ${isActive === 'wallet' &&  'active-mobile-nav'}`} onClick={() => setIsActive('wallet')}>
                {
                isActive === 'wallet' ? 
                <WalletActive className='mr-[8px]' /> : 
                <Wallet className='mr-[8px]'/>
            }
            Wallet
        </NavLink>

        <NavLink to='/transaction-history'  
        className={`nav-mobile-container_list-item ${isActive === 'trans' &&  'active-mobile-nav'}`} 
        onClick={() => setIsActive('trans')}>
            {
            isActive === 'trans' ? 
            <SwapActive className='mr-[8px]' /> : 
            <Swap className='mr-[8px]'/>
            }
            Transactions
        </NavLink>

        <NavLink to='/settings'  
        className={`nav-mobile-container_list-item ${isActive === 'setting' &&  'active-mobile-nav'}`} 
        onClick={() => setIsActive('setting')}>
            {
            isActive === 'setting' ? 
            <SettingActive className='mr-[8px]' /> :
            <Setting className='mr-[8px]'/>
            }
            Settings
        </NavLink>
    </div>
    
        </div>
        }
        </nav>
  )
}

export default AirlineMobileNav