import  React,{useState,useEffect} from 'react';
import {  } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { TextField, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import useRoleRedirect from '../Redirect'
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
    useRoleRedirect('Admin');
    const [comment, SetComment] = useState([]);

    useEffect(() => {
        

      axios
        .get("http://localhost:5000/api/user/GetAllReview")
        .then((res) => {
            SetComment(res.data);
         
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    console.log(comment,'comment')
    const tableCellStyle = { color: '#fffdfd' };

  return (
   <>
    <Typography variant="h6" sx={{ fontWeight: 900,marginBottom:'10px'}}>
    View Feedback
  </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{backgroundColor:'#181824'}}>
          <TableRow>
            <TableCell sx={tableCellStyle} align="center">Customer Name</TableCell>
            <TableCell sx={tableCellStyle} align="center">Worker Name</TableCell>
            <TableCell sx={tableCellStyle} align="center">Massege</TableCell>
            <TableCell sx={tableCellStyle} align="center">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comment.map((row) => (
            
            <TableRow key={row.name}>
              
              <TableCell align="center">{row?.user_id?.name}</TableCell>
              <TableCell align="center">{row?.worker_id?.name}</TableCell>
              <TableCell align="center"><TextField value={row.reviews} inputProps={{disabled:true}} multiline/></TableCell>
              <TableCell align="center"><Rating name="size-large" defaultValue={row.rating} size="large" readOnly /></TableCell>
              
            </TableRow>
          ))}
         {comment.length == 0 &&  <TableRow>
          
            <TableCell colspan={7} ><div ><Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}} >No Data</Alert></div></TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );
}
