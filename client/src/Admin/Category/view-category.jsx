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

// const TableCell = (TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const TableRow = (TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

export default function CustomizedTables() {
  useRoleRedirect('Admin');
  const [getCategory,SetgetCategory]=useState([])
  const [SingleCategory,SetSingleCategory]=useState([])
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true)
    const SingleData=getCategory.filter((value)=>value._id==id)
    SetSingleCategory(...SingleData)
  };
  const handleClose = () => setOpen(false);
  
  
  useEffect(()=>{
    axios.get("http://localhost:5000/api/admin/view-category")
    .then((res)=>{
      SetgetCategory(res.data)
      setCount(!count)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[count])

  const HandleUpdateChange=(e)=>{
    SetSingleCategory({...SingleCategory,[e.target.name]:e.target.value})
  }
  const HandleImage=(e)=>{
    SetSingleCategory({...SingleCategory,[e.target.name]:e.target.files[0]})
  }
  console.log(SingleCategory)
  const HandleUpdate=()=>{
    const Data=new FormData();
    Data.append('category_name',SingleCategory.category_name);
    Data.append('category_image',SingleCategory.category_image);
    axios.put(`http://localhost:5000/api/admin/update-category/${SingleCategory._id}`,Data)
    .then((res)=>{
      console.log(res.data)
      setOpen(false)
      setCount(!count)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
const HandleDelete=(id)=>{
  axios.delete(`http://localhost:5000/api/admin/delete-category/${id}`)
  .then((res)=>{
    console.log(res.data)
    setCount(!count)
  })
  .catch((err)=>{
    console.log(err)
  })
}
const tableCellStyle = { color: '#fffdfd' };
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700, }} aria-label="customized table">
        <TableHead sx={{backgroundColor:'#181824'}}>
          <TableRow>
            <TableCell sx={tableCellStyle}  align="center">Category Image</TableCell>
            <TableCell sx={tableCellStyle} align="center">Category Name</TableCell>
            <TableCell sx={tableCellStyle} align="center">Date</TableCell>
            <TableCell sx={tableCellStyle} align="center">Action</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          <>
          {getCategory?.map((row) => {
            const formatedDate=moment(row.Date).format("MMM Do YYYY"); 
            return(
           
             <TableRow key={row._id}>
               <TableCell align="center">
                 <img src={`http://localhost:5000/api/category/${row.category_image}`} alt="" style={{width: '100%',
    height: '100px',
    objectFit: 'contain'}} />
               </TableCell>
               <TableCell align="center">
                 {row.category_name}
               </TableCell>
               <TableCell align="center">{formatedDate} </TableCell>
               <TableCell align="center">
                 <IconButton onClick={()=>handleOpen(row._id)}><BorderColorIcon/></IconButton>
                 <IconButton onClick={()=>HandleDelete(row._id)}><DeleteIcon/></IconButton>
               </TableCell>
              
             </TableRow>
            
            )
          })}
 {getCategory.length == 0 &&  <TableRow>
          
          <TableCell colspan={7} ><div ><Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}} >No Data</Alert></div></TableCell>
        </TableRow>}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Update Category
    </Typography>
    <Box>
    <TextField name="category_image" type='file' onChange={HandleImage} InputLabelProps={{shrink:true}} variant='outlined' style={{width:"100%"}} label="Upload Category Image"/>

    </Box>
    <Box>
    <TextField style={{width:'100%'}} name='category_name' onChange={HandleUpdateChange} value={SingleCategory.category_name} variant="outlined" label="Category Name"/>

    </Box>
    <Button onClick={HandleUpdate} variant="outlined" color="success">Update</Button>
  </Box>
</Modal>
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
