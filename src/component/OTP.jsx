import React, { useState, useContext, useEffect } from 'react';
import './OTP.css';
import { useNavigate } from 'react-router-dom';
import { db } from './../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { UserContext } from './UserContext';

const OTP = ({ phoneNumber }) => {
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const q = query(collection(db, 'signupPage'), where('phone', '==', phoneNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFetchedUserData(userData);
      } else {
        setErrorMessage('No user data found for the provided phone number.');
      }
    };

    fetchUserData();
  }, [phoneNumber]);

  const handleOtpInputChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value) || value.length > 4) {
      setOtpValue(value.replace(/\D/g, '').slice(0, 4));
    } else {
      setOtpValue(value);
    }
  };

  const handleOtp = async () => {
    if (!otpValue) {
      setErrorMessage('OTP is invalid');
      return;
    }

    if (fetchedUserData && otpValue === String(fetchedUserData.OTP)) {
      alert('OTP is correct');

      try {
        const docRef = await addDoc(collection(db, 'users'), {
          name: fetchedUserData.name,
          email: fetchedUserData.email,
          gender: fetchedUserData.gender,
          phone: phoneNumber
        });
        console.log('USER COPIED TO USERS COLLECTION -->', docRef.id);

        setUser({
          name: fetchedUserData.name,
          email: fetchedUserData.email,
          gender: fetchedUserData.gender,
          number: phoneNumber,
        });

        navigate('/dashboard');
      } catch (error) {
        console.error('Error adding document to users collection: ', error);
        setErrorMessage('Failed to copy user data. Please try again.');
      }
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
          aria-label="OTP Input"
        />
        {errorMessage && <div className="error-message" role="alert">{errorMessage}</div>}
        <button className='login-button' onClick={handleOtp}>Submit</button>
      </div>
    </div>
  );
}

export default OTP;
