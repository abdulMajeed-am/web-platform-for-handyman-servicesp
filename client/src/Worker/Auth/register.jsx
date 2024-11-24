import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [getCategory, SetgetCategory] = useState([])
  const [register, setRegister] = useState({})
  const [profile, setProfile] = useState({})

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/view-category")
      .then((res) => {
        SetgetCategory(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const HandleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }

  console.log(register,'78')
  const HandleImage = (e) => {

    setProfile({ ...profile, [e.target.name]: e.target.files[0] })
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  }


  const [errors, setErrors] = useState({ name: '', email: '', location: '', phone: '', address: '', profile: '', cv: '', category_id: '', password: '' });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    if (!register.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!register.phone) {
      newErrors.phone = 'Phone Number is required';
      isValid = false;
    }
    if (!register.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!register.location) {
      newErrors.location = 'Pincode is required';
      isValid = false;
    }
    if (!register.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!profile.profile) {
      newErrors.profile = 'Profile is required';
      isValid = false;
    }
    if (!profile.cv) {
      newErrors.cv = 'CV is required';
      isValid = false;
    }
    if (!register.category_id) {
      newErrors.category_id = 'Category Id is required';
      isValid = false;
    }

    // Validate password
    if (!register.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  console.log(register, 'servie')
  console.log(profile, 'profile')
  const handleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    const Data = new FormData();
    Data.append('name', register.name);
    Data.append('email', register.email);
    Data.append('location', register.location);
    Data.append('phone', register.phone);
    Data.append('address', register.address);
    Data.append('category_id', register.category_id);
    Data.append('password', register.password);
    Data.append('profile', profile.profile);
    Data.append('cv', profile.cv);
    axios.post('http://localhost:5000/api/worker/register', Data)
      .then((res) => {
        console.log(res.data)


        if (res.data.success == false) {
          console.log(res.data.message, 'msg')

          toast.success('This email already registered!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

          });
        }
       
        
        if (res.data.success == true) {
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



          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }



      })
      .catch((err) => {
        console.log(err)
      })
  };


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
      {/* Same as */}
      <ToastContainer />
      <ThemeProvider theme={defaultTheme}>

        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={5} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ mt: '-30px', bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Worker Sign-Up
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}><TextField
                    margin="normal"
                    error={!!errors.name} // Convert to boolean
                    helperText={errors.name}
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={HandleChange}
                  size='small'
                  />
                  </Grid>
                  <Grid item xs={6}><TextField
                    margin="normal"
                    error={!!errors.phone} // Convert to boolean
                    helperText={errors.phone}
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    onChange={HandleChange}
                    size='small'

                  /></Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      error={!!errors.email} // Convert to boolean
                      helperText={errors.email}
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      onChange={HandleChange}
                      size='small'

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      error={!!errors.location} // Convert to boolean
                      helperText={errors.location}
                      fullWidth
                      id="email"
                      label="Pincode"
                      name="location"
                      type='number'
                      onChange={HandleChange}
                      size='small'

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      error={!!errors.profile} // Convert to boolean
                      helperText={errors.profile}
                      type='file'
                      id="profile"
                      label="Upload Profile Image"
                      name="profile"
                      onChange={HandleImage}
                      InputLabelProps={{ shrink: 'none' }}
                      // accept="image/*"
                      inputProps={{ accept: 'image/*' }}
                  size='small'

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      error={!!errors.cv} // Convert to boolean
                      helperText={errors.cv}
                      type='file'
                      id="profile"
                      label="Upload CV [Only PDF] "
                      name="cv"
                      onChange={HandleImage}
                      InputLabelProps={{ shrink: 'none' }}
                      // accept="application/pdf"
                      inputProps={{ accept: 'application/pdf' }}
                  size='small'

                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  error={!!errors.address} // Convert to boolean
                  helperText={errors.address}
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={HandleChange}
                  size='small'

                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                  <Select
                  size='small'

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category_id"
                    label="Select Category"
                    error={!!errors.category_id} // Convert to boolean
                    helperText={errors.category_id}
                    onChange={HandleChange}
                  >
                    {getCategory.map((category) => (

                      <MenuItem value={category._id}>{category.category_name}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
                <TextField
                  size='small'

                  margin="normal"
                  required
                  error={!!errors.password} // Convert to boolean
                  helperText={errors.password}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={HandleChange}
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to={"/login"} variant="body2">
                      {"Worker Sign-In"}
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link to={"/userlogin"} variant="body2">
                      {"Sign up as User"}
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