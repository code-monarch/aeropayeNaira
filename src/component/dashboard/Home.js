import React from 'react';
import { ReactComponent as Wave } from '../../assets/dashboard-icons/wave.svg';
import { ReactComponent as Onboarding } from '../../assets/dashboard-icons/onboarding_illus.svg';
import { ReactComponent as ArrowRight } from '../../assets/dashboard-icons/arrow-right.svg';
import { ReactComponent as Close } from '../../assets/dashboard-icons/icon_close.svg';
import { ReactComponent as AeropayeBalance } from '../../assets/dashboard-icons/aeropaye-balance.svg';
import { ReactComponent as BookedFlight } from '../../assets/dashboard-icons/booked-flight.svg';
import { ReactComponent as TotalDeposit } from '../../assets/dashboard-icons/total-deposit.svg';
import { ReactComponent as EyeOpen } from '../../assets/dashboard-icons/eye-icon.svg';
import { ReactComponent as ArrowUp } from '../../assets/dashboard-icons/arrow-up.svg';
import { Link } from 'react-router-dom';

const Home = ({userName}) => {
  
  return (
    <div className='home'>
        <div className='welcome-div sticky z-[3] top-[4.5rem] w-full'>
          <div className='welcome-div_message'>
            <p className='title'>Welcome, <span className='username'>&nbsp;{userName}</span><span className='message-icon'><Wave /></span></p>
            <p className='text'>Process your refund claims within seconds of delayed or cancelled flight, seemlessly book and pay for flights for your travels and events.</p>
          </div>
          
        </div>

        <section className="home-container mx-auto">
          <div className="get-started flex items-start justify-between lg:flex-row flex-col-reverse">

            <div className='getting_started'>
                <div className='get-started_container'>
                  <div className='infoo'>
                    <p className='infoo_title'>Getting Started</p>
                    <p className='infoo_subtitle'>Let's help you get started. Here are some key things to do.</p>
                  </div>
                  
                  <Onboarding className='mt-[16px]' />
                </div>

                <div className="get-started_steps">
                    <div className='step'>
                      <span className='step-stat-done'>
                        DONE
                      </span>
                      <span className='complete'>Complete registration</span>
                      
                    </div>

                    <Link to='/settings' className='step'>
                      <span className='step-stat uppercase'>
                        Step 2
                      </span>
                      <span className='step-info'>Add a bank account</span>
                      <ArrowRight />
                    </Link>

                    <Link to='/wallet/deposit' className='step'>
                      <span className='step-stat uppercase'>
                        Step 3
                      </span>
                      <span className='step-info'>Fund your aeropaye wallet</span>
                      <ArrowRight />
                    </Link>

                    <Link to='/dashboard' className='step'>
                      <span className='step-stat uppercase'>
                        Step 4
                      </span>
                      <span className='step-info'>Complete your booking profile</span>
                      <ArrowRight />
                    </Link>

                </div>
            </div>

            <div className='w-full lg:w-auto flex items-center justify-between pr-2'>
                <label className='checkbox flex items-center'>
                    <input type="checkbox"/>
                    <span className='checkbox-info'>Don't show me this again</span>
                </label>
                 <button className=''><Close /></button>
            </div>
              
          </div>
         
          <div className="flex lg:flex-row flex-col justify-evenly items-center user-details">
              <Link to='/passenger/wallet' className="user-details_container mr-[24px]">
                  <div className='flex items-center justify-between'>
                      <div className='type'>
                        <p> Aeropaye Balance </p>
                        <button>
                          <EyeOpen />
                        </button>
                      </div>

                      <div>
                        <AeropayeBalance />
                      </div>
                  </div>

                  <div className="balance-container">
                      <p className='balance'>0.00000000</p>
                      <p className='rates'>≈ 0.00 NGN</p>
                  </div>

                  <div className='flex items-center'>
                    <p className='percentage-increase'>+5.75%</p>
                    <ArrowUp />
                  </div>
              </Link>

              <Link to='/passenger/dashboard' className="user-details_container mr-[24px] flex justify-between">
                  <div className=''>
                      <div className='flight-booked my-[20px]'>
                          <p>Flight Booked</p>
                        <div className='flex items-center lg:items-start xl:items-center book xl:flex-row lg:flex-col flex-row'>
                            <p className='booked'>10</p>
                            <p className='aero-token'>(1,019.4534 Aeropaye)</p>
                        </div>
                      </div>

                       <div className='flight-booked my-[20px]'>
                          <p>Refunds Claimed</p>
                         <div className='flex items-center book'>
                            <p className='booked'>3</p>
                            <p className='aero-token'>(156,000.00 NGN)</p>
                          </div>
                      </div>
                  </div>

                  <div>
                    <BookedFlight />
                  </div>
              </Link>

              <Link to='/passenger/transaction-history' className="user-details_container flex justify-between">
                  <div className=''>
                      <div className='flight-booked my-[20px]'>
                          <p>Total Deposits</p>
                        <div className='flex items-start sm:items-center lg:items-start xl:items-center book xl:flex-row lg:flex-col sm:flex-row flex-col'>
                            <p className='booked'>2,658.6209</p>
                            <p className='aero-token'>(≈ 1,516,060.00 NGN)</p>
                        </div>
                      </div>

                       <div className='flight-booked my-[20px]'>
                          <p>Total Withdrawals</p>
                         <div className='book'>
                            <p className='booked'>124,000.00 NGN </p>
                          </div>
                      </div>
                  </div>

                  <div>
                    <TotalDeposit />
                  </div>
              </Link>
          </div>
        </section>

    </div>
  )
}

export default Home