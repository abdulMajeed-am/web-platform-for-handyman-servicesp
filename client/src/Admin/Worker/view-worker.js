import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Alert from '@mui/material/Alert';
import TabPanel from '@mui/lab/TabPanel';
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
import { Button } from 'react-bootstrap';
import useRoleRedirect from '../Redirect'
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
  const navigate = useNavigate();
  useRoleRedirect('Admin');
  console.log(props, 'count');
  const { row, count, setCount } = props;


  const [open, setOpen] = React.useState(false);

  const HandleUpdate = (id, value) => {
    axios.put(`http://localhost:5000/api/admin/UpdateStatus/${id}`, { status: value })
      .then((res) => {
        console.log(res.data)
        setCount(!count)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align='center'>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>

          <img src={`http://localhost:5000/api/worker/${row.profile}`} alt="" style={{ width: '100%', height: '100px', objectFit: 'contain' }} />

        </TableCell>
        <TableCell align='center'>{row.name}</TableCell>
        <TableCell align='center'>{row.email}</TableCell>
        <TableCell align='center'>{row.phone}</TableCell>
        <TableCell align='center'>
          {row.status === 'pending' && <div style={{ display: 'flex', gap: '10px' }}><Button
            onClick={() => HandleUpdate(row._id, 'Accepted')}

            style={{ border: '1px solid green', color: 'green', backgroundColor: 'white' }}
          >
            Accept
</Button>
            <Button onClick={() => HandleUpdate(row._id, 'Rejected')} style={{ border: '1px solid red', color: 'red', backgroundColor: 'white' }}>Reject</Button>
          </div>}
          {row.status === 'Accepted' && <><Button style={{ border: '1px solid green', color: 'green', backgroundColor: 'white' }}
          >Accepted</Button>
          </>}
          {row.status === 'Rejected' && <>
            <Button style={{ border: '1px solid red', color: 'red', backgroundColor: 'white' }}>Rejected</Button></>}
        </TableCell>

      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">

                    </TableCell>
                    <TableCell>{row?.category_id?.category_name}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">
                      {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
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
  const [Worker, SetWorker] = useState([]);
  const [count, setCount] = useState(true);
  console.log(Worker);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/AllWorker")
      .then((res) => {
        SetWorker(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);
  const tableCellStyle = { color: '#fffdfd' };
  const [pendingData, setPendingData] = useState([]);
  const [acceptedData, setAcceptedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);

  useEffect(() => {
    setPendingData(Worker.filter((val) => val.status === "pending"));
    setAcceptedData(Worker.filter((val) => val.status === "Accepted"));
    setRejectedData(Worker.filter((val) => val.status === "Rejected"));
  }, [Worker]);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 900, marginBottom: '10px' }}>
        Manage Worker
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pending" value="1" />
              <Tab label="Accepted" value="2" />
              <Tab label="Rejected" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead sx={{ backgroundColor: '#181824' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell align='center' sx={tableCellStyle}>Profile</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Name</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Email</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Phone</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
  {pendingData.map((row) => (
    <Row key={row.name} row={row} setCount={setCount} count={count} />
  ))}
  {pendingData.length === 0 && (
    <TableRow>
      <TableCell colSpan={6}>
        <Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No pending workers found.</Alert>
      </TableCell>
    </TableRow>
  )}
</TableBody>

              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="2">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead sx={{ backgroundColor: '#181824' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell align='center' sx={tableCellStyle}>Profile</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Name</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Email</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Phone</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {acceptedData.map((row) => (
                    <Row key={row.name} row={row} setCount={setCount} count={count} />
                  ))}
                  {acceptedData.length === 0 && (
    <TableRow>
      <TableCell colSpan={6}>
        <Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No accepted workers found.</Alert>
      </TableCell>
    </TableRow>
  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="3">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead sx={{ backgroundColor: '#181824' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell align='center' sx={tableCellStyle}>Profile</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Name</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Email</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Worker Phone</TableCell>
                    <TableCell align='center' sx={tableCellStyle}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rejectedData.map((row) => (
                    <Row key={row.name} row={row} setCount={setCount} count={count} />
                  ))}

{rejectedData.length === 0 && (
    <TableRow>
      <TableCell colSpan={6}>
        <Alert severity="error" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No pending workers found.</Alert>
      </TableCell>
    </TableRow>
  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
