import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { ReactComponent as ArrowDown } from '../../../assets/dashboard-icons/arrow-down.svg';
import { ReactComponent as Trash } from '../../../assets/dashboard-icons/trash.svg';

const Account = () => {
    const [selected, setSelected] = useState('NG');

    const handlesubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className='account-container'>

        <div className='account-container_form'>
            <p className='title'>Add new bank account</p>
            <p className='subtitle'>Please make sure the name registered on the bank account matches the one registered on your Aeropaye account.</p>
            <div className='form-line'></div>

            <form onSubmit={handlesubmit} className='account-form'>
                <div className='acct-form'>
                    <div className='account-form_inputs input_1'>
                        <p className='account-form_inputs-title'>
                            Bank Account Resident Country 
                        </p>
                        <div className=''>
                            <ReactFlagsSelect
                            selected={selected}
                            onSelect={code => setSelected(code)}
                            className='h-[48px] w-full country-input'
                            searchable
                        />
                        </div>
                        
                    </div>

                    <div className='account-form_inputs'>
                        <p className='account-form_inputs-title'>
                            Name on account
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                           <input type="text" placeholder='John Doe' className='acct-input' />
                        </div>
                    </div>
                </div>

                <div className='acct-form'>
                    <div className='account-form_inputs input_1'>
                        <p className='account-form_inputs-title'>
                            Bank Name
                        </p>
                        <div className='account-form_inputs-dropdown flex items-center justify-between'>
                             <button id="dropdownButton" data-dropdown-toggle="dropdown" className="acct-dropdown w-full px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">
                                — Select —  
                            <ArrowDown />
                            </button>
                            <div id="dropdown" className="hidden z-10 w-48 list-none bg-white rounded divide-y divide-gray-100 shadow">
                                <ul className="py-1" aria-labelledby="dropdownButton">
                                    <li>
                                        <button className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]">Dashboard</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='account-form_inputs'>
                        <p className='account-form_inputs-title'>
                            Bank Account Number (IBAN)
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                           <input type="text" placeholder='XXXXXXXXXX' className='acct-input' />
                        </div>
                    </div>
                </div>


                <div className='acct-form'>
                    <div className='account-form_inputs input_1'>
                        <p className='account-form_inputs-title'>
                            Account Type
                        </p>
                        <div className='account-form_inputs-dropdown flex items-center justify-between'>
                             <button id="dropdownButton2" data-dropdown-toggle="dropdown2" className="acct-dropdown w-full px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">
                                — Select —  
                            <ArrowDown />
                            </button>
                            <div id="dropdown2" className="hidden z-10 w-48 list-none bg-white rounded divide-y divide-gray-100 shadow">
                                <ul className="py-1" aria-labelledby="dropdownButton2">
                                    <li>
                                        <button className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]">Dashboard</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='account-form_inputs'>
                        <p className='account-form_inputs-title'>
                            BIC / SWIFT Code
                        </p>
                        <div className='account-form_inputs-label flex items-center'>
                           <input type="text" placeholder='XXXXXXXX' className='acct-input' />
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-start md:justify-end'>
                   <button type='submit' className='account-button'>
                        Save bank account
                   </button>
                </div>

            </form>
        </div>

        <div className='accountss'>
            <p className='title'>My bank accounts</p>
            <div className='accountss-item'>
                <div className='accountss-item_one'>
                    <p>Account number: <span className='values'>0000000000</span></p>
                    <p>BIC / SWIFT Code: <span className='values'>FBNINGLA</span></p>
                    <p>Bank Name: <span className='values'>First Bank</span></p>
                </div>
                <button className='accountss-item_remove'>
                    <Trash className='mr-[12px]' /> Remove
                </button>
            </div>

            <div className='accountss-item'>
                <div className='accountss-item_one'>
                    <p>Account number: <span className='values'>0000000000</span></p>
                    <p>BIC / SWIFT Code: <span className='values'>FBNINGLA</span></p>
                    <p>Bank Name: <span className='values'>First Bank</span></p>
                </div>
                <button className='accountss-item_remove'>
                    <Trash className='mr-[12px]' /> Remove
                </button>
            </div>
        </div>

    </div>
  )
}

export default Account