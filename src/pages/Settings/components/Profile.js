import React, {useState} from 'react';
import { ReactComponent as Calendar } from '../../../assets/dashboard-icons/Vector.svg';
import { ReactComponent as User } from '../../../assets/dashboard-icons/user.svg';
import { ReactComponent as ArrowDown } from '../../../assets/dashboard-icons/arrow-down.svg';
import { ReactComponent as Info } from '../../../assets/dashboard-icons/Icon_Info.svg';
import { ReactComponent as Lock } from '../../../assets/icons/lock.svg';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddDependent from './AddDependent';
import { ReactComponent as Trash } from '../../../assets/dashboard-icons/trash.svg';

const Profile = () => {
   const [nation, setNation] = useState("Nigeria");
   const [showDependent, setShowDependent] = useState(false);
   const [dob, setDob] = useState(null)
    const selectCountry = (val) => {
        setNation(val);
    }

  const handlesubmit = (e) => {
        e.preventDefault();
    }
  return (
     <div className='account-container'>

        <div className={`account-container_form ${showDependent ? 'form-2' : ''} `}>
            <p className='title'>Edit profile</p>
            <p className='subtitle'>Complete your profile below, you can add your frequent travel partners / dependents too for faster checkouts on future bookings.</p>
            <div className='form-line'></div>

            <div className='account-info flex items-center'>
                <Info />
                <p>To avoid boarding complications, use all given names and last names <b> exactly as they appear in your passport or ID.</b></p>
            </div>

            <form onSubmit={handlesubmit} className='account-form'>
                <div className='acct-form-2'>
                    <div className='account-form_inputs input_2'>
                        <p className='account-form_inputs-title'>
                            First Name
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                           <input type="text" placeholder='Derek' className='acct-input' />
                        </div>
                    </div>

                    <div className='account-form_inputs'>
                        <p className='account-form_inputs-title'>
                            Last Name
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                           <input type="text" placeholder='Hale' className='acct-input' />
                        </div>
                    </div>
                </div>


                <div className='acct-form-2'>
                  <div className=' flex sm:flex-row flex-col'>
                     <div className='account-form_inputs input_2'>
                        <p className='account-form_inputs-title'>
                            Nationality
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                                <CountryDropdown
                                value={nation} 
                                onChange={(val) => selectCountry(val)}
                                priorityOptions={["NG", "US", "GB"]} 
                                className='w-full acct-input' />
                        </div>
                    </div>

                    <div className='account-form_inputs input_2'>
                        <p className='account-form_inputs-title'>
                           Gender
                        </p>
                        <div className='account-form_inputs-dropdown flex items-center justify-between'>
                             <button id="dropdownButton3" data-dropdown-toggle="dropdown3" className=" w-full px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">
                                — Select —  
                            <ArrowDown />
                            </button>
                            <div id="dropdown3" className="hidden z-10 w-48 list-none bg-white rounded divide-y divide-gray-100 shadow">
                                <ul className="py-1" aria-labelledby="dropdownButton3">
                                    <li>
                                        <button className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]">Female</button>
                                    </li>
                                    <li>
                                        <button className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]">Male</button>
                                    </li>
                                    <li>
                                        <button className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]">Prefer to not say</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  </div>

                    <div className='account-form_inputs'>
                        <p className='account-form_inputs-title'>
                            Date of birth
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                            <Calendar />
                                <DatePicker
                                    selected={dob}
                                    onChange={(date) => setDob(date)}
                                    selectsStart
                                     dateFormat="MMMM / dd / yyyy"
                                    placeholderText="Month / DD / YYYY"
                                    className='acct-input'
                                />
                        </div>
                    </div>
                </div>

                {
                    showDependent ? <AddDependent /> : ''
                }

                {
                    showDependent ? 
                    <div className='flex items-center flex-wrap'>
                        <button className='flex items-center addUser-btn'
                        onClick={() => setShowDependent(true)}>
                            <User />
                            <p className='span'>Add another dependent</p>
                        </button>

                        <button className='flex items-center removeUser-btn'
                        onClick={() => setShowDependent(false)}>
                            <p className='span'>Remove dependent</p>
                        </button>
                    </div> 
                    :
                    <button className='flex items-center addUser-btn'
                    onClick={() => setShowDependent(true)}>
                        <User />
                        <p className='span'>Add dependent</p>
                    </button>
                }


                <div className='flex items-start lg:items-center lg:flex-row flex-col-reverse justify-between'>
                    <p className='subtitle flex items-center text-[#8895A7]'>
                        <Lock className='mr-[10px]'/>
                        Your personal data is secured and will never be sold to any third party
                    </p>

                    <button className="account-button flex items-center justify-center  lg:mb-0 mb-[20px]">Update profile</button>
                </div>

            </form>
        </div>


        {
            showDependent ? 
            <div className='accountss'>
                <p className='title'>My Dependents</p>
                <div className='accountss-item'>
                    <div className='accountss-item_two flex items-center justify-between'>
                        <p>Jane Doe</p>
                        <button className='accountss-item_remove'>
                            <Trash />
                        </button>
                    </div>

                    <div className='accountss-item_two flex items-center justify-between'>
                        <p>Jessica Simpson</p>
                        <button className='accountss-item_remove'>
                            <Trash />
                        </button>
                    </div>

                    <div className='accountss-item_two flex items-center justify-between'>
                        <p>Scott Parker</p>
                        <button className='accountss-item_remove'>
                            <Trash />
                        </button>
                    </div>

                    <div className='accountss-item_two flex items-center justify-between'>
                        <p>Helen Hale</p>
                        <button className='accountss-item_remove'>
                            <Trash />
                        </button>
                    </div>
                    
                </div>
            </div> : ''
        }
       

    </div>
  )
}

export default Profile