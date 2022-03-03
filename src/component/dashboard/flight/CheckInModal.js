import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';

const CheckInModal = ({ open, onCloseModal, onChecked }) => {
  return (
    <Modal open={open} onClose={onCloseModal} center >
        <div className="checkin">
            <div className='checkin-header'>
                <p className='title'>Check-in</p>
                <button onClick={onCloseModal}><Close /></button>
                
            </div>
            
            <div className='checkinmodal-container'>
                    <p className='subtitle'>By checking in, you agree that you have accepted your boarding pass for this flight [Ticketless ID]. Subject to the airline terms, you cannot claim any refund thereof once you've  checked in.</p>

                    <button className="checkin-btn" type='submit'
                    onClick={() => {onChecked(); onCloseModal();}}>Yes, check-in</button>

                    <button className="cancel-btn" type='submit'
                    onClick={onCloseModal}>Cancel</button>

                </div>
                
        </div>
    </Modal>
   
  )
}

export default CheckInModal