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
import { useParams } from "react-router-dom";
import useRoleRedirect from '../Redirect'

export default function Category() {
  useRoleRedirect('Worker');

  const { id } = useParams();
  const [singleService, SetSingleService] = useState({});
  console.log(singleService);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/worker/single-service/${id}`)
      .then((res) => {
        SetSingleService(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleImage = (e) => {
    SetSingleService({...singleService,[e.target.name]: e.target.files[0]})
  };
  const HandleChange = (e) => {
    SetSingleService({...singleService,[e.target.name]: e.target.value})
  };
  const HandleSubmit = () => {
    const Data = new FormData();
    Data.append("service_name", singleService.service_name);
    Data.append("service_charge", singleService.service_charge);
    Data.append("units", singleService.units);
    Data.append("description", singleService.description);
   
    Data.append("service_image", singleService.service_image);
    axios
      .put(`http://localhost:5000/api/worker/update-servcie/${id}`, Data)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
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

      <>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Update Service</h4>
        </Box>
        <Card
          style={{ padding: "20px" }}
          sx={{
            "& .MuiTextField-root": { mt: 2 },
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Box style={{ display: "flex",padding:'10px'}}>
              <Grid container spacing={20}>
                <Grid item xs={6}>
                  <img
                    src={`http://localhost:5000/api/upload/${singleService?.service_image}`}
                    alt=""
                    style={{width: '100%',
                    height: '60vh',
                    objectFit: 'contain'}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        name="category_id"
                        InputProps={{ readOnly: true }}
                       InputLabelProps={{shrink:true}}
                        fullWidth
                        value={singleService?.category_id?.category_name}
                        label="Category Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        InputLabelProps={{shrink:true}}
                        onChange={HandleChange}
                        name="service_name"
                        fullWidth
                        label="Service Name"
                        value={singleService.service_name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        InputLabelProps={{shrink:true}}
                        onChange={HandleChange}
                        name="service_charge"
                        fullWidth
                        label="Service Charge"
                        value={singleService.service_charge}
                        
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="demo-simple-select-label">
                          Units of Time
                        </InputLabel>
                        <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  name="units"
  label="Age"
  onChange={HandleChange}
  value={singleService?.units || ""}
>
  <MenuItem value="Day">Day</MenuItem>
  <MenuItem value="Hour">Hour</MenuItem>
  {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>

                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={HandleImage}
                name="service_image"
                type="file"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                InputLabelProps={{shrink:true}}
                onChange={HandleChange}
                name="description"
                multiline
                fullWidth
                value={singleService.description}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </Card>
      </>
    </div>
  );
}
