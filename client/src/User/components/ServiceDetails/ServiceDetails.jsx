import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./service-details.css";
import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/tool-hero-orange.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
const ProductDetails = ({ selectedProduct }) => {
  const nav = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [Service, setService] = useState({});
  const [total, setTotal] = useState();
  const [booking, setBooking] = useState({});
  const [work, setWork] = useState(1)
  const handleOpen = (Select) => {
    setOpen(true);
    setTotal(Select.service_charge);
    setService(Select);
  };

  const handleClose = () => setOpen(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input name
    if (name === "work") {
      const Units = parseInt(value); // Convert value to integer
      const Total = Units * Service.service_charge;

      setWork(Units);
      setTotal(Total); // Update total state
      setBooking({ ...booking, [name]: value, total: Total }); // Update booking state with both work and total
    } else {
      // For other fields, update the booking object
      setBooking({ ...booking, [name]: value });
    }

    // Clear the error message for the current field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  console.log(total, 'total000')
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', address: '', date: '', time: '', work: '', request: '' });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each form field
    if (!booking.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!booking.phone) {
      newErrors.phone = 'Phone Number is required';
      isValid = false;
    }
    if (!booking.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!booking.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!booking.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    if (!booking.time) {
      newErrors.time = 'Time is required';
      isValid = false;
    }
    if (!work || work < 1) { // Check if work is falsy or less than 1
      newErrors.work = 'Number of units must be at least 1';
      isValid = false;
    }
    if (!booking.request) {
      newErrors.request = 'Request is required';
      isValid = false;
    }

    setErrors(newErrors); // Update the error state
    return isValid; // Return the validity status
  };
  console.log(booking, 'booking')
  const HandleClick = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    const token = JSON.parse(localStorage.getItem('User'))
    console.log(token, 'token')
    const bookingrequest = {
      booking,
      service_id: Service._id,
      worker_id: selectedProduct?.worker_id
    }
    axios.post('http://localhost:5000/api/user/booking', bookingrequest, { headers: { 'auth-token': token } })
      .then((res) => {
        console.log(res.data)
        if (res.data) {


          Swal.fire({
            title: "Successful",
            text: "Thank you for booking.",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Status"
          }).then((result) => {
            // Check if the user clicked the "Status" button
            if (result.dismiss === Swal.DismissReason.cancel) {
              // Redirect to another status page
              nav('/bookingstatus');
            }
          });
          setOpen(false);
        } else {
          console.log("Some error occurred");
        }
      })

      .catch((err) => {
        console.log(err)
      })
  };
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  return (
    <>
      <div className="image-container">
        <img src={Logo} alt="Product-bg" />
        <div className="overlay">
          <Container>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h2 style={{ color: "#d06f2a" }}>Hands-Free</h2>
              </div>
              <div>
                <h2
                  style={{
                    color: "#e3dad3",
                    letterDpacing: "2px",
                    fontWeight: 400,
                    fontFamily: "bebas-neueregular,sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedProduct?.service_name}
                </h2>
              </div>
              <div>
                <p style={{ color: "#e3dad3", textAlign: "center" }}>
                  "Enjoy the convenience of our skilled handymen for all your
                  furniture assembly needs. Our experts are adept at a wide
                  range of handyman tasks, including assembling furniture, so
                  you can sit back and relax while we take care of it for you."
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <section className="single-product">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={6}>
              <img
                className="product-image"
                loading="lazy"
                src={`http://localhost:5000/api/upload/${selectedProduct?.service_image}`}
                alt=""
              />
            </Col>
            <Col md={6}>
              <div className="product-details">
                <h2>{selectedProduct?.service_name}</h2>
                <div className="rate">
                  <span>Category: {selectedProduct?.category_id?.category_name}</span>
                </div>
                <div className="info">
                  <span className="price">Price: ₹ {selectedProduct?.service_charge} / {selectedProduct?.units}</span>
                </div>
                <p className="description">{selectedProduct?.description}</p>
                <button
                  aria-label="Add"
                  type="submit"
                  className="add-to-cart"
                  onClick={() => handleOpen(selectedProduct)}
                >
                  Book Now
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              style={{ marginBottom: "20px" }}
              variant="h6"
              component="h2"
            >
              Service Booking
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="name"
                  onChange={HandleChange}
                  error={!!errors.name} // Convert to boolean
                  helperText={errors.name}
                  fullWidth
                  label="Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="email"
                  onChange={HandleChange}
                  error={!!errors.email} // Convert to boolean
                  helperText={errors.email}
                  fullWidth
                  label="Email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="phone"
                  onChange={HandleChange}
                  error={!!errors.phone} // Convert to boolean
                  helperText={errors.phone}
                  fullWidth
                  label="Phone"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="address"
                  onChange={HandleChange}
                  error={!!errors.address} // Convert to boolean
                  helperText={errors.address}
                  fullWidth
                  label="Address"
                />
              </Grid>
              <Grid item xs={6}>


                <TextField
                  variant="outlined"
                  name="date"
                  onChange={HandleChange}
                  type="date"
                  error={!!errors.date} // Convert to boolean
                  helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Date"
                  inputProps={{
                    min: minDate
                  }}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="time"
                  onChange={HandleChange}
                  type="time"
                  error={!!errors.time} // Convert to boolean
                  helperText={errors.time}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Time"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  inputProps={{ min: 1 }} // Pass min attribute using inputProps
                  type="number" // Depending on your requirement
                  name="work"
                  error={!!errors.work} // Convert to boolean
                  helperText={errors.work}
                  InputLabelProps={{ shrink: true }}
                  onChange={HandleChange}
                  fullWidth
                  label={`Number of ${Service.units}`}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="total"
                  onChange={HandleChange}
                  InputProps={{ readOnly: true }} // Use InputProps to pass readOnly attribute
                  InputLabelProps={{ shrink: true }}
                  value={total}
                  fullWidth
                  label="Service Charge"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  name="request"
                  error={!!errors.request} // Convert to boolean
                  helperText={errors.request}
                  onChange={HandleChange}
                  multiline
                  fullWidth
                  label="Request"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ width: "50%" }}
                  onClick={HandleClick}
                  color="success"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </section>
    </>


  );
};

export default ProductDetails;
