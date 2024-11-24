import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// T

const defaultTheme = createTheme();

export default function SignInSide({count,setCount,setIsHeaderVisible}) {

   const navigate=useNavigate();
    const [login,setLogin]=useState({})
    const [errors, setErrors] = useState({ email: '', password: '' });
    const validateForm = () => {
      const newErrors = {};
      let isValid = true;
  
      // Validate email
      if (!login.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      }
  
      // Validate password
      if (!login.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };


const HandleChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
}

    const handleSubmit = () => {
      if (!validateForm()) {
        return; // Stop submission if form is invalid
      }
      axios.post('http://localhost:5000/api/admin/login',login)
      .then((res)=>{
          console.log(res.data)
          if(res.data.success==true){
              toast.success('Login Successfull', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  
                  });
                  setCount(!count)
                  setIsHeaderVisible(true)
                  localStorage.setItem('Admin',JSON.stringify(res.data.token))
                  localStorage.setItem('role',JSON.stringify('Admin'))
          
                  navigate('/dash')
          
          }
          if(res.data.success==false){
              toast.error(res.data.massege, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  
                  });
                
                      navigate('/login')
                
          }
      })
      .catch((err)=>{
          console.log(err)
      })
    };


  return (
    <ThemeProvider theme={defaultTheme}>
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
{/* Same as */}
<ToastContainer />
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
              Sign in
            </Typography>
            <Box  noValidate  sx={{ mt: 1 }}>
            
            
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={HandleChange}
                error={!!errors.email} // Convert to boolean
        helperText={errors.email} // Display error message if exists
              />
             
             
             
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={HandleChange}
                autoComplete="current-password"
                 error={!!errors.password} // Convert to boolean
        helperText={errors.password} // Display error message if exists
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                {/* <Link href="/register" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}