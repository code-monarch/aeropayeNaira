import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
import { ReactComponent as Arrival } from "../../../assets/dashboard-icons/arrival-icon.svg";
import { ReactComponent as Departure } from "../../../assets/dashboard-icons/departure-icon.svg";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as Arr } from "../../../assets/dashboard-icons/Arr2.svg";
import { ReactComponent as Plane } from '../../../assets/dashboard-icons/flight-plane.svg';
import { ReactComponent as ArrRight } from "../../../assets/dashboard-icons/ArrRight.svg";
import { ReactComponent as ShowIcon } from '../../../assets/showIcon.svg';

const FlightsInfo = ({ checkedIn, onOpenModal, onOpenCancelModal, isCanceled, onOpenRefundModal, isRefunded, filter }) => {
  return (

      <div className='flex sm:flex-row flex-col'>
          <div className="flight-container_information">
            <div className={`flight-container_information-list ${isCanceled && 'clicked'} ${isRefunded && 'unclicked'}`}>
                <div className="header">
                    <p className='flex items-center'>
                        Itinerary : &nbsp;&nbsp; 
                        Lagos (LOS) &nbsp;&nbsp; 
                        <Arr /> &nbsp;&nbsp;  
                        Abuja (ABV)&nbsp;&nbsp;  
                        |&nbsp;&nbsp;  
                        Ticketless ID: 890512
                    </p>

                    <div className='flight-type'>
                        <Plane className='mr-[8px]' />
                        Round Trip
                    </div>
                </div>
                <div className="section">
                    <div className='body'>
                    <div className="info">
                        <p className='flex items-center'>
                            <Departure className='mr-[12px]' />
                            Departure: 
                            <span className='mx-[12px]'>Lagos (LOS)</span>
                            <ArrRight />
                            <span className='mx-[12px]'>Abuja(ABV)</span>
                        </p>
                        <div className='flex items-center'>
                            <Calendar className='mr-[12px]'/>
                            <p>Feb 20, 2022</p>
                        </div>
                    </div>
                    <div className="body-flight_details">
                        <div className='airline-logo'>
                            <AirArik/>
                        </div>

                        <div className='arrival-time'>
                            <p className='time'>3:30 PM</p>
                            <p className='location'>Abuja</p>
                            <p className="airport">Nnamdi Azikiwe International Airport (Nigeria)</p>
                        </div>
                        
                        <div className="hours">
                            <p className="mb-[4px]">1h 30m</p>
                            <Line />
                            <p className="mt-[4px]">0 Stops</p>
                        </div>

                        <div className='departure-time'>
                            <p className='time'>5:00 PM</p>
                            <p className='location'>Lagos</p>
                            <p className="airport">Murtala Muhammed International Airport (Nigeria)</p>
                        </div>

                        <div className="flight-cabin-economy">
                            Economy
                        </div>

                    </div>
                    </div>
                    <div className='body'>
                        <div className="info">
                            <p className='flex items-center'>
                                <Arrival className='mr-[12px]' />
                                Return: 
                                <span className='mx-[12px]'>Abuja(ABV)</span>
                                <ArrRight />
                                <span className='mx-[12px]'>Lagos (LOS)</span>
                            </p>
                            <div className='flex items-center'>
                                <Calendar className='mr-[12px]'/>
                                <p>Feb 21, 2022</p>
                            </div>
                        </div>
                        <div className="body-flight_details">
                            <div className='airline-logo'>
                                <AirArik/>
                            </div>
                            
                            <div className='departure-time'>
                                <p className='time'>11:30 AM</p>
                                <p className='location'>Lagos</p>
                                <p className="airport">Murtala Muhammed International Airport (Nigeria)</p>
                            </div>

                            <div className="hours">
                                <p className="mb-[4px]">1h 30m</p>
                                <Line />
                                <p className="mt-[4px]">0 Stops</p>
                            </div>

                            <div className='arrival-time'>
                                <p className='time'>1:00 PM</p>
                                <p className='location'>Abuja</p>
                                <p className="airport">Nnamdi Azikiwe International Airport (Nigeria)</p>
                            </div>

                            <div className="flight-cabin-economy">
                                Economy
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flight-checkout">
                    <div className='flex items-center'>
                        <Profile className='mx-[10px]' />
                        <p>Passengers: 
                        <span className='mx-[8px]'>Derek Hale</span>,
                        <span className='mx-[8px]'>Jessica Smith</span>
                        </p>
                    </div>

                    {  isRefunded ? 
                        <div className='refund-claim'> 
                            <p>Refund has been claimed for this flight</p>
                        </div> :

                        <div>
                        {
                        checkedIn ? 
                            <div className='flex items-center'>
                                <button className='checkIn-button' 
                                disabled>Checked in</button>
                            </div> : 
                        isCanceled ?
                            <div className='flex items-center'>
                                <button className='cancel-button'
                                onClick={onOpenRefundModal}>Claim refund</button>
                            </div> : 
                            <div className='flex items-center'>
                                <button className='cancel-button'
                                onClick={onOpenCancelModal}>Cancel flight</button>

                                <button className='checkIn-button' 
                                onClick={onOpenModal}>Check in</button>
                            </div>
                        }
                        </div>
                    }
                    
                </div>
                
            </div>

            <div className="flight-container_information-list">
            <div className='warning'>
                <Warning />
                <p>The availability of this flight will expire in <b>23:30:12</b> if payment is not being made.</p>
            </div>
            <div className="header">
                <p className='flex items-center'>
                    Itinerary : &nbsp;&nbsp; 
                    Lagos (LOS) &nbsp;&nbsp; 
                    <Arr /> &nbsp;&nbsp;  
                    Accra(ACC)&nbsp;&nbsp;  
                    |&nbsp;&nbsp;  
                    Ticketless ID: XXXXXXX
                </p>

                <div className='flight-type'>
                    <Plane className='mr-[8px]' />
                    One-way Trip
                </div>
            </div>
            <div className="section">
                <div className='body'>
                <div className="info">
                    <p className='flex items-center'>
                        <Departure className='mr-[12px]' />
                        Departure: 
                        <span className='mx-[12px]'>Lagos (LOS)</span>
                        <ArrRight />
                        <span className='mx-[12px]'>Accra (ACC)</span>
                    </p>
                    <div className='flex items-center'>
                        <Calendar className='mr-[12px]'/>
                        <p>Mar 03, 2022</p>
                    </div>
                </div>
                <div className="body-flight_details">
                    <div className='airline-logo'>
                        <AirPeace />
                    </div>

                    <div className='departure-time'>
                        <p className='time'>7:30 AM</p>
                        <p className='location'>Lagos</p>
                        <p className="airport">Murtala Muhammed International Airport (Nigeria)</p>
                    </div>

                    <div className="hours">
                        <p className="mb-[4px]">1h 45m</p>
                        <Line />
                        <p className="mt-[4px]">0 Stops</p>
                    </div>

                    <div className='arrival-time'>
                        <p className='time'>9:15 AM</p>
                        <p className='location'>Accra</p>
                        <p className="airport">Kotoka, T3, Accra (Ghana)</p>
                    </div>

                    <div className="flight-cabin-business">
                        Business
                    </div>

                </div>
                </div>
            </div>
            <div className="flight-checkout">
                <div className='flex items-center'>
                    <Profile className='mx-[10px]' />
                    <p>Passengers: 
                    <span className='mx-[8px]'>Derek Hale</span>
                    </p>
                </div>

                <div className='flex items-center'>
                    <Link to='/book-flight' className='cancel-button'>Change flight</Link>
                    <button className='checkIn-button'>Make payment</button>
                </div>
            </div>
            
            </div>

            <div className="flight-container_information-list">
                <div className='warning'>
                    <Warning />
                    <p>The availability of this flight will expire in <b>09:45:54</b> if payment is not being made.</p>
                </div>
                <div className="header">
                    <p className='flex items-center'>
                        Itinerary : &nbsp;&nbsp; 
                        Port-Harcourt (PHC) &nbsp;&nbsp; 
                        <Arr />&nbsp;&nbsp;  
                        Lagos (LOS)&nbsp;&nbsp;  
                        |&nbsp;&nbsp;  
                        Ticketless ID: XXXXXXX
                    </p>

                    <div className='flight-type'>
                        <Plane className='mr-[8px]' />
                        One-way Trip
                    </div>
                </div>
                <div className="section">
                    <div className='body'>
                    <div className="info">
                        <p className='flex items-center'>
                            <Departure className='mr-[12px]' />
                            Departure: 
                            <span className='mx-[12px]'>Port-Harcourt (PHC)</span>
                            <ArrRight />
                            <span className='mx-[12px]'>Lagos (LOS)</span>
                        </p>
                        <div className='flex items-center'>
                            <Calendar className='mr-[12px]'/>
                            <p>Mar 10, 2022</p>
                        </div>
                    </div>
                    <div className="body-flight_details">
                        <div className='airline-logo'>
                            <AirIbom />
                        </div>

                        <div className='departure-time'>
                            <p className='time'>9:00 AM</p>
                            <p className='location'>Port-Harcourt</p>
                            <p className="airport">Port-Harcourt International Airport (Nigeria)</p>
                        </div>

                        <div className="hours">
                            <p className="mb-[4px]">0h 45m</p>
                            <Line />
                            <p className="mt-[4px]">0 Stops</p>
                        </div>

                        <div className='arrival-time'>
                            <p className='time'>9:45 AM</p>
                            <p className='location'>Lagos</p>
                            <p className="airport">Murtala Muhammed International Airport (Nigeria)</p>
                        </div>

                        <div className="flight-cabin-premium-eco">
                            premium eco.
                        </div>

                    </div>
                    </div>
                </div>
                <div className="flight-checkout">
                    <div className='flex items-center'>
                        <Profile className='mx-[10px]' />
                        <p>Passengers: 
                        <span className='mx-[8px]'>Derek Hale</span>
                        </p>
                    </div>

                    <div className='flex items-center'>
                        <Link to ='/book-flight' className='cancel-button'>Change flight</Link>
                        <button className='checkIn-button'>Make payment</button>
                    </div>
                </div>
                
            </div>
        </div>

        <div className="flight-container_history">
                        <p className='flight-container_history_title'>My flights history</p>

                        <div className="flight-container_history-container">
                            <div className='flight-history_item'>
                                <div className='flight-history_item-list'>
                                    <p className="flight-history_item-list-places">
                                        <span className='mr-[12px]'>Lagos (LOS)</span>
                                        <ArrRight />
                                        <span className='ml-[12px]'>Abuja(ABV)</span>
                                    </p>
                                    <p className='flight-history_item-list-date'>Feb 04, 2022</p>
                                </div>
                                <ShowIcon className='h-[12.75px] w-[15px]' />
                            </div>

                            <div className='flight-history_item'>
                                <div className='flight-history_item-list'>
                                    <p className="flight-history_item-list-places">
                                        <span className='mr-[12px]'>Lagos (LOS)</span>
                                        <ArrRight />
                                        <span className='ml-[12px]'>Abuja(ABV)</span>
                                    </p>
                                    <p className='flight-history_item-list-date'>Feb 04, 2022</p>
                                </div>
                                <ShowIcon className='h-[12.75px] w-[15px]' />
                            </div>

                            <div className='flight-history_item'>
                                <div className='flight-history_item-list'>
                                    <p className="flight-history_item-list-places">
                                        <span className='mr-[12px]'>Lagos (LOS)</span>
                                    <ArrRight />
                                        <span className='ml-[12px]'>Abuja(ABV)</span>
                                    </p>
                                    <p className='flight-history_item-list-date'>Feb 04, 2022</p>
                                </div>
                                <ShowIcon className='h-[12.75px] w-[15px]' />
                            </div>

                            <div className='flight-history_item'>
                                <div className='flight-history_item-list'>
                                    <p className="flight-history_item-list-places">
                                        <span className='mr-[12px]'>Lagos (LOS)</span>
                                    <ArrRight />
                                        <span className='ml-[12px]'>Abuja(ABV)</span>
                                    </p>
                                    <p className='flight-history_item-list-date'>Feb 04, 2022</p>
                                </div>
                                <ShowIcon className='h-[12.75px] w-[15px]' />
                            </div>
                        </div>

                    </div>
      </div>

        
   
  )
}

export default FlightsInfo