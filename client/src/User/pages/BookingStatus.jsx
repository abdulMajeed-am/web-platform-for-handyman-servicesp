import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, TextField, Alert } from "@mui/material";
import Modal from "@mui/material/Modal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import QrCode from "../Images/Qr-code.png";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 690,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Row({ row }) {
  const [open1, setOpen1] = useState(false);
  const [Data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [trans, setTrans] = useState({});

  const handleOpen = (data) => {
    setOpen1(true);
    setData(data);
  };

  const handleClose = () => setOpen1(false);

  const HandleChange = (e) => {
    setTrans({ ...trans, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
  const [errors, setErrors] = useState({ transaction_id: "" });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    if (!trans.transaction_id) {
      newErrors.transaction_id = "Transaction Id is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const HandlePay = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }
    const Payment = {
      transaction_id: trans.transaction_id,
      service_id: Data.service_id._id,
      booking_id: Data._id,
      worker_id: Data.worker_id,
      service_charge: Data.service_id.service_charge,
      total: Data.total,
    };
    const token = JSON.parse(localStorage.getItem("User"));
    axios
      .post("http://localhost:5000/api/user/payment", Payment, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data) {
          setOpen1(false);
          Swal.fire({
            title: "Successful",
            text: "Thank you for Payment.",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
          });
        } else {
          console.log("Some error occurred");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [payment, setPayment] = useState([]);
  console.log(payment, "payment");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("User"));

    axios
      .get("http://localhost:5000/api/user/view-payment", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setPayment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Data]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.service_id?.service_name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.service_id?.service_name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.service_id?.category_id?.category_name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.service_id?.units}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
           ₹ {row?.service_id?.service_charge}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.work}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
           ₹ {row?.total}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            {row?.status === "pending" && (
              <Typography style={{ color: "red",fontSize: "1rem"  }}>Pending</Typography>
            )}
            {row?.status === "Accepted" && (
              <Typography style={{ color: "green",fontSize: "1rem"  }}>Accepted</Typography>
            )}
            {row?.status === "Rejected" && (
              <Typography style={{ color: "red",fontSize: "1rem"  }}>Rejected</Typography>
            )}
          </Typography>
        </TableCell>
        <TableCell align="right">
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
  
  {row?.status === "Accepted" && payment?.find(payment => payment.booking_id === row._id && payment.status === "Paid") && (
    <Typography style={{ color: "green", fontSize: "1rem" }}>Paid</Typography>
  )}
  
  {row?.status === "Accepted" && !payment.find(payment => payment.booking_id === row._id && payment.status === "Paid") && (
    <Button
      onClick={() => handleOpen(row)}
      size="small"
      style={{ color: "green" }}
      variant="outlined"
      // sx={{ fontSize: "1rem" }}
    >
      Pay Now
    </Button>
  )}
</Typography>



        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding:'20px 50px'}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: "1.2rem",fontWeight:'600',color:'gray' }}>
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1rem" }}>Requested</TableCell>
                    <TableCell sx={{ fontSize: "1rem" }}>Date</TableCell>
                    <TableCell sx={{ fontSize: "1rem" }} align="right">Time</TableCell>
                    <TableCell sx={{ fontSize: "1rem" }} align="right">Booking Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {row.request}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {moment(row.date).format("MM/DD/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {row.time}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {moment(row.BookedDate).format("MM/DD/YYYY")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: "1rem" }}>
            Payment
          </Typography>
          <Box style={{ display: "flex", gap: "30px" }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img src={QrCode} alt="no image" />
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
            >
              <TextField
                variant="outlined"
                value={Data?.service_id?.service_name}
                InputLabelProps={{ shrink: true }}
                readOnly
                name="serivce_name"
                fullWidth
                label="Service Name"
                sx={{ fontSize: "1rem" }}
              />
              <Box style={{ display: "flex", gap: "10px" }}>
                <TextField
                  variant="outlined"
                  value={Data?.work}
                  InputLabelProps={{ shrink: true }}
                  readOnly
                  name="Work"
                  fullWidth
                  label={`Number of ${Data?.service_id?.units}`}
                  sx={{ fontSize: "1rem" }}
                />
                <TextField
                  variant="outlined"
                  value={Data?.service_id?.service_charge}
                  InputLabelProps={{ shrink: true }}
                  readOnly
                  name="service charge"
                  fullWidth
                  label="Service Charge"
                  sx={{ fontSize: "1rem" }}
                />
              </Box>
              <TextField
                variant="outlined"
                value={Data?.total}
                InputLabelProps={{ shrink: true }}
                readOnly
                name="total"
                fullWidth
                label="Total Amount"
                sx={{ fontSize: "1rem" }}
              />
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={HandleChange}
                name="transaction_id"
                error={!!errors.transaction_id} // Convert to boolean
                helperText={errors.transaction_id}
                fullWidth
                label="Transaction id"
                sx={{ fontSize: "1rem" }}
              />
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <Button variant="contained" onClick={HandlePay} color="success" sx={{ fontSize: "1rem" }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [booking, setBooking] = useState([]);
  const [value, setValue] = useState("pending"); // Default value for tabs

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("User"));
    axios
      .get("http://localhost:5000/api/user/view-booking", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setBooking(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <h4 style={{textAlign:'center',marginTop:'60px',marginBottom:'40px',color: 'rgb(208, 111, 42)',fontWeight:'700',}}>Your Booking Status</h4>
      <Box sx={{ width: "100%",paddingBottom:'40px' }}>
      
<Paper elevation={3} >
        <TabList onChange={handleChange} aria-label="lab API tabs example"  centered   TabIndicatorProps={{ style: { backgroundColor: 'rgb(208, 111, 42)',height:'4px' } }} style={{padding:'10px'}}>
          <Tab label="Pending" value="pending" sx={{color:'gray',fontWeight:'bolder','&.Mui-selected': {
                            color: 'rgb(208, 111, 42)'// Change text color of active tab
                           
                        }}} />
          <Tab label="Accepted" value="Accepted"sx={{color:'gray',fontWeight:'bolder','&.Mui-selected': {
                            color: 'rgb(208, 111, 42)' // Change text color of active tab
                           
                        }}}   />
          <Tab label="Rejected" value="Rejected" sx={{color:'gray',fontWeight:'bolder','&.Mui-selected': {
                            color: 'rgb(208, 111, 42)' // Change text color of active tab
                           
                        }}} />
        </TabList></Paper>
        <TabPanel value="pending">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow sx={{bgcolor:'#0f3460'}} > 
                  <TableCell />
                  <TableCell sx={{ fontSize: "1rem",color:'white' }}>Service image</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Name</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Category</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Units</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Charge</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Work</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Total</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Status</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.filter((val) => val.status === "pending").length ===
                  0 && (
                  <TableRow key="empty-row">
                    <TableCell colSpan={10}>
                      <Alert
                      sx={{ fontSize: "1rem" }}
                        severity="error"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        No Pending bookings found.
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
                {booking
                  .filter((val) => val.status === "pending")
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="Accepted">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
              <TableRow sx={{bgcolor:'#0f3460'}} > 
                  <TableCell />
                  <TableCell sx={{ fontSize: "1rem",color:'white' }}>Service image</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Name</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Category</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Units</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Charge</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Work</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Total</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Status</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.filter((val) => val.status === "Accepted").length ===
                  0 && (
                  <TableRow key="empty-row">
                    <TableCell colSpan={10}>
                      <Alert
                      sx={{ fontSize: "1rem" }}
                        severity="error"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        No Accepted bookings found.
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
                {booking
                  ?.filter((val) => val.status === "Accepted")
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="Rejected">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
              <TableRow sx={{bgcolor:'#0f3460'}} > 
                  <TableCell />
                  <TableCell sx={{ fontSize: "1rem",color:'white' }}>Service image</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Name</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Category</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Units</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Service Charge</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Work</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Total</TableCell>
                  <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Status</TableCell>
                  {/* <TableCell sx={{ fontSize: "1rem",color:'white' }} align="right">Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.filter((val) => val.status === "Rejected").length ===
                  0 && (
                  <TableRow key="empty-row">
                    <TableCell colSpan={10}>
                      <Alert
                        severity="error"
                        sx={{ fontSize: "1rem" }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        No Rejected bookings found.
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
                {booking
                  ?.filter((val) => val.status === "Rejected")
                  .map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </TabContext>
  );
}
