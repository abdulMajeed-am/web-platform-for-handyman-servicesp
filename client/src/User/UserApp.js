import { lazy, Suspense, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home"));
const AllWorker = lazy(() => import("./pages/AllWorker"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const WorkerDetails = lazy(() => import("./pages/WorkerDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Worker = lazy(() => import("./pages/Worker"));
const BookingStatus = lazy(() => import("./pages/BookingStatus"));

function App() {
  const location =useLocation()
  const hideNavBar = location.pathname === "/userregister" || location.pathname === "/userlogin";
  const [role,setRole]=useState();
  const [count,setCount]=useState(false)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('role2'))
    setRole(user);
  },[count])
  return (
    <Suspense fallback={<Loader />}>
      
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
         {!hideNavBar && <NavBar count={count} setCount={setCount} role={role} />}   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worker" element={<AllWorker role={role}/>} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/servicedetails/:id" element={<ServiceDetails />} />
          <Route path="/workerdetails/:id" element={<WorkerDetails />} />
          <Route path="/bookingstatus" element={<BookingStatus />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userlogin" element={<Login count={count} setCount={setCount  }/>} />
          <Route path="/userregister" element={<Register />} />
          <Route path="/worker/:id" element={<Worker role={role}/>} />
        </Routes>
        {!hideNavBar && <Footer /> }
      
    </Suspense>
  );
}

export default App;
