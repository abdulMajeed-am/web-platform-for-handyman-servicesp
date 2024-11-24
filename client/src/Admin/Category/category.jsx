import { Box, Card, TextField,Button, Typography } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewCategory from './view-category'
import useRoleRedirect from '../Redirect'
export default function Category() {
  useRoleRedirect('Admin');
  const [category,setCategory]=useState({category_name:''})
  const [categoryImage,setCategoryImage]=useState({})
  const [errors, setErrors] = useState({ category_image: '', category_name: '' });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    if (!categoryImage.category_image) {
      newErrors.category_image = 'Category Image is required';
      isValid = false;
    }

    // Validate password
    if (!category.category_name) {
      newErrors.category_name = 'Category Name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const HandleChange=(e)=>{
    setCategory({...category,[e.target.name]:e.target.value})
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
  }
  const HandleImage=(e)=>{
    setCategoryImage({...categoryImage,[e.target.name]:e.target.files[0]})
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
  }
console.log(categoryImage)
  const validateInputs = () => {
    for (const key in category) {
      if (!category[key]) {
      
        toast.error(`Please enter ${key.replace('_', ' ')}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return false; // Return false if any input field is empty
      }
    }
    return true; // Return true if all input fields are filled
  };
  const HandleSubmit=()=>{
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    const Data=new FormData();
    Data.append('category_name',category.category_name);
    Data.append('category_image',categoryImage.category_image);
    axios.post('http://localhost:5000/api/admin/insert-category',Data)
    .then((res)=>{
     if(res.data.success==false){
      toast.error(res.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
     }
      
    })
    .catch((err)=>{
      console.log(err)
    })

}
  return (
    <div >
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
<Typography variant="h6" sx={{ fontWeight: 900 }}>
  Add Category
</Typography>
<Card style={{padding:'20px',width:'50%'}}>
    <Box style={{display:'flex',flexDirection:'column',gap:'15px'}}>
    
   <Box >
    <TextField name="category_image" error={!!errors.category_image} // Convert to boolean
        helperText={errors.category_image} type='file' size="small" onChange={HandleImage} InputLabelProps={{shrink:true}} variant='outlined'   inputProps={{
          sx: {
            padding: '10px'
          }
        }} style={{width:"100%"}} label="Upload Category Image"/>
   </Box>
   <Box >
    <TextField name="category_name" error={!!errors.category_name} // Convert to boolean
        helperText={errors.category_name}onChange={HandleChange}  size="small" variant='outlined' style={{width:"100%"}} label="Enter Category Name"/>
   </Box>
   <Box>
    <Button onClick={HandleSubmit} variant="outlined" style={{width:'25%'}} color="success">Submit</Button>
   </Box>
    </Box>
</Card>
<div style={{marginTop:'20px'}}>
<Typography variant="h6" sx={{ fontWeight: 900 }}>
  View Category
</Typography>
 
<ViewCategory/>
</div>
    </div>
  )
}
