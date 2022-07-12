import React, { useState } from 'react';
import { ReactComponent as Password } from '../../../assets/icons/password.svg';
import { ReactComponent as Hide } from '../../../assets/icons/Hide.svg';
import { ReactComponent as ShowIcon } from '../../../assets/icons/showIcon.svg';
import { ReactComponent as Copy } from '../../../assets/dashboard-icons/copy.svg';
import { ReactComponent as Checked } from '../../../assets/dashboard-icons/enabled.svg';
import AuthModal from './AuthModal';
import SmsVerifyModal from './SmsVerifyModal'


const Security = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focus, setFocus] = useState('');
    const [oldPassword, setOldPassword] = useState(''); 
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [open, setOpen] = useState('');
    const onCloseModal = () => setOpen('');

    const [enableSms, setEnableSms] = useState(false);
    const [enableAuth, setEnableAuth] = useState(false);

    const onEnableAuth = () => {
      setEnableAuth(true);
    }
     const onEnableSms = () => {
      setEnableSms(true);
    }


  const handlesubmit = (e) => {
      e.preventDefault();
  }

  return (
    <div className='security'>
      <div className='security-container'>
        <p className='title'>2-Factor Authentication.</p>
        <p className='subtitle'>Set up 2-Factor authentication below for an extra layer of security on your Aeropaye account.</p>
        <div className='form-line'></div>

        <div className='security-options'>
        
        <div className='security-options-list '>
          <div className='flex items-center justify-between'>
            <div  className='security-options-list_desc'>
              <p className='title'>Google Authenticator</p>
              <p className='subtitle'>Use the Google Authenticator app to generate one time security codes.</p>
            </div>

            <div className='security-options-list_toggle'>
              <label htmlFor="toggle-one" className="flex relative items-center cursor-pointer">
                <input type="checkbox" id="toggle-one" className="sr-only" 
                onClick={onOpenModal =>  (setOpen('auth'))} />
                <div className="border border-gray-200 toggle-bg toggle-btn"></div>
              </label>
            </div>
          </div>

          {
            enableAuth ? 
            <div className='enabled-verification'>
              <div className='flex items-center verify'>
                <div className='flex items-center ver'>
                  <Checked className='mr-[8px]'/>
                  <p className='added-date mr-[16px]'>Added Dec 7, 2021</p>
                </div>
                <p className='backup-code'>Backup code: <span className='code'>1KLTG4RS7XCJK9FS</span> </p>
              </div>
              <button><Copy /></button>
          </div> : ''
          }
          
        </div>
          <div className='security-options-list'>
            <div className='flex justify-between items-center'>
            <div className='security-options-list_desc'>
              <p className='title'>Text message (SMS) </p>
              <p className='subtitle'>Prompt and get securty codes to your connected phone number via SMS.</p>
            </div>

            <div className='security-options-list_toggle'>
              <label htmlFor="toggle-two" className="flex relative items-center cursor-pointer">
                <input type="checkbox" id="toggle-two" className="sr-only"
                onClick={onOpenModal =>  (setOpen('sms'))} />
                <div className="border border-gray-200 toggle-bg toggle-btn"></div>
              </label>
            </div>
          </div>
          {
            enableSms ? 
            <div className='enabled-verification'>
              <div className='flex items-center verify'>
                <div className='flex items-center ver'>
                  <Checked className='mr-[8px]'/>
                  <p className='added-date mr-[16px]'>Added Dec 7, 2021</p>
                </div>
                
                <p className='connected-phone'>Connected Phone Number: <span className='phoneNo'>(555) 555-1234</span> </p>
              </div>
              <button className='download'>Change</button>
          </div> : ''
          }

          </div>
          
        </div>
      </div>

      <div className='security-password'>
        <p className='title'>Change password</p>
        <p className='subtitle'>Set / choose a new password.</p>
        <div className='form-line'></div>

        <form onSubmit={handlesubmit} className='security-password_form'>
            <div className='mb-[20px]'>
                    <div className='security-password_form_inputs w-full'>
                        <p className='security-password_form_inputs-title'>
                            Old password
                        </p>
                        <label className={`security-password_form_inputs-label flex items-center justify-between ${focus === 'password-input' ? 'clicked' : ''}`}>
                          <div className='flex items-center'>
                            <span className='flex items-center w-auto'>
                                <Password className='mr-[8px]' />
                            </span>
                            <input 
                            className='w-full'
                            type={showOldPassword ? "text" : "password"} 
                            value={oldPassword}
                            placeholder='Password' 
                            onKeyPress={() => setFocus('password-input')}
                            onChange={(e) => setOldPassword(e.target.value)}/>
                          </div>
                            

                            <span className='cursor-pointer' 
                            onClick={() => {setShowOldPassword(!showOldPassword);}}>
                            {
                                showOldPassword ? 
                                <ShowIcon className='h-[12.75px] w-[15px]' /> : 
                                <Hide className='h-[12.75px] w-[15px]' />
                            }
                                
                            </span>
                        </label>
                    </div>
            </div>

            <div className='mb-[20px]'>
                    <div className='security-password_form_inputs w-full'>
                        <p className='security-password_form_inputs-title'>
                            New Password
                        </p>
                        <label className={`security-password_form_inputs-label flex items-center justify-between ${focus === 'password-input2' ? 'clicked' : ''}`}>
                          <div className='flex items-center'>
                            <span className='flex items-center w-auto'>
                                <Password className='mr-[8px]' />
                            </span>
                            <input 
                            className='w-full'
                            type={showNewPassword ? "text" : "password"} 
                            value={newPassword}
                            placeholder='Password' 
                            onKeyPress={() => setFocus('password-input2')}
                            onChange={(e) => setNewPassword(e.target.value)}/>
                          </div>
                            

                            <span className='cursor-pointer' 
                            onClick={() => {setShowNewPassword(!showNewPassword);}}>
                            {
                                showNewPassword ? 
                                <ShowIcon className='h-[12.75px] w-[15px]' /> : 
                                <Hide className='h-[12.75px] w-[15px]' />
                            }
                                
                            </span>
                        </label>
                    </div>
            </div>

             <div className='mb-[20px]'>
                    <div className='security-password_form_inputs w-full'>
                        <p className='security-password_form_inputs-title'>
                            Confirm New Password
                        </p>
                        <label className={`security-password_form_inputs-label flex items-center justify-between ${focus === 'password-input3' ? 'clicked' : ''}`}>
                          <div className='flex items-center'>
                            <span className='flex items-center w-auto'>
                                <Password className='mr-[8px]' />
                            </span>
                            <input 
                            className='w-full'
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword}
                            placeholder='Password' 
                            onKeyPress={() => setFocus('password-input3')}
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                          </div>
                            

                            <span className='cursor-pointer' 
                            onClick={() => {setShowConfirmPassword(!showConfirmPassword);}}>
                            {
                                showConfirmPassword ? 
                                <ShowIcon className='h-[12.75px] w-[15px]' /> : 
                                <Hide className='h-[12.75px] w-[15px]' />
                            }
                                
                            </span>
                        </label>
                    </div>
            </div>

            <button className="security-button" type='submit'>Save new password</button>
        </form>
      </div>

      <AuthModal open={open === 'auth'} onCloseModal={onCloseModal} onEnableAuth={onEnableAuth} />
      <SmsVerifyModal open={open === 'sms'} onCloseModal={onCloseModal} onEnableSms={onEnableSms} />
    </div>
  )
}

export default Security