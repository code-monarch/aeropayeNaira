import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';
import { ReactComponent as Ticked } from '../../../assets/dashboard-icons/Ticked.svg';
import { Link } from 'react-router-dom';


const RefundedModal = ({ openRefundModal, onCloseRefundedModal,onClaimedRefund}) => {


  return (
     <Modal open={openRefundModal} onClose={onCloseRefundedModal} center >
        <div className="checkin">
            <div className='checkin-header'>
                <p className='title'>Refund claimed</p>
                <button onClick={onCloseRefundedModal}><Close /></button>
                
            </div>
            
            <div className='checkinmodal-container'>
                    <div className='mb-[23px] flex justify-center items-center'>
                        <Ticked />
                    </div>
                    <p className='subtitle text-center'>Refund of [Refund_amount] for flight [Ticketless_ID] has been succefully added to your aeropaye balance</p>

                    <button className="checkin-btn"
                    onClick={() => {onClaimedRefund(); onCloseRefundedModal();}}>Ok, got it</button>

                    <Link to='/wallet' className="cancel-btn">Go to wallet</Link>
                </div>
                
        </div>
    </Modal>
  )
}

export default RefundedModal