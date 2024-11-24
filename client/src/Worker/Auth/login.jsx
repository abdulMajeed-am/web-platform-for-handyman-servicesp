import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import Modal from '@mui/material/Modal';

const styleM = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultTheme = createTheme();

export default function SignInSide({ count, setCount, setIsHeaderVisible }) {

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');

  const [login, setLogin] = useState({})
  const [emailEnter, setEmailEnter] = useState({})
  const [otpEnter, setOtpEnter] = useState({})
  const [passwordEnter, setPasswordEnter] = useState({})
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

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

  const HandleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }

  const HandleEmailChange = (e) => {
    setEmailEnter({ ...emailEnter, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }
  const HandleOtpChange = (e) => {
    setOtpEnter({ ...otpEnter, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }
  const HandleChangePassword = (e) => {
    setPasswordEnter({ ...passwordEnter, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }

  console.log(otpEnter, 'otpenter')

  const handleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    axios.post('http://localhost:5000/api/worker/login', login)
      .then((res) => {
        console.log(res.data)
        if (res.data.success == true) {
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
          navigate('/dashboard')


          localStorage.setItem('Worker', JSON.stringify(res.data.token))
          localStorage.setItem('role1', JSON.stringify('Worker'))
        }
        if (res.data.success == false) {
          if(res.data.user.status == 'pending'){
            setLoading2(true)
            setLoadingMessage("Wait for the confirmation.")
          }else if(res.data.user.status == 'Rejected'){
            setLoading2(true)
            setLoadingMessage("Your request has been rejected!")

          }else{

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
        }

        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleEmailSubmit = () => {
    setLoading(true)
    axios.post('http://localhost:5000/api/worker/emailEnter', emailEnter)
      .then((res) => {
        console.log(res.data)
        if (res.data.success == true) {

          setOpen(false);
          setOpen2(true);
          setTimeout(() => {
            setLoading(false)
          }, 2000)

          // navigate('/dashboard')


        }

      })
      .catch((err) => {
        console.log(err)
      })
  };



  const handlePasswordSubmit = () => {

    axios.post('http://localhost:5000/api/worker/ressetPassword', passwordEnter)
      .then(async (res) => {
        console.log(res.data)
        if (res.data.success == true) {
          console.log(res.data)
          setOpen3(false);
          Swal.fire({
            title: "Password Changed successfully.",
            text: "Now you can Login",
            icon: "success",


          });


          // navigate('/dashboard')


        }
        if (res.data.success == false) {

          setOpen3(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your password did not match!,Please try again.",
            confirmButtonText: "OK",
            // cancelButtonText: "Status"
          }).then((result) => {
            // Check if the user clicked the "Status" button
            if (result.dismiss === Swal.DismissReason.confirm) {
              // Redirect to another status page
              setOpen3(true);

            }

          });



          // navigate('/dashboard')


        }

      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleOtpSubmit = () => {

    axios.post('http://localhost:5000/api/worker/otpEnter', otpEnter)
      .then(async (res) => {
        console.log(res.data)
        if (res.data.success == true) {
          console.log(res.data)
          setOpen2(false);
          Swal.fire({
            title: "OTP verified successfully.",
            text: "You can proceed",
            icon: "success",
            confirmButtonText: "Reset Password",
          }).then((result) => {
            // Check if the user clicked the "Status" button
            if (result.dismiss === Swal.DismissReason.confirm) {
              // Redirect to another status page
              setOpen3(true);

            }

          });


          // navigate('/dashboard')


        }
        if (res.data.success == false) {

          setOpen2(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have entred wrong otp.",
            confirmButtonText: "OK",
            // cancelButtonText: "Status"
          }).then((result) => {
            // Check if the user clicked the "Status" button
            if (result.dismiss === Swal.DismissReason.confirm) {
              // Redirect to another status page
              setOpen2(true);

            }

          });



          // navigate('/dashboard')


        }

      })
      .catch((err) => {
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
              Worker Sign-In
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>



              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={HandleChange}
                error={!!errors.email} // Convert to boolean
                helperText={errors.email}
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
                helperText={errors.password}
              />

              {loading2 ? (
                <div style={{
                  marginTop:'20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <h4 style={{ color: 'red' }}>{loadingMessage}</h4>
                  <Fade
                    in={loading2}
                    style={{
                      transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                </div>
              ) : (

                <>
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
                    <Grid item >
                      <Link onClick={handleOpen} variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid container sx={{ mt: 5 }}>
                <Grid item xs>
                  <Link to={"/userlogin"} variant="body2">
                    User Sign-In
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/register"} variant="body2">
                    Sign Up as Worker
                  </Link>
                </Grid>
              </Grid>




              {/* Email Enter Modal */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleM}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter valid email address
                  </Typography>
                  <Typography id="modal-modal-title" variant="body2">
                    You will be getting OTP through this email.
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    onChange={HandleEmailChange}
                    error={!!errors.email} // Convert to boolean
                    helperText={errors.email}
                    size='small'
                  />
                  {loading ? (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Fade
                        in={loading}
                        style={{
                          transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                      >
                        <CircularProgress />
                      </Fade>
                    </div>
                  ) : (

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={handleEmailSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </Modal>



              {/* OTP Enter Modal */}
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleM}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter OTP
                  </Typography>
                  <Typography id="modal-modal-title" variant="body2">
                    We have sent OTP to your mail id,please check it.
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter OTP"
                    name="otps"
                    onChange={HandleOtpChange}
                    error={!!errors.email} // Convert to boolean
                    helperText={errors.email}
                    size='small'
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleOtpSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>

              {/* Reset Password Modal */}
              <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleM}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reset Your Password
                  </Typography>
                  <Typography id="modal-modal-title" variant="body2">
                    Enter your new password and confirm it.
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    type='password'
                    fullWidth
                    id="email"
                    label="Enter new password"
                    name="password"
                    onChange={HandleChangePassword}
                    error={!!errors.email} // Convert to boolean
                    helperText={errors.email}
                    size='small'
                  />
                  <TextField
                    margin="normal"
                    type='password'
                    required
                    fullWidth
                    id="email"
                    label="Repeat password"
                    name="repassword"
                    onChange={HandleChangePassword}
                    error={!!errors.email} // Convert to boolean
                    helperText={errors.email}
                    size='small'
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handlePasswordSubmit}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Modal>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}