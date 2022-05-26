import React, {useState, useEffect} from 'react';
import Nav from '../reusable/Nav';
import { ReactComponent as EyeOpen } from '../../assets/dashboard-icons/eye-icon.svg';
import { ReactComponent as AddIcon } from '../../assets/dashboard-icons/add-circle.svg';
import { ReactComponent as MinusIcon } from '../../assets/dashboard-icons/minus-cirlce.svg';
import { ReactComponent as ArrowUp } from '../../assets/dashboard-icons/arrow_up.svg';
import { ReactComponent as ArrowDown } from '../../assets/dashboard-icons/arrow_down.svg';
import { ReactComponent as WithdrawIcon } from '../../assets/dashboard-icons/withdrawIcon.svg';
import { ReactComponent as ReceiveIcon } from '../../assets/dashboard-icons/receiveIcon.svg';
import { ReactComponent as FundIcon } from '../../assets/dashboard-icons/fundIcon.svg';
import { ReactComponent as SendIcon } from '../../assets/dashboard-icons/sendIcon.svg';
import { Link } from 'react-router-dom';

const Wallet = () => {
    const [isActive, setIsActive] = useState('wallet');
     const [showMobileButton, setShowMobileButton] = useState(window.matchMedia("(max-width:500px)").matches);

    useEffect(() => {
        window.addEventListener("resize", () => {
        setShowMobileButton(window.matchMedia("(max-width:500px)").matches);
        });
    });

  return (
    <div className='wallet-container '>
        <Nav isActive={isActive} setIsActive={setIsActive} />

        <div className="sticky z-[3] top-[4.5rem] w-full">
            <div className='wallet'>
                <div className='wallet-type'>
                <p> Aeropaye Balance </p>
                    <button>
                        <EyeOpen />
                    </button>
                </div>
                <p className='wallet-bal'>2,063.157894</p>
                <p className='wallet-rate'>≈ 1,150,000.00 NGN</p>
            </div>

            {
                showMobileButton ? 
                <div className="wallet-mobile-buttons">

                <Link to='deposit' className='mobile_deposit mobile_button'>
                    Deposit
                </Link>

                <div className='flex items-center w-full justify-evenly'>
                    <Link to='withdraw' className='mobile_button mr-[16px]'>
                    Withdraw
                </Link>
                <Link to='send' className='mobile_button mr-[16px]'>
                    Send
                </Link>
                <Link to='receive' className='mobile_button'>
                    Receive
                </Link>
                </div>
                
            </div>
             :

                <div className="wallet-buttons">
                <Link to='deposit' className='deposit button'>
                    <AddIcon />
                    <span>Deposit</span>
                </Link>
                <Link to='withdraw' className='button'>
                    <MinusIcon />
                    <span>Withdraw</span>
                </Link>
                <Link to='send' className='button'>
                    <ArrowUp />
                    <span>Send</span>
                </Link>
                <Link to='receive' className='button'>
                    <ArrowDown />
                    <span>Receive</span>
                </Link>
            </div>

            }
            
        </div>

         {
            showMobileButton ? <p className='mobile-wallet-title'>Recent wallet transactions</p> : ''
        }
        <section className='wallet-transaction'>
            <div className='flex items-center justify-between'>
            {
                showMobileButton ? '' : <p className='title'>Recent wallet transactions</p>
            }
                
                <Link to='/transaction-history' className='trans-history'>See all transactions</Link>
            </div>
            <div className='recent-history'>
                <div className='flex justify-between items-center recent-history_list'>
                    <div className='flex items-center'>
                        <WithdrawIcon />
                        <div className='details flex flex-col items-start'>
                            <p className='trans-description'>Withdrawal to bank account</p>
                            <p className='trans-date'>16 July 2022, 11:35 AM</p>
                        </div>
                    </div>
                    <div className='details flex flex-col items-end'>
                        <p className='trans-balance'>- 100,000.00</p>
                        <p className='trans-rate'>≈  210.4523 Aeropaye</p>
                    </div>
                </div>

                <div className='divide'></div>

                <div className='flex justify-between items-center recent-history_list'>
                    <div className='flex items-center'>
                        <ReceiveIcon />
                        <div className='details flex flex-col items-start'>
                            <p className='trans-description'>Received</p>
                            <p className='trans-date'>16 July 2022, 11:35 AM</p>
                        </div>
                    </div>
                    <div className='details flex flex-col items-end'>
                        <p className='trans-balance'>+ 50.4050</p>
                        <p className='trans-rate'>≈ 70,000.00 NGN</p>
                    </div>
                </div>
                
                <div className='divide'></div>

                 <div className='flex justify-between items-center recent-history_list'>
                    <div className='flex items-center'>
                        <FundIcon />
                        <div className='details flex flex-col items-start'>
                            <p className='trans-description'>Funding wallet via paystack</p>
                            <p className='trans-date'>16 July 2022, 11:35 AM</p>
                        </div>
                    </div>
                    <div className='details flex flex-col items-end'>
                        <p className='trans-balance'>+ 250,000.00</p>
                        <p className='trans-rate'>≈ 438.5964 Aeropaye</p>
                    </div>
                </div>

                <div className='divide'></div>

                 <div className='flex justify-between items-center recent-history_list'>
                    <div className='flex items-center'>
                        <SendIcon />
                        <div className='details flex flex-col items-start'>
                            <p className='trans-description'>Sent</p>
                            <p className='trans-date'>16 July 2022, 11:35 AM</p>
                        </div>
                    </div>
                    <div className='details flex flex-col items-end'>
                        <p className='trans-balance'>- 123.9806</p>
                        <p className='trans-rate'>≈ 185,000.78 NGN</p>
                    </div>
                </div>

                 <div className='divide'></div>

                 <div className='flex justify-between items-center recent-history_list'>
                    <div className='flex items-center'>
                        <FundIcon />
                        <div className='details flex flex-col items-start'>
                            <p className='trans-description'>Funding wallet via flutterwave</p>
                            <p className='trans-date'>16 July 2022, 11:35 AM</p>
                        </div>
                    </div>
                    <div className='details flex flex-col items-end'>
                        <p className='trans-balance'>+ 20,000.00</p>
                        <p className='trans-rate'>≈ 35.0877 Aeropaye </p>
                    </div>
                </div>
            
            </div>
        </section>

    </div>
  )
}

export default Wallet