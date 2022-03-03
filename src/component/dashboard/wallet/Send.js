import React, { useState } from 'react';
import Nav from '../Nav';
import { ReactComponent as ArrowLeft } from '../../../assets/dashboard-icons/arrow-left.svg';
import { Link } from 'react-router-dom';

const Send = () => {
    const [focus, setFocus] = useState('');
    const [isActive, setIsActive] = useState('wallet'); 
  return (
    <>
    <Nav isActive={isActive} setIsActive={setIsActive} />
    <div className='withdraw xl:h-screen h-auto'>
        <div className="withdraw-container">
            <Link to='/wallet' className='back-link'>
                <ArrowLeft />
                <p className='back-link_nav'>Back</p>
            </Link>

            <div className='withdraw-form'>
                <div>
                    <p className='withdraw-form_title'>Who are you sending to?</p>

                    <div className='withdraw-form_amount-form'>
                        <p className='withdraw-form_amount-form_title'>Recipient Address</p>

                            <label className={`flex withdraw-form_amount-form_input ${focus === 'email' ? 'clicked' : ''}`}>
                                <input type="email"  
                                className='input-email'
                                placeholder="Enter wallet or email address" 
                                onFocus={() => setFocus('email')} />
                                <button className='max inline-flex items-center px-3 '>PASTE</button>
                            </label>
                    </div>
                </div>

                <div className='mt-[36px] mb-[32px]'>
                    <p className='withdraw-form_title'>How much are you sending?</p>

                    <div className='withdraw-form_amount-form'>
                        <p className='withdraw-form_amount-form_title'>Amount</p>

                            <label className={`flex withdraw-form_amount-form_input ${focus === 'amount' ? 'clicked' : ''}`}>
                                <input type="text"  
                                className='input-email'
                                placeholder="Enter amount" 
                                onFocus={() => setFocus('amount')} />
                            </label>
                           
                        <p className='withdraw-form_amount-form_balance'>Balance: 210.4523 Aeropaye</p>
                    </div>
                </div>

                    <div>
                        <button
                        className='withdraw-form_button flex items-center cursor-pointer justify-center' 
                        type='submit'
                        >Send aeropaye</button>
                    </div>

                    <p className='withdraw-form_info'>Should arrive after 5 network confirmations</p>
               
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Send