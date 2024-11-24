import './App.css';
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserApp from '../src/User/UserApp'
import Header from './Admin/Header/Sidebar/Sidebar';
import Dashboard from './Admin/Dashboard/dashboard';
import Dashboard1 from './Worker/Dashboard/dashboard'
import Category from './Admin/Category/category';
import WorkerRegister from './Worker/Auth/register';
import WorkerLogin from './Worker/Auth/login'
import Service from './Worker/Service/service'
import UpdateSerivce from './Worker/Service/update_service'
import User from './Admin/User/view-user'
import Worker from './Admin/Worker/view-worker'
import Booking from './Worker/Booking/booking'
import BookingDetails from './Worker/Booking/booking-details'
import Payment from './Worker/Payment/view-payment'
import ViewPayment from './Admin/Payment/view-payment'
import AdminLogin from './Admin/Auth/login'
import ViewComment from './Admin/Comment/view-comment'
import ViewWorkerComment from './Worker/Comment/view-comment'
import { useState,useEffect } from 'react';


const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function OtherUser() {



  const [role,setRole]=useState('');
  const [count,setCount]=useState(true)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); 
  useEffect(()=>{
   if(JSON.parse(localStorage.getItem('role'))){
    setRole('Admin');

}else if(JSON.parse(localStorage.getItem('role1'))){

  setRole("Worker");

   }
   
  },[count])

  
  console.log(role,'role')
  console.log(count,'count')
  return (
    <Box style={{ display: 'flex',minHeight: '100vh', backgroundColor: '#f0f1f6'}}>
      {/* <Router> */}
      {isHeaderVisible && (role === 'Admin' || role === 'Worker') && <Header count={count} setCount={setCount} setIsHeaderVisible={setIsHeaderVisible} />}
       
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ p: 3, width: '100%' }}>
          {isHeaderVisible && (role === 'Admin' || role === 'Worker') && <DrawerHeader  />}
            <Routes>
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard1 />} />
              <Route path="/category" element={<Category />} />
              <Route path="/register" element={<WorkerRegister />} />
              <Route path="/login" element={<WorkerLogin count={count} setCount={setCount} setIsHeaderVisible={setIsHeaderVisible}/> } />
              <Route path="/admin-login" element={<AdminLogin count={count} setCount={setCount} setIsHeaderVisible={setIsHeaderVisible}/>} />
              <Route path="/service" element={<Service />} />
              <Route path="/user" element={<User />} />
              <Route path="/workers" element={<Worker />} />
              <Route path="/view-comment" element={<ViewComment />} />
              <Route path="/view-worker-comment" element={<ViewWorkerComment />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/viewpayment" element={<ViewPayment />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking-details/:id" element={<BookingDetails />} />
              <Route path="/updateserivce/:id" element={<UpdateSerivce />} />
              {/* <Route path="/*" element={<Box sx={{ backgroundColor: 'white' }}><UserApp /></Box>} /> */}
            </Routes>
          </Box>
        </Box>
      {/* </Router> */}
    </Box>
  );
}

export default OtherUser;
