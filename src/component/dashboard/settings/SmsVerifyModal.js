import React, {useState} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SmsVerifyModal = ({ open, onCloseModal, onEnableSms }) => {
    const [smsCode, setSmsCode] = useState(new Array(6).fill(""));
    const [focus, setFocus] = useState('');
    const [phone, setPhone] = useState(null);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setSmsCode([...smsCode.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

  return (
   <Modal open={open} onClose={onCloseModal} center >
        <div className="sms">
            <div className='sms-header'>
                <p className='title'>Set up SMS Verification</p>
                <button onClick={onCloseModal}><Close /></button>
                
            </div>
            
            <div className='smsmodal-container'>
                    <p className='subtitle'>Follow the guide below to set up SMS 2FA for additional layer of security.</p>
                    <div className='code-label'>
                        <p>Phone Number</p>
                        <label className=''>
                            <PhoneInput
                            country={'ng'}
                            value={phone}
                            onChange={e => { setPhone( e.target.value); e.preventDefault()
                            }}
/>  
                        </label>
                        <button className='sendSms'>Send me SMS code</button>
                    </div>

                    <div className='auth-code'>
                        <p className='subtitle'>Enter SMS Verification code:</p>
                        <div className='flex justify-center items-center sms-container-code '>
                            {smsCode.map((data, index) => {
                                return (
                                    <input
                                    className={`auth_input auth_input-${index} flex items-center ${focus === `input-${index}` ? 'clicked' : ''}`} 
                                        type="text"
                                        placeholder='-'
                                        name="smsCode"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => {e.target.select(); setFocus(`input-${index}`);}}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <button className="sms-button" type='submit'
                    onClick={onEnableSms}>Enable SMS verification</button>

                </div>
                
        </div>
        
    </Modal>
  )
}

export default SmsVerifyModal