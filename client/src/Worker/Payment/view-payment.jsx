import  React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { Typography,Alert } from '@mui/material';
import useRoleRedirect from '../Redirect'


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  useRoleRedirect('Worker');

    const [payment, SetPayment] = useState([]);

    useEffect(() => {
        const token=JSON.parse(localStorage.getItem('Worker'))

      axios
        .get("http://localhost:5000/api/worker/view-payment",{headers:{'auth-token':token}})
        .then((res) => {
            SetPayment(res.data);
         
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    console.log(payment)
  return (
    <>
    <Typography variant="h6" sx={{ fontWeight: 900, marginBottom: '10px' }}>
        View Service
      </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Service Name</StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Transactio Id</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Admin Pay</StyledTableCell>
            <StyledTableCell align="center">Received Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment.map((row) => (
            
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">
                {row?.service_id?.service_name}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.user_id?.name}</StyledTableCell>
              <StyledTableCell align="center">{row?.transaction_id}</StyledTableCell>
              <StyledTableCell align="center">₹ {row.total}</StyledTableCell>
              <StyledTableCell align="center">₹ {row.admin_pay}</StyledTableCell>
              <StyledTableCell align="center">₹ {row.total-row.admin_pay}</StyledTableCell>
              <StyledTableCell align="center" style={{color:'green'}}>{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
            {payment.length === 0 && (
    <TableRow>
      <TableCell colSpan={7}>
        <Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No Payment found.</Alert>
      </TableCell>
    </TableRow>
  )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
