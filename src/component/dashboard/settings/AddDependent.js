import React, {useState} from 'react';
import { ReactComponent as Calendar } from '../../../assets/dashboard-icons/Vector.svg';
import { ReactComponent as ArrowDown } from '../../../assets/dashboard-icons/arrow-down.svg';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddDependent = () => {
    const [nation, setNation] = useState("Nigeria");
   const [dob, setDob] = useState(null)
    const selectCountry = (val) => {
        setNation(val);
    }
  return (
    <>
        <div className='dotted-line'></div>

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
                  <div className='flex sm:flex-row flex-col'>
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

            

    </>
  )
}

export default AddDependent