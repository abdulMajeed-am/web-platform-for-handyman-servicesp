import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Tabs, Tab, Alert, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import useRoleRedirect from '../Redirect'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from '@mui/material/IconButton';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  useRoleRedirect('Worker');

  const [booking, setBooking] = useState([]);
  const [count, setCount] = useState(false);
  const [filter, setFilter] = useState("Accepted"); // Default filter value

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Worker"));
    axios
      .get("http://localhost:5000/api/worker/view-booking", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setBooking(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const HandleStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/api/worker/booking-status/${id}`, {
        status: status,
      })
      .then((res) => {
        setCount(!count);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredBooking = booking.filter((row) => row.status === filter);

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 900, marginBottom: '10px' }}>
        Manage Bookings
      </Typography>
      <Tabs
        value={filter}
        onChange={(event, newValue) => setFilter(newValue)}
        aria-label="filter tabs"
      >
         <Tab label="Pending" value="pending" />
        <Tab label="Accepted" value="Accepted" />
        <Tab label="Rejected" value="Rejected" />
       
      </Tabs>
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Service Name</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Booking Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooking.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">
                  {row?.service_id?.service_name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(row.Date).format("MM/DD/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{display:'flex'}}>
                    {row.status === "pending" && (
                      <Box >
                        <IconButton aria-label="delete"
                          onClick={() => HandleStatus(row._id, "Accepted")}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton aria-label="delete"
                          onClick={() => HandleStatus(row._id, "Rejected")}

                        >
                          <CloseIcon />
                        </IconButton>
                        {/* <Button
                        onClick={() => HandleStatus(row._id, "Accepted")}
                        style={{ border: "1px solid green", color: "green" }}
                        size="small"
                      >
                        Accept
                      </Button> */}
                        {/* <Button
                        onClick={() => HandleStatus(row._id, "Rejected")}
                        style={{ border: "1px solid red", color: "red" }}
                        size="small"

                      >
                        Reject
                      </Button> */}
                      </Box>
                    )}
                    {row.status === "Accepted" && (
                      <Button
                        style={{ border: "1px solid green", color: "green" }}
                        size="small"

                      >
                        Accepted
                      </Button>
                    )}
                    {row.status === "Rejected" && (
                      <Button style={{ border: "1px solid red", color: "red" }} size="small">
                        Rejected
                      </Button>
                    )}
                    <Link to={`/booking-details/${row._id}`}>
                      <IconButton aria-label="delete">
                        <ReadMoreIcon />
                      </IconButton>
                      {/* <Button style={{ border: "1px solid blue", color: "blue" }} size="small">
                      View
                    </Button> */}
                    </Link>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {filteredBooking.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Alert severity="error" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No {filter} Booking found.</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
