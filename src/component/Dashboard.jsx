import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import p1 from '../Assets/p1.jpg';
import p2 from '../Assets/p2.jpg';
import p3 from '../Assets/p3.png';
import p4 from '../Assets/p4.jpg';
import p5 from '../Assets/p5.jpg';
import p6 from '../Assets/p6.jpg';
import p7 from '../Assets/p7.jpg';
import p8 from '../Assets/p8.jpg';
import p9 from '../Assets/p9.jpg';
import p10 from '../Assets/p10.png';
import './Dashboard.css';

const images = [p1, p2, p3, p4]; // Array of images

const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
   
    <div className="main-dashboard">
       
      <div className="dashboard">
      <Navbar />
        <div className="banner">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="banner-image" />
        </div>

         <div className="icons">
         <img src={p5} alt="p5" className="icon-image" />
         <img src={p6} alt="p6" className="icon-image" />
         <img src={p7} alt="p7" className="icon-image" />
         <img src={p8} alt="p8" className="icon-image" />
         <img src={p9} alt="p9" className="icon-image" />
         <img src={p10} alt="p10" className="icon-image" />
         </div>
         


      </div>
    </div>
  );
}

export default Dashboard;
