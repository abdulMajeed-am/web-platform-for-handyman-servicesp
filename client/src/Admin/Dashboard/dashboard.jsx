import React,{useState,useEffect} from 'react'
import './dashboard.css'
import axios from 'axios'
import Cat1 from '../../assets/Images/cat1.svg'
import Category from '../../assets/Images/category.svg'
import Usericon from '../../assets/Images/user.svg'
import Usersicon from '../../assets/Images/users.svg'
import Workericon from '../../assets/Images/worker.svg'
import Work from '../../assets/Images/work.svg'
import { Link } from 'react-router-dom'
import useRoleRedirect from '../Redirect'

export default function Dashboard() {
 
    
  useRoleRedirect('Admin');
  const [getCategory,SetgetCategory]=useState([])
  const [workerDate,setWorkerDate]=useState([])
  console.log(workerDate,'workerDate')
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
    axios.get("http://localhost:5000/api/admin/view-category")
    .then((res)=>{
      SetgetCategory(res.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const [User,setUser]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/user/UserDetails")
    .then((res)=>{
      setUser(res.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const [Worker, SetWorker] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/AllWorker")
      .then((res) => {
          SetWorker(res.data);
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
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Category</span>
                                        <span class="h3 font-bold mb-0">{getCategory.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                            <img src={Category} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm" >
                                    <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Cat1} alt="" />
                                       <div>Category Added</div>
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
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Users</span>
                                        <span class="h3 font-bold mb-0">{User.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                        <img src={Usersicon} alt="" />

                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Usericon} alt="" />
                                       <div>Registered User</div>
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
                                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Workers</span>
                                        <span class="h3 font-bold mb-0">{Worker.length}</span>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                                        <img src={Workericon} alt="" />

                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 mb-0 text-sm">
                                <span class="badge badge-pill bg-soft-success text-success me-2" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                                       <img src={Work} alt="" />
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
                    <h5 class="mb-0">Newly Registered Worker</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-nowrap">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              {workerDate.map((data)=>(
 <tr>
 <td>
     
     <a class="text-heading font-semibold" href="#">
         {data.name}
     </a>
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
 {data.address}
 </td>

 <td class="text-end">
     <Link to="/workers" class="btn btn-sm btn-neutral">View</Link>
     
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
