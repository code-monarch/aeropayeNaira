import React, {useState} from 'react';
import Booking from '../../Booking';
import Nav from '../Nav';

const BookFlight = () => {
    const [isActive, setIsActive] = useState('flight');
  return (
    <>
        <Nav isActive={isActive} setIsActive={setIsActive} />
        <div className='booking-detail'>
            <div className="book-section">
              <Booking/>
            </div>
        </div>
        
    </>
  )
}

export default BookFlight