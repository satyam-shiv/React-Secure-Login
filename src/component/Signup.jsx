import React, { useRef , useContext } from 'react';
import './Signup.css';
import email from '../Assets/email.png';
import person from '../Assets/person.png';
import phone from '../Assets/phone.png';
import { UserContext } from './UserContext';

const Signup = ({ setShowSignup, handleSignup }) => {
  const { setUser } = useContext(UserContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null); // Ref for gender selection
  const phoneRef = useRef(null); // Ref for phone number

  const checkInputs = () => {
     const nameValue = nameRef.current.value;
    // const emailValue = emailRef.current.value;
    // const genderValue = genderRef.current.value;
     const phoneValue = phoneRef.current.value;

    // Define target values for comparison
    // const targetValues = {
    //   name: 'Shivam Mishra',
    //   email: 'shivammishra@gmail.com', 
    //   gender: 'male',
    //   phone: '9999999999',
    // };
    const phoneNo = '9999999999';
    if (phoneNo === phoneValue) {
      alert('This phone number already exists.');
      return;
    }else{
      alert('Valid input');
      setUser({ name: nameValue });
      handleSignup(phoneValue);
    }
    
    // Check if input values match the target values
    // if (
    //   // nameValue === targetValues.name &&
    //   // emailValue === targetValues.email &&
    //   // genderValue === targetValues.gender
    //   jjj
    // ) {
    //   alert('Valid input');
    //   setUser({ name: nameValue });
    //   handleSignup(phoneValue); // Call handleSignup with the phone number
    // } else {
    //   alert('Invalid inputs. Please try again.'); 
    // }
  };

  return (
    <div className='mainP'>
      <div className="container">
        <div className="header">
          <div className="text">Signup</div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={person} alt="Person Icon" />
            <input type="text" name="name" placeholder="Name" ref={nameRef} />
          </div>
          <div className="input">
            <img src={email} alt="Email Icon" />
            <input type="email" name="email" placeholder="Email" ref={emailRef} />
          </div>
          <div className="input">
            <img src={person} alt="Gender Icon" />
            <select name="gender" ref={genderRef}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input">
            <img src={phone} className='phoneImage' alt="Phone Icon" />
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
