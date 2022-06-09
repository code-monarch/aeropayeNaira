import React, { useState } from 'react';
// import CurrencyFlag from 'react-currency-flags';

const Currency = () => {
  const [currency] = useState('');

  const handlesubmit = (e) => {
      e.preventDefault();
  }
  return (
    <div className='security'>
      <div className='security-container currency-container'>
        <p className='title'>Select currency</p>
        <p className='subtitle'>Select your local currency for withdrawals and other transactions.</p>
        <div className='form-line'></div>

        <form onSubmit={handlesubmit} className='security-password_form'>
            <div className='mb-[20px]'>
                    <div className='security-password_form_inputs'>
                        <p className='security-password_form_inputs-title'>
                            Local currency
                        </p>
                        <div className='flex items-center'>
                          {/* <CurrencyFlag currency={currency} width={38} /> */}
                        </div>
                        
                    </div>
            </div>
            <button type="submit" className='currency-button'>Save</button>
          </form>
       
      </div>
    </div>
  )
}

export default Currency