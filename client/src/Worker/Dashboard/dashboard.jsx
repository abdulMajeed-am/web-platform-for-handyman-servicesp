import React,{useState,useEffect} from 'react'
import './dashboard.css'
import axios from 'axios'
import Serv from '../../assets/Images/serv.svg'
import Service from '../../assets/Images/service.svg'
import Booking from '../../assets/Images/booking.svg'
import Book from '../../assets/Images/book.svg'
import FeedBack from '../../assets/Images/feedback.svg'
import Feed from '../../assets/Images/feed.svg'
import { Link } from 'react-router-dom'
import useRoleRedirect from '../Redirect'

import moment from 'moment'

export default function Dashboard() {
 
    
  useRoleRedirect('Worker');
  
  const [service,Setservice]=useState([])
  const [workerDate,setWorkerDate]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/admin/AllWorkerDate")
    .then((res)=>{
      setWorkerDate(res.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('Worker'))

    axios.get("http://localhost:5000/api/worker/view-all-service",{headers:{'auth-token':token}})
    .then((res)=>{
      Setservice(res.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const [booking,setbooking]=useState([])

  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('Worker'))
    axios.get('http://localhost:5000/api/worker/booking-date',{headers:{'auth-token':token}})
    .then((res)=>{
      setbooking(res.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
console.log(booking,'booking')
  const [Feedback, SetFeedback] = useState([]);

  useEffect(() => {
    const token=JSON.parse(localStorage.getItem('Worker'))

    axios
    .get(`http://localhost:5000/api/worker/get-review`,{headers:{'auth-token':token}})
      .then((res) => {
          SetFeedback(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <main class="py-6 bg-surface-secondary">
            <div class="container-fluid">
               
                <div class="row g-6 mb-6">
                    <div class="col-xl-4 col-sm-6 col-12">
                        <div class="card shadow border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Service</span>
                                        <span class="h3 font-bold mb-0">{service.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                            <img src={Service} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm" >
                                    <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Serv} alt="" />
                                       <div>Service Added</div>
                                    </span>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-sm-6 col-12">
                        <div class="card shadow border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Booking</span>
                                        <span class="h3 font-bold mb-0">{booking.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                        <img src={Booking} alt="" />

                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Book} alt="" />
                                       <div>Service Booked by booking</div>
                                    </span>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-sm-6 col-12">
                        <div class="card shadow border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">FeedBack</span>
                                        <span class="h3 font-bold mb-0">{Feedback.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                                        <img src={FeedBack} alt="" />

                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Feed} alt="" />
                                       <div>Registered Workers</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
              
            </div>
        </main>
        <main class="py-6 bg-surface-secondary">
            <div class="container-fluid">
              
                <div class="card shadow border-0 mb-7">
                    <div class="card-header">
                    <h5 class="mb-0">Newly Service Booked</h5>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-nowrap">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Service Name</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Booking Date</th>
                                    
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              {booking.map((data)=>(
 <tr>
 <td>
     
     <a class="text-heading font-semibold" href="#">
         {data?.service_id?.service_name}
     </a>
 </td>
 <td>
 {data.name}
 </td>
 <td>
 {data.email}
 </td>
 <td>
   
     <a class="text-heading font-semibold" href="#">
     {data.phone}
     </a>
 </td>
 <td>
 {moment(data.Date).format("MM/DD/YYYY")}
 </td>

 <td class="text-end">
     <Link to="/booking" class="btn btn-sm btn-neutral">View</Link>
     
 </td>
</tr>
                              ))}
                               
                               
                              
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer border-0 py-5">
                        {/* <span class="text-muted text-sm">Showing 10 items out of 250 results found</span> */}
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
