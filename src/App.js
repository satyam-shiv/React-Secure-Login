import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import OTP from './component/OTP';
import Dashboard from './component/Dashboard';
import { UserProvider } from './component/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<OTP/>}/>
        <Route path="/dashboard"  element={<Dashboard/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
