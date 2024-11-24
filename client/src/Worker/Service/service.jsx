import { Box, Card, TextField, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewIcon from "@mui/icons-material/Preview";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ViewService from "./view-service";
import useRoleRedirect from '../Redirect'

export default function Category() {
  useRoleRedirect('Worker');

  const [category, setCategory] = useState("");
  const [service, setService] = useState({});
  const [serviceimage, setServiceImage] = useState({});
  const [state, setState] = useState(0);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Worker"));
    axios
      .get("http://localhost:5000/api/worker/WorkerDetails", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const HandleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
  };
  const HandleImage = (e) => {
    setServiceImage({ ...serviceimage, [e.target.name]: e.target.files[0] });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]:""
    }));
  };
  const [errors, setErrors] = useState({ service_name:'',service_charge: '',units:'',description:'',service_image:'',category_id:''});
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    // Validate email
    if (!service.service_name) {
      newErrors.service_name = 'Service Name is required';
      isValid = false;
    }
    if (!service.service_charge) {
      newErrors.service_charge = 'Service Charge is required';
      isValid = false;
    }
    if (!service.units) {
      newErrors.units = 'Units is required';
      isValid = false;
    }
    if (!service.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!serviceimage.service_image) {
      newErrors.service_image = 'Service Image is required';
      isValid = false;
    }
    // if (!service.category_id) {
    //   newErrors.category_id = 'Category Id is required';
    //   isValid = false;
    // }
   
  
    
  
    setErrors(newErrors);
    return isValid;
  };
  const HandleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    const token = JSON.parse(localStorage.getItem("Worker"));
    const Data = new FormData();
    Data.append("service_name", service.service_name);
    Data.append("service_charge", service.service_charge);
    Data.append("units", service.units);
    Data.append("description", service.description);
    Data.append("category_id", category.category_id?._id);
    Data.append("service_image", serviceimage.service_image);
    axios
      .post("http://localhost:5000/api/worker/insert-service", Data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Service Inserted", {
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
      .catch((err) => {
        console.log(err);
      });
  };
  const HandleState = () => {
    if (state == 0) {
      setState(1);
    } else if (state == 1) {
      setState(0);
    }
  };
  return (
    <div>
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
      {state == 0 && (
        <>
          <main class="py-6 bg-surface-secondary">
        <div class="container-fluid">
          <div class="card shadow border-0 mb-7">
            <div class="card-header" style={{display:'flex',justifyContent:'space-between'}}>
              <h5 class="mb-0">Add Service</h5>
              <Button color="success" onClick={HandleState} variant="outlined">
              View Services
            </Button>
            </div>
            <div class="table-responsive p-5">
            
          
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="category_id"
                  InputLabelProps={{ shrink: true }}
                  readonly
                  error={!!errors.category_id} // Convert to boolean
                  helperText={errors.category_id}
                  value={category?.category_id?.category_name}
                  fullWidth
                  label="Category Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  onChange={HandleChange}
                  name="service_name"
                  error={!!errors.service_name} // Convert to boolean
                  helperText={errors.service_name}
                  fullWidth
                  label="Service Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  onChange={HandleChange}
                  name="service_charge"
                  error={!!errors.service_charge} // Convert to boolean
                  helperText={errors.service_charge}
                  fullWidth
                  label="Service Charge"
                />
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Units of Time</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name="units"
    error={!!errors.units} // Convert to boolean
    helperText={errors.units || ''} // Ensure helperText is always a string
    label="Age"
    onChange={HandleChange}
  >
    <MenuItem value="Day">Day</MenuItem>
    <MenuItem value="Hour">Hour</MenuItem>
    {/* <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  onChange={HandleImage}
                  error={!!errors.service_image} // Convert to boolean
                  helperText={errors.service_image}
                  name="service_image"
                  type="file"
                  label="Upload Image"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  onChange={HandleChange}
                  name="description"
                  multiline
                  error={!!errors.description} // Convert to boolean
                  helperText={errors.description}
                  fullWidth
                  label="Decription"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={HandleSubmit}
                  fullWidth
                  color="success"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
       
            </div>
          </div>
        </div>

       
      </main>
         
        </>
      )}

      {state == 1 && (
        <>
          <div>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, marginBottom: '10px' }}>
        View Service
      </Typography>
              <Button color="success" onClick={HandleState} variant="outlined">
                Add Services
              </Button>
            </Box>
            <Box style={{ marginTop: "10px" }}>
              <ViewService />
            </Box>
          </div>
        </>
      )}
    </div>
  );
}
