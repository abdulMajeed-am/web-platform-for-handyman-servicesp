import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate ,Link} from 'react-router-dom';
  
const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate=useNavigate();
 const [userRegister,setUserRegister]=useState({})

 const HandleChange=(e)=>{
    setUserRegister({...userRegister,[e.target.name]:e.target.value});
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
 }

 
const [errors, setErrors] = useState({ name:'',email: '',phone:'',address:'', password: '' });
const validateForm = () => {
  const newErrors = {};
  let isValid = true;

  // Validate email
  if (!userRegister.name) {
    newErrors.name = 'Name is required';
    isValid = false;
  }
  if (!userRegister.phone) {
    newErrors.phone = 'Phone Number is required';
    isValid = false;
  }
  if (!userRegister.email) {
    newErrors.email = 'Email is required';
    isValid = false;
  }
  if (!userRegister.address) {
    newErrors.address = 'Address is required';
    isValid = false;
  }
 

  // Validate password
  if (!userRegister.password) {
    newErrors.password = 'Password is required';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

const HandleClick=()=>{
  if (!validateForm()) {
    return; // Stop submission if form is invalid
  }
    axios.post("http://localhost:5000/api/user/register",userRegister)
    .then((res)=>{
        console.log(res.data)
        if(res.data.success=true){
            toast.success('Register Successfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                });
               setTimeout(()=>{
                navigate('/userlogin')
               },2000)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
   <>
     <ToastContainer
position="top-right"
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
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             User Sign-Up
            </Typography>
            <Box  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={HandleChange}
                error={!!errors.name} // Convert to boolean
                helperText={errors.name}
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={HandleChange}
                id="email"
                label="Email Address"
                error={!!errors.email} // Convert to boolean
                helperText={errors.email}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={HandleChange}
                error={!!errors.phone} // Convert to boolean
                helperText={errors.phone}
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={HandleChange}
                error={!!errors.address} // Convert to boolean
                helperText={errors.address}
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={HandleChange}
                name="password"
                label="Password"
                type="password"
                error={!!errors.password} // Convert to boolean
                helperText={errors.password}
                id="password"
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                onClick={HandleClick}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container sx={{display:'flex',justifyContent:'space-between'}}>
              
                <Grid item>
                  <Link to={"/userlogin"} variant="body2">
                    {"Already a user? Sign In"}
                  </Link>
                </Grid>
                <Grid item>
                <Link to={"/login"} variant="body2">
                    {"Sign up as Worker"}
                  </Link>
                </Grid>
              </Grid>
              
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
   </>
  );
}