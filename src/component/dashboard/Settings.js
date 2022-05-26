import React, { useState, useEffect } from 'react';
import Nav from '../reusable/Nav';
import Account from '../../pages/Settings/components/Account';
import Profile from './settings/Profile';
import Security from './settings/Security';
import Currency from '../../pages/Settings/components/Currency';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Settings = () => {
    const [isActive, setIsActive] = useState('setting');
    const [openTab, setOpenTab] = useState('account');

     const [showMobileTab, setShowMobileTab] = useState(window.matchMedia("(max-width:669px)").matches);

    useEffect(() => {
        window.addEventListener("resize", () => {
        setShowMobileTab(window.matchMedia("(max-width:669px)").matches);
        });
    });

  return (
    <div className='settings'>
        <Nav isActive={isActive} setIsActive={setIsActive} />
        <div className="settings-container">
           <div className='settings-container-header'>
                <p className='settings-container-header_overview'>Manage your bank accounts for FIAT withdrawal and payments</p>

                {
                    showMobileTab ? 

                    <Swiper
                    className="settings-container-header_mobile-tab-btn"
                    spaceBetween={2}
                    slidesPerView={3.5}
                    >
                    <SwiperSlide>
                        <button 
                        className={`mobile-tab-button ${openTab === 'account' && 'mobile_open-tab'}`}
                        onClick={() => setOpenTab('account')}>
                            Manage bank account
                        </button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button 
                        className={`mobile-tab-button tab-3 ${openTab === 'profile' && 'mobile_open-tab'}`}
                        onClick={() => setOpenTab('profile')}>
                            Profile
                        </button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button 
                        className={`mobile-tab-button tab-3 ${openTab === 'security' && 'mobile_open-tab'}`}
                        onClick={() => setOpenTab('security')}>
                            Security
                        </button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button 
                        className={`mobile-tab-button tab-3 ${openTab === 'currency' && 'mobile_open-tab'}`}
                        onClick={() => setOpenTab('currency')}>
                            Currency
                        </button>
                    </SwiperSlide>
                    
                    </Swiper>
                 :
                    <div className="settings-container-header_tab-btn">
                        <button 
                        className={`tab-button mr-[12px] ${openTab === 'account' && 'open-tab'}`}
                        onClick={() => setOpenTab('account')}>
                            Manage bank account
                        </button>

                    <button 
                    className={`tab-button tab-2 mr-[12px] ${openTab === 'profile' && 'open-tab'}`}
                    onClick={() => setOpenTab('profile')}>
                        Profile
                    </button>
                    
                    <button 
                    className={`tab-button tab-2 mr-[12px] ${openTab === 'security' && 'open-tab'}`}
                    onClick={() => setOpenTab('security')}>
                        Security
                    </button>

                    <button 
                    className={`tab-button tab-2 mr-[12px] ${openTab === 'currency' && 'open-tab'}`}
                    onClick={() => setOpenTab('currency')}>
                        Currency
                    </button>
                </div>
                }

                
           </div>
           <div className='line'></div>

           <div className='settings-container_tab'> 
                {
                    openTab === 'account' ? <Account /> : 
                    openTab === 'profile' ? <Profile /> : 
                    openTab === 'security' ? <Security /> : 
                    openTab === 'currency' ? <Currency /> : <Account />
                }
           </div>
        </div>
    </div>
  )
}

export default Settings