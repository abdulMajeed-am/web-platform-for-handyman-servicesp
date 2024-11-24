import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { LightbulbOutlined, ArchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import CommentIcon from '@mui/icons-material/Comment';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';


const useStyles = makeStyles({
    sideBarActive: {
      color: '#3ace42', // Active color for text
    },
    
    sideBarActiveIcon: {
      color: '#3ace42', // Default color for icon
    },
    
    listItemButtonHover: {
      '&:hover': {
        color: '#ffffff',
        // Add any other hover styles here
      },
    },
  });
const NavList = ({ open, setOpen,count,setCount,setIsHeaderVisible}) => {

    const classes = useStyles();
    const [user,setUser]=useState("")
    const [filter,setFilter]=useState([])

    const location = useLocation();
    const navigate = useNavigate();

    const sidebarLinks = [
        {
            id: 1,
            label: 'Dashboard',
            icon: <DashboardIcon />,
            link: '/dash'
        },
        {
            id: 2,
            label: 'Manage Category',
            icon: <CategoryIcon />,
            link: '/category'
        },
        {
            id: 3,
            label: 'View User',
            icon: <GroupIcon />,
            link: '/user'
        },
        {
            id: 4,
            label: 'Manage Worker',
            icon: <EngineeringIcon />,
            link: '/workers'
        },
        {
            id: 5,
            label: 'View Payment',
            icon: <PaymentIcon />,
            link: '/viewpayment'
        },
        {
          id: 6,
          label: 'View Feedback',
          icon: <CommentIcon />,
          link: '/view-comment'
      }
    ];
    const sidebarLinks2 = [
        {
            id: 1,
            label: 'Dashboard',
            icon: <DashboardIcon />,
            link: '/dashboard'
        },
        {
            id: 2,
            label: 'Manage Service',
            icon: <MiscellaneousServicesIcon />,
            link: '/service'
        },
        {
            id: 3,
            label: 'Manage Booking',
            icon: <ShoppingBagIcon />,
            link: '/booking'
        },
        {
            id: 4,
            label: 'View Payment',
            icon: <PaymentIcon />,
            link: '/payment'
        },
        {
            id: 5,
            label: 'View Feedback',
            icon: <CommentIcon />,
            link: '/view-worker-comment'
        }
    ];

    const handleDrawer = () => {
        setOpen(true);
    }
  
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('role'))) {
            setUser('Admin');
        } else if (JSON.parse(localStorage.getItem('role1'))) {
            setUser('Worker');
        }
    }, [count]);
    
    useEffect(() => {
        if (user === 'Admin') {
            setFilter(sidebarLinks);
        } else if (user === 'Worker') {
            setFilter(sidebarLinks2);
        }
    }, [user]);
    
    const HandleLogout = () => {
      if (user === 'Admin') {
        localStorage.removeItem('Admin');
        localStorage.removeItem('role');
        setCount(!count);
        setIsHeaderVisible(false); // Hide the Header component
       
          navigate('/admin-login');
      
      } else if (user === 'Worker') {
        localStorage.removeItem('Worker');
        localStorage.removeItem('role1');
        setCount(!count); // Toggle count to trigger useEffect
        setIsHeaderVisible(false); // Hide the Header component
      
          navigate('/');
       
      }
    };
    
    return (
       <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',backgroundColor:'#181824',border:'1px solid'}}>
       <List>
  {filter?.map((list) => (
    <ListItem
      key={list.id}
      disablePadding
      sx={{ display: 'block' }}
      className={location.pathname === list.link ? classes.sideBarActive : ''}
      onClick={() => {
        navigate(list.link);
      }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          ...classes.listItemButtonHover, // Include hover styles here
        }}
        onClick={handleDrawer}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
             color: location.pathname === list.link ? '#44ce36' : '#fffdfd', // Adjust icon color
          }}
          className={location.pathname === list.link ? classes.sideBarActiveIcon : null}
        >
          {list.icon}
        </ListItemIcon>
        <ListItemText
          primary={list.label}
          sx={{
            opacity: open ? 1 : 0,
            color: location.pathname === list.link ? '#44ce36' : '#fffdfd',
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
        <Box>
        <List >
        <ListItemButton style={{marginLeft:'10px'}} onClick={HandleLogout}><ListItemIcon style={{color:'#fffdfd'}} ><LogoutIcon/></ListItemIcon><ListItemText style={{color:'#fffdfd'}} >LogOut</ListItemText></ListItemButton>
</List>
        </Box>
       </div>
    )
}

export default NavList;