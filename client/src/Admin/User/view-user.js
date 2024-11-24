import  React,{useState,useEffect} from 'react';
import {  } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, IconButton,TextField } from '@mui/material';
import moment from 'moment'
import useRoleRedirect from '../Redirect'



export default function CustomizedTables() {
  useRoleRedirect('Admin');
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

  
  
  

  const tableCellStyle = { color: '#fffdfd' };

  return (
  <>
    <Typography variant="h6" sx={{ fontWeight: 900,marginBottom:'10px'}}>
  View User
</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{backgroundColor:'#181824'}}>
          <TableRow>
            <TableCell sx={tableCellStyle}  align="center">Customer Name</TableCell>
            <TableCell sx={tableCellStyle} align="center">Category Email</TableCell>
            <TableCell sx={tableCellStyle} align="center">Customer Phone</TableCell>
            <TableCell sx={tableCellStyle} align="center">Customer Address</TableCell>
            <TableCell sx={tableCellStyle} align="center">Registered Date</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          <>
          {User?.map((row) => {
            const formatedDate=moment(row.Date).format("MMM Do YYYY"); 
            return(
           
             <TableRow key={row._id}>
              
               <TableCell align="center">
                 {row.name}
               </TableCell>
               <TableCell align="center">
                 {row.email}
               </TableCell>
               <TableCell align="center">
                 {row.phone}
               </TableCell>
               <TableCell align="center">
                 {row.address}
               </TableCell>
               <TableCell align="center">{formatedDate} </TableCell>
              
              
             </TableRow>
            
            )
          })}
 {User.length == 0 &&  <TableRow>
          
          <TableCell colspan={7} ><div ><Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}} >No Data</Alert></div></TableCell>
        </TableRow>}

          </>
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
