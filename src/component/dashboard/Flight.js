import React, { useState } from 'react';
import Nav from './Nav';
import FlightsInfo from './flight/AllFlight';
import OngoingFlight from './flight/OngoingFlight';
import { ReactComponent as Search } from '../../assets/dashboard-icons/Left_ Icon.svg';
import { ReactComponent as Funnel } from '../../assets/dashboard-icons/Funnel.svg';
import { ReactComponent as Arrow } from '../../assets/dashboard-icons/arrow-down.svg';
import { ReactComponent as Tick } from "../../assets/tick.svg";
import { FlightFilter } from "../../data/dropdown-options";
import {Link} from 'react-router-dom';
import CheckInModal from './flight/CheckInModal';
import CancelModal from './flight/CancelModal';
import RefundModal from './flight/RefundModal';
import RefundedModal from './flight/RefundedModal';

const Flight = () => {
    const [isActive, setIsActive] = useState('flight');
     const [ showOption, setShowOption ] = useState(false);
    const [filter, setFilter] = useState("All");
    const [tick, setTick] = useState(null);
    const [checkedIn, setCheckedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [openCancelModal, setOpenCancelModal] = useState(false);
    const onOpenCancelModal = () => setOpenCancelModal(true);
    const onCloseCancelModal = () => setOpenCancelModal(false);
    const[isCanceled, setIsCanceled] = useState(false)

    const [openRefundModal, setOpenRefundModal] = useState(false);
    const onOpenRefundModal = () => setOpenRefundModal(true);
    const onCloseRefundModal = () => setOpenRefundModal(false);

    const [openRefundedModal, setOpenRefundedModal] = useState(false);
    const onOpenRefundedModal = () => setOpenRefundedModal(true);
    const onCloseRefundedModal = () => setOpenRefundedModal(false);
    const[isRefunded, setIsRefunded] = useState(false);

    const onChecked = () => setCheckedIn(true);
    const onCanceled = () => setIsCanceled(true);
    const onClaimedRefund = () => setIsRefunded(true);

    const showTick = (a) => {
      console.log(a);
      FlightFilter.forEach((item, index) => {
        if(a === index ) {
          setTick(index)
        }
      });
    }
  return (
<>
    <Nav isActive={isActive} setIsActive={setIsActive} />
    <div className='flight'>
        <div className='flight-container'>

            <div className='flex items-center flight-container-navs'>

                <label className='search-table'>
                    <span className='mx-[4px]'><Search /></span>
                    <input type="search" placeholder='Search flights by ID' />
                </label>

            <button className="filter-table relative" onClick={() => setShowOption(!showOption)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Funnel className='mx-[8px]' />
                        <span className='filter-name'>
                            {filter} flights
                        </span>
                    </div>

                    <div>
                        <Arrow />
                    </div>
                </div>

            {
            showOption &&  
                <ul className="filter-dropdown absolute top-12 z-[9999] left-0 ">
                    {FlightFilter.map((i, index) => (
                        <li key={index} className={`${tick === index ? 'selected' : '' }`}>

                        <button
                        className='flex items-center'
                        onClick={() => {setFilter(i); showTick(index); }}>
                            <Tick className={`mr-2 ${tick === index ? 'visible' : 'invisible' }`} />
                            {i}
                        </button>
                        </li>
                    ))}
                </ul>
            }
            </button>

            <Link to='/book-flight' className="book-button">
                Book a flight
            </Link>

            </div>

            <div className="flex">
        <div className="flight-container_timeline"></div>

              { filter === 'All' ? <FlightsInfo checkedIn={checkedIn} onOpenModal={onOpenModal} onOpenCancelModal={onOpenCancelModal} isCanceled={isCanceled} onOpenRefundModal={onOpenRefundModal} isRefunded={isRefunded} filter={filter} />
              :
                filter === 'Ongoing' ? <OngoingFlight checkedIn={checkedIn} onOpenModal={onOpenModal} onOpenCancelModal={onOpenCancelModal} isCanceled={isCanceled} onOpenRefundModal={onOpenRefundModal} isRefunded={isRefunded}  /> : 'canceled'
            }
            </div>
        </div>
    </div>

<CheckInModal open={open} onCloseModal={onCloseModal} onChecked={onChecked} />

<CancelModal openCancelModal={openCancelModal} onCloseCancelModal={onCloseCancelModal} onCanceled={onCanceled} />

<RefundModal openRefundModal={openRefundModal} onCloseRefundModal={onCloseRefundModal} onOpenRefundedModal={onOpenRefundedModal}/>

<RefundedModal openRefundModal={openRefundedModal} onCloseRefundedModal={onCloseRefundedModal} onClaimedRefund={onClaimedRefund} />
</>
  )
}

export default Flight