import React, { useState } from 'react';
import { ReactComponent as Arrow } from "../../../assets/icons/arrow-down.svg";
import { ReactComponent as Arrival } from "../../../assets/icons/arrival-icon.svg";
import { ReactComponent as Departure } from "../../../assets/icons/departure-icon.svg";
import { ReactComponent as Switch } from "../../../assets/icons/switch.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar-2.svg";
import { ReactComponent as Tick } from "../../../assets/icons/tick.svg";
import { ReactComponent as Minus } from "../../../assets/icons/minus.svg";
import { ReactComponent as Add } from "../../../assets/icons/plus.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TabBooking = ({mobileTripType, setMobileTripType, cabin, childCount, setAdultCount, setChildCount, adultCount, infantCount, setInfantCount, CabinClass, tick, showTick, setCabin, switchText, setDeparture, setArrival, arrival, departure }) => {

    const [departDate, setDepartDate] = useState(null);
    const [arriveDate, setArriveDate] = useState(null);
     const [passenger, setPassenger] = useState(adultCount + childCount + infantCount);
     const calculateTotal = () => {
        setPassenger(adultCount + childCount + infantCount);
    }
    
  return (
    <div className={mobileTripType === 'Round Trip' ? 'booking-container-2' : 'booking-container'}>
            <div className="flex items-center">

              <button className="booking-container-dropdown dropdown-1 flex items-center justify-between"
              onClick={() => mobileTripType === 'One-Way' ? setMobileTripType('Round Trip') : setMobileTripType('One-Way')}>
                <div tabindex="0">
                  {mobileTripType}
                </div>
                <Arrow />
              </button>

             <button className="booking-container-dropdown dropdown-2 flex items-center justify-between relative">
                <div className="dropdown dropdown-end">
                <div tabindex="1" className="relative">
                  {passenger} Passenger
                </div>
                <ul tabindex="1" className="dropdown-2-container bg-white menu dropdown-content absolute top-8 z-[9999] left-0 ">

                  <li className="mb-[20px]">
                    <div className="flex justify-between items-center">
                        <div>
                           <p className="passenger-type">Adults</p>
                            <p className='passenger-des'>Over 12 years</p>
                        </div>
                        
                        <div className="counter flex justify-between items-center">
                            <button 
                            className={`${adultCount === 0 ? 'non-active' : 'active-icon'}`}
                            onClick={() => adultCount > 0 && setAdultCount(adultCount - 1)}>
                                <Minus />
                            </button>

                            <p className="mx-[10px]">{adultCount}</p>

                            <button  onClick={() => setAdultCount(adultCount + 1)} className='active-icon'>
                                <Add />
                            </button>
                        </div>
                    </div>
                  </li>

                  <li className="mb-[20px]">
                    <div className="flex justify-between items-center">
                         <div>
                            <p className="passenger-type">Children</p>
                            <p className='passenger-des'>2 - 12 years</p>
                        </div>

                        <div className="counter flex justify-between items-center">
                            <button
                            className={`${childCount === 0 ? 'non-active' : 'active-icon'}`}
                            onClick={() =>childCount > 0 && setChildCount(childCount - 1)}>
                                <Minus />
                            </button>
                            <p className="mx-[10px]">{childCount}</p>
                            <button onClick={() => setChildCount(childCount + 1)} className='active-icon'>
                                <Add />
                            </button>
                        </div>
                    </div>
                  </li>

                  <li className="">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="passenger-type">Infants</p>
                            <p className='passenger-des'>Below 12 years</p>
                        </div>

                        <div className="counter flex justify-between items-center">
                            <button 
                            className={`${infantCount === 0 ? 'non-active' : 'active-icon'}`}
                            onClick={() =>infantCount > 0 && setInfantCount(infantCount - 1)}>
                                <Minus />
                            </button>
                            <p className="mx-[10px]">{infantCount}</p>
                            <button onClick={() => setInfantCount(infantCount + 1)} className='active-icon'>
                                <Add />
                            </button>
                        </div>
                    </div>
                  </li>

                        <button className="btn-confirm"
                        onClick={calculateTotal}>
                            Confirm
                        </button>
                  
                </ul>
              </div>
              <Arrow />
              </button>

               <button className="booking-container-dropdown dropdown-3 flex items-center justify-between">
                <div className="dropdown dropdown-end">
                <div tabindex="2" className="relative">
                  {cabin}
                </div>
                <ul tabindex="2" className="dropdown-3-container menu dropdown-content absolute top-8 z-[9999] left-0">
                  {CabinClass.map((i, index) => (
                    <li key={index} className={`${tick === index ? 'selected' : '' }`}>
                    
                      <button
                        className='flex items-center'
                        onClick={() => {setCabin(i); showTick(index); }}>
                       <Tick className={`mr-2 ${tick === index ? 'visible' : 'invisible' }`} />
                        {i}
                      </button>
                    </li>
                  ))}
                </ul>
                </div>
              <Arrow className='ml-4' />
              </button>
              
            </div>

            <div className="flex">
              <div className='relative'>
                <div className='tab-departure flex items-center'>
                    <span><Departure /></span>
                    <input type="text" 
                    placeholder='Departure airport or city' 
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)} />
                </div>

                <button type="button" className='switch-button'
                onClick={switchText}>
                    <Switch />
                </button>
              </div>
                <div className='tab-arrival flex items-center'>
                    <span><Arrival /></span>
                     <input type="text" 
                    placeholder='Destination airport or city' 
                    value={arrival} 
                    onChange={(e) => setArrival(e.target.value)}/>
                </div>
                 </div>

                <div className='flex '>
                
                {
                    mobileTripType === 'Round Trip' ?
                    <div className="flight-date-2 flex items-center">
                        <span><Calendar /></span>
                        <div className="">
                            <p className="text-1">Leaving on</p>
                            <DatePicker
                                    selected={departDate}
                                    onChange={(date) => setDepartDate(date)}
                                    selectsStart
                                     dateFormat="MMM dd, yyyy"
                                    placeholderText="Feb 07, 2022"
                                    className='booking-dates'
                                />
                        </div>

                        <div className="line"></div>

                        <div className="">
                            <p className="text-1">Returning on</p>
                            <DatePicker
                                    selected={arriveDate}
                                    onChange={(date) => setArriveDate(date)}
                                    selectsStart
                                     dateFormat="MMM dd, yyyy"
                                    placeholderText="Feb 07, 2022"
                                    className='booking-dates'
                                />
                        </div>

                    </div> :
                    <div className="flight-date flex items-center">
                        <span><Calendar /></span>
                        <div className="">
                            <p className="text-1">Leaving on</p>
                            <DatePicker
                                    selected={departDate}
                                    onChange={(date) => setDepartDate(date)}
                                    selectsStart
                                     dateFormat="MMM dd, yyyy"
                                    placeholderText="Feb 07, 2022"
                                    className='booking-dates'
                                />
                        </div>
                    </div>
                }
                
                
                <button className='search_button'>
                    Search Flight
                </button>
                </div>

      </div>
  )
}

export default TabBooking