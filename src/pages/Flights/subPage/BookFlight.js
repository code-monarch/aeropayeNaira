import React, {useState} from 'react';
import Booking from '../components/Booking';

const BookFlight = () => {
  return (
    <>
        <div className='booking-detail'>
            <div className="book-section">
              <Booking/>
            </div>
        </div>
        
    </>
  )
}

export default BookFlight