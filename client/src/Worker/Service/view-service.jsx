import  React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import useRoleRedirect from '../Redirect'
import { Alert } from '@mui/material';

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
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const navigate=useNavigate();
 console.log(props,'count')
  const { row,count,setCount} = props;
 
  
  const [open, setOpen] = React.useState(false);
  const HandleDelete=(id)=>{
    axios.delete(`http://localhost:5000/api/worker/delete-service/${id}`)
    .then((res)=>{
      console.log(res.data)
      setCount(!count)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const HandleUpdate=(id)=>{
    navigate(`/updateserivce/${id}`)
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
           <Box style={{display:'flex'}}>
           <Box >
            <img src={`http://localhost:5000/api/upload/${row.service_image}`} alt=""  style={{width: '100%',
    height: '100px',
    objectFit: 'contain'}}/>

            </Box>
            <Box style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography >
          {row.service_name}

                </Typography>
            </Box>
           </Box>
        </TableCell>
        <TableCell align="left">{row.service_charge}</TableCell>
        <TableCell align="left">{row.units}</TableCell>
        <TableCell align="left">
            <IconButton onClick={()=>HandleUpdate(row._id)}><BorderColorIcon/></IconButton>
            <IconButton onClick={()=>HandleDelete(row._id)}><DeleteIcon/></IconButton>
        </TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                
                <TableBody>
                
                    <TableRow key={row.date}>
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                     
                     
                    </TableRow>
               
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  useRoleRedirect('Worker');

    const [getService, SetgetService] = useState([]);
    const [count,setCount]=useState(true)
    useEffect(() => {
      const token=JSON.parse(localStorage.getItem('Worker'))

      axios.get("http://localhost:5000/api/worker/view-all-service",{headers:{'auth-token':token}})

        .then((res) => {
          SetgetService(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [count]);
    const tableCellStyle = { color: '#fffdfd' };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:'#181824'}}>
          <TableRow>
            <TableCell />
        
            <TableCell sx={tableCellStyle} >Service Name</TableCell>
            <TableCell sx={tableCellStyle}  align="left">Service Charge</TableCell>
            <TableCell sx={tableCellStyle}  align="left">Units</TableCell>
       
            <TableCell sx={tableCellStyle}  align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getService?.map((row) => (
            <Row key={row.name} row={row} setCount={setCount} count={count} />
          ))}
          {getService?.length == 0 &&  <TableRow>
          
          <TableCell colspan={5} ><div ><Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}} >No Data</Alert></div></TableCell>
        </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
