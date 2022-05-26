import React, {useState, useRef} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';
import { ReactComponent as Copy } from '../../../assets/dashboard-icons/copy.svg';

const AuthModal = ({ open, onCloseModal, onEnableAuth }) => {
    const [authCode, setAuthCode] = useState(new Array(6).fill(""));
    const [focus, setFocus] = useState('');
    const [isCopy, setIsCopy] = useState(false);
    const textAreaRef = useRef(null);

     function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setAuthCode([...authCode.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

  return (
   <Modal open={open} onClose={onCloseModal} center >
        <div className="authmodal">
            <div className='auth-header'>
                <p className='title'>Set up Google Authenticator</p>
                <button onClick={onCloseModal}><Close /></button>
                
            </div>
            
            <div className='authmodal-container'>

                <div className='mr-0 sm:mr-[32px]'>
                    <p className='subtitle'>Follow the guide below to set up Google Authenticator for additional layer of security.</p>
                    <div className='code-label'>
                        <p className='subtitle'>If you have any problem with scanning the QR code, enter this code manually into the app.</p>
                        <label className='code-input'>
                             <input type="text"  
                                className='auth-input'
                                value="1KLTG4RS7XCJK9FS" 
                                ref={textAreaRef}
                                readOnly
                                 />
                                <button className="copy inline-flex items-center px-3"
                                onClick={() => {setIsCopy(true); copyToClipboard();}}>
                                   { isCopy ? 'Copied' : 
                                    <Copy />}
                                </button>

                        </label>
                    </div>

                    <div className='auth-code'>
                        <p className='subtitle'>Enter security code from app:</p>
                        <div className='flex justify-center items-center login-container-code '>
                            {authCode.map((data, index) => {
                                return (
                                    <input
                                    className={`auth_input auth_input-${index} flex items-center ${focus === `input-${index}` ? 'clicked' : ''}`} 
                                        type="text"
                                        placeholder='-'
                                        name="authCode"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => {e.target.select(); setFocus(`input-${index}`);}}
                                    />
                                );
                            })}
                        </div>

                        <button className="auth-button" type='submit'
                        onClick={onEnableAuth}>Enable Google Authenticator</button>
                    </div>
                </div>

                <div className='auth-qrcode'>
                    <div className='auth-qrcode_info'>
                        <p>
                            Use Google Authenticator app to scan this QR code, <a href='/settings' className='download-app'>Download</a> the app here if you dont already have it.
                        </p>
                        
                    </div>
                </div>
                
            </div>
        </div>
        
    </Modal>
  )
}

export default AuthModal