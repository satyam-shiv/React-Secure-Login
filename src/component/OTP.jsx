import React, { useState } from 'react';
import './OTP.css';
import { useNavigate } from 'react-router-dom';

const OTP = ({ phoneNumber }) => {
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleOtpInputChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value) || value.length > 4) {
      setOtpValue(value.replace(/\D/g, '').slice(0, 4));
    } else {
      setOtpValue(value);
    }
  };

  const handleOtp = () => {
    if (!otpValue) {
      setErrorMessage('OTP is invalid');
      return;
    }
    const storedOtpNumber = '9999';

    if (otpValue === storedOtpNumber) {
      alert('OTP is correct');
      navigate('/dashboard');
    } else {
      setErrorMessage('OTP is incorrect');
    }
  };

  return (
    <div className='main-otp'>
      <div className="box">
        <input 
          type="text" 
          placeholder={phoneNumber}
          className='phone-input'
          readOnly
        />
        <input
          type="text"
          value={otpValue}
          placeholder='Enter OTP...'
          className='otp-input'
          maxLength="4"
          onChange={handleOtpInputChange}
          required
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className='login-button' onClick={handleOtp}>Submit</button>
      </div>
    </div>
  );
}

export default OTP;
