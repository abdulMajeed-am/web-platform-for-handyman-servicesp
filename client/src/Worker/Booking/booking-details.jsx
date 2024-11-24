import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import useRoleRedirect from '../Redirect'

export default function CustomizedTables() {
  useRoleRedirect('Worker');

  const { id } = useParams();
  const [singleBooking, SetSingleBooking] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/worker/single-booking/${id}`)
      .then((res) => {
        SetSingleBooking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(singleBooking, "singleBooking");
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card style={{ padding: "20px" }}>
            <h5>Service Image</h5>
            <img
              src={`http://localhost:5000/api/upload/${singleBooking?.service_id?.service_image}`}
              alt=""
              style={{ width: "100%", height: "360px", objectFit: "contain" }}
            />
          </Card>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          <Card style={{ padding: "10px" }}>
            <h5>Service Details</h5>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="category_id"
                InputLabelProps={{ shrink: true }}
                readonly
                value={singleBooking?.service_id?.category_id?.category_name}
                fullWidth
                label="Category Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={singleBooking?.service_id?.service_name}
                name="service_name"
                fullWidth
                InputLabelProps={{ shrink: true }}
                readonly
                label="Service Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={singleBooking?.service_id?.service_charge}
                InputLabelProps={{ shrink: true }}
                readonly
                name="service_charge"
                fullWidth
                label="Service Charge"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={singleBooking?.service_id?.units}
                InputLabelProps={{ shrink: true }}
                readonly
                name="units"
                fullWidth
                label="Units"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={singleBooking?.service_id?.description}
                InputLabelProps={{ shrink: true }}
                readonly
                name="description"
                multiline
                fullWidth
                label="Decription"
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
       <Card style={{ padding: "20px",marginTop:'10px'}}>
        <h4 style={{marginBottom:'10px'}}>Booking Details</h4>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
       <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={singleBooking?.name}
            InputLabelProps={{ shrink: true }}
            readonly
            name="units"
            fullWidth
            label="Name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={singleBooking?.email}
            InputLabelProps={{ shrink: true }}
            readonly
            name="email"
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={singleBooking?.phone}
            InputLabelProps={{ shrink: true }}
            readonly
            name="phone"
            fullWidth
            label="Phone"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={moment(singleBooking.Date).format("MM/DD/YYYY")}
            InputLabelProps={{ shrink: true }}
            readonly
            name="Date"
            fullWidth
            label="Date"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={singleBooking?.time}
            InputLabelProps={{ shrink: true }}
            readonly
            name="time"
            fullWidth
            label="Time"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            value={singleBooking?.address}
            InputLabelProps={{ shrink: true }}
            readonly
            name="address"
            fullWidth
            label="Address"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            value={singleBooking?.work}
            InputLabelProps={{ shrink: true }}
            readonly
            name="Work"
            fullWidth
            label="Work"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            value={singleBooking?.total}
            InputLabelProps={{ shrink: true }}
            readonly
            name="total"
            fullWidth
            label="Total Amount"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            value={singleBooking?.request}
            InputLabelProps={{ shrink: true }}
            readonly
            name="request"
            fullWidth
            label="Request"
          />
        </Grid>
      </Grid>
       </Card>
    </>
  );
}
