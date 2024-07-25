import React, { useState , useContext} from 'react';
import './Home.css';
import Signup from './Signup';
import OTP from './OTP'; // Yha pr hmm apne signup ko aur otp wale page import kr rhe hai
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
  //ye hm yha isliye kr rhe hai taki jb phone no. 9999999999 ho
  //to hm use state krke default koi name set kr ske

const Home = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);// ye use krkr hm setuser name kr denge
  const [phoneValue, setPhoneValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignup, setShowSignup] = useState(false); // State to manage signup form visibility
  const [showOtp, setShowOtp] = useState(false); // State to manage OTP form visibility
  const [otpPhoneNumber, setOtpPhoneNumber] = useState(''); // State to store phone number for OTP

  const handleInputChange = (e) => {
    const value = e.target.value;
    setErrorMessage('');

    if (!/^\d*$/.test(value) || value.length > 10) {
      setErrorMessage('Invalid input. Please enter only numeric values and limit to 10 characters.');
      setPhoneValue(value.replace(/\D/g, '').slice(0, 10));
    } else {
      setPhoneValue(value);
    }
  };

  const handleLogin = () => {
    if (phoneValue.length < 10) {
      setErrorMessage('Phone value is invalid');
      return;
    }
    if (!phoneValue) {
      setErrorMessage('Phone value is empty');
      return;
    }
    const storedPhoneNumber = '9999999999';
    
    if (phoneValue === storedPhoneNumber) {
      setOtpPhoneNumber(phoneValue); // Store the phone number
      setShowOtp(true); // Show the OTP component
      setUser({ name: 'Satyam mishra' });
    } else {
      setErrorMessage('User is not registered ! Signup yourself ');
    }
  };

  const handleSignup = (phone) => {
    setOtpPhoneNumber(phone); // Store the phone number
    setShowOtp(true); // Show the OTP component
  };

  return (
    <div className='main-Home'>
      {showOtp ? (
        <OTP phoneNumber={otpPhoneNumber} />
      ) : showSignup ? (
        <Signup setShowSignup={setShowSignup} handleSignup={handleSignup} /> // Render Signup component with handleSignup prop
      ) : (
        <div className="container1">
          <h2 className="title">Welcome</h2>
          <input
            type="text"
            value={phoneValue}
            placeholder="Enter phone number"
            className='phone-input'
            maxLength="10"
            onChange={handleInputChange}
            required
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="button-group">
            <button className='signup1-button' onClick={() => setShowSignup(true)}>Sign Up</button>
            <button className='submit1-button' onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
