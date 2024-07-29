import React, { useRef, useContext } from 'react';
import './Signup.css';
import emailIcon from '../Assets/email.png';
import personIcon from '../Assets/person.png';
import phoneIcon from '../Assets/phone.png';
import { UserContext } from './UserContext';
import { db } from './../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Signup = ({ setShowSignup, handleSignup }) => {
  const { setUser } = useContext(UserContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const phoneRef = useRef(null);

  const generateOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    console.log("Generated OTP: ", randomOtp); // You can remove this line in production
    return randomOtp;
  };

  const checkInputs = async () => { // Make this function async
    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const genderValue = genderRef.current.value;
    const phoneValue = phoneRef.current.value;

    const phoneNo = '9999999999';
    if (phoneNo === phoneValue) {
      alert('This phone number already exists.');
      return;
    } else {
      const otp = generateOtp();
      //alert('Valid input. Your OTP is: ' + otp);
      setUser({ name: nameValue, email: emailValue, gender: genderValue, number: phoneValue });

      // Store user data in Firestore
      try {
        const docRef = await addDoc(collection(db, 'signupPage'), {
          name: nameValue,
          email: emailValue,
          gender: genderValue,
          phone: phoneValue,
          OTP:otp
        });
        console.log('USER CREATED IN FIRESTORE -->', docRef.id);
      } catch (error) {
        console.error('Error adding document to Firestore: ', error);
      }

      handleSignup(phoneValue);
    }
  };

  return (
    <div className='mainP'>
      <div className="container">
        <div className="header">
          <div className="text">Signup</div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={personIcon} alt="Person Icon" />
            <input type="text" name="name" placeholder="Name" ref={nameRef} />
          </div>
          <div className="input">
            <img src={emailIcon} alt="Email Icon" />
            <input type="email" name="email" placeholder="Email" ref={emailRef} />
          </div>
          <div className="input">
            <img src={personIcon} alt="Gender Icon" />
            <select name="gender" ref={genderRef}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input">
            <img src={phoneIcon} className='phoneImage' alt="Phone Icon" />
            <input
              type="text"
              placeholder="Enter phone number"
              maxLength="10"
              ref={phoneRef}
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit">
            <button onClick={checkInputs}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
