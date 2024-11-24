import React, { useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide({ count, setCount }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [userLogin, setUserLogin] = useState({})
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





  const HandleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));

  }
  const [errors, setErrors] = useState({ email: '', password: '' });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    if (!userLogin.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // Validate password
    if (!userLogin.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const HandleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    axios.post("http://localhost:5000/api/user/login", userLogin)
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
          localStorage.setItem('User', JSON.stringify(res.data.token))
          localStorage.setItem('role2', JSON.stringify('user'))
          setCount(!count)
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
        if (res.data.success == false) {
          toast.error('Incorrect Email or Password', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

          });

          navigate('/userlogin')

        }
      })
      .catch((err) => {
        console.log(err)
      })
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


  const handleEmailSubmit = () => {
    setLoading(true)
    axios.post('http://localhost:5000/api/user/emailEnter', emailEnter)
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

    axios.post('http://localhost:5000/api/user/ressetPassword', passwordEnter)
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

    axios.post('http://localhost:5000/api/user/otpEnter', otpEnter)
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
              User Sign-In
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                onChange={HandleChange}
                fullWidth
                id="email"
                error={!!errors.email} // Convert to boolean
                helperText={errors.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                onChange={HandleChange}
                fullWidth
                name="password"
                error={!!errors.password} // Convert to boolean
                helperText={errors.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                onClick={HandleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item >
                  <Link onClick={handleOpen} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              <Grid container sx={{ mt: 5 }}>

                <Grid item lg>
                  <Link to={"/userregister"} variant="body2">
                    User Sign-Up
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    Worker Sign-In
                  </Link>
                </Grid>
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