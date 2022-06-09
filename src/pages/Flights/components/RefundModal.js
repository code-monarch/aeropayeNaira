import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactComponent as Close } from '../../../assets/dashboard-icons/Close.svg';

const RefundModal = ({ openRefundModal, onCloseRefundModal, onOpenRefundedModal }) => {
  return (
    <Modal open={openRefundModal} onClose={onCloseRefundModal} center >
        <div className="refund">
            <div className='refund-header'>
                <p className='title'>Claim refund</p>
                <button onClick={onCloseRefundModal}><Close /></button>
                
            </div>
            
            <div className='refundmodal-container'>
                    <p className='subtitle'>Refunds are processed in seconds and updated in your aeropaye balance.</p>

                    <div className='cancel-label mb-[16px]'>
                        <p className='cancel-label_title'>Ticketless ID</p>
                        <label className='refund-input'>
                            <input type="text" value='890512'/>
                        </label>
                    </div>

                    <div className='flex items-center mb-[16px]'>

                        <div className='cancel-label mr-[16px]'>
                        <p className='cancel-label_title'>Departure</p>
                        <label className='refund-input-2'>
                            <input type="text" value='Lagos (LOS)' className='bg-gray-input' readOnly/>
                        </label>
                    </div>

                    <div className='cancel-label'>
                        <p className='cancel-label_title'>Destination</p>
                        <label className='refund-input-2 px-[12px]'>
                            <input type="text" value='Abuja (ABV)' className='bg-gray-input' readOnly/>
                        </label>
                    </div>
                    </div>

                    <div className='cancel-label mb-[16px]'>
                        <p className='cancel-label_title'>Trip type</p>
                        <label className='refund-input'>
                            <input type="text" value='890512' className='bg-gray-input'/>
                        </label>
                    </div>

                    <div className='cancel-label mb-[16px]'>
                        <p className='cancel-label_title'>Refund amount</p>
                        <label className='refund-input'>
                            <input type="text" value='122.8070 Aeropaye (≈ 80,000 NGN)' readOnly className='bg-gray-input'/>
                        </label>
                    </div>

                    <button className="refund-btn" type='submit'
                    onClick={() => { onOpenRefundedModal(); onCloseRefundModal();}}>Claim refund</button>

                    <p className='refund-subSubtitle'>This trip was cancelled by you.</p>

                </div>
                
        </div>
    </Modal>
   
  )
}

export default RefundModal