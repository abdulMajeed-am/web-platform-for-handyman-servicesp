import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import NavList from './NavList';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon from MUI

// Define the width of the drawer
const drawerWidth = 240;

// Define styles for the opened state of the drawer
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    border: 'none'
});

// Define styles for the closed state of the drawer
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    border: 'none'
});

// Define the Drawer component using MuiDrawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        })
    }),
);

// Define the Sidebar component
const Sidebar = ({ count, setCount,setIsHeaderVisible }) => {
    const [open, setOpen] = React.useState(true); // Initially set to true for the full sidebar

    // Function to toggle the drawer
    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Navbar component */}
            <Navbar open={open} handleDrawer={handleDrawer} />
            {/* Drawer component */}
            <Drawer variant="permanent" open={open} >
                {/* Drawer content */}
                <DrawerContent >
                    <DrawerHeader>
                        <MenuIcon /> {/* Menu icon */}
                        <Heading>My Sidebar</Heading> {/* Heading */}
                    </DrawerHeader>
                    <NavList open={open} setOpen={setOpen} setIsHeaderVisible={setIsHeaderVisible} count={count} setCount={setCount} />
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

// Define the DrawerContent styled component
const DrawerContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

// Define the DrawerHeader styled component
const DrawerHeader = styled('div')(({ theme }) => ({
    // Necessary for content to be below app bar
    ...theme.mixins.toolbar,
    backgroundColor:'#181824',
    display: 'flex',
    alignItems: 'center',
}));

// Define the Heading styled component
const Heading = styled('h2')({
    margin: 0,
    marginLeft: '10px', // Adjust as needed
    color: '#fff',
});

export default Sidebar;
