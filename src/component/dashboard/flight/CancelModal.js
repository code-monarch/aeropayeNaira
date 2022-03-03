import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';

const CancelModal = ({ openCancelModal, onCloseCancelModal, onCanceled }) => {
  return (
    <Modal open={openCancelModal} onClose={onCloseCancelModal} center >
        <div className="checkin">
            <div className='checkin-header'>
                <p className='title'>Cancel flight</p>
                <button onClick={onCloseCancelModal}><Close /></button>
                
            </div>
            
            <div className='checkinmodal-container'>
                    <p className='subtitle'>You're about to cancel your trip from Lagos (LOS) to Abuja (ABV) scheduled to take-off 08:00 PM local time. Are you sure about this? This action cannot be undone.</p>

                    <div className='cancel-label'>
                        <p className='cancel-label_title'>Reason for cancellation</p>
                        <label>
                            <textarea rows="3" placeholder='Why are you cancelling this flight?'></textarea>
                        </label>
                    </div>

                    <button className="cancelFlight-btn" type='submit'
                    onClick={() => {onCanceled(); onCloseCancelModal();}}>Cancel flight</button>

                    <button className="cancel-btn" type='submit'
                    onClick={onCloseCancelModal}>Cancel</button>

                </div>
                
        </div>
    </Modal>
   
  )
}

export default CancelModal