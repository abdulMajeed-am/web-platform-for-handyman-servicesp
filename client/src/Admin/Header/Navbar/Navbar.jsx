import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/Images/handyman.svg';
import { useLocation } from 'react-router-dom';

const HeaderWrapper = styled('div')`
    width: ${props => props.open ? '81%' : '19%'};
    background-color: ${props => props.open ? '#fff' : '#181824'};
    transition: width 0.3s ease; /* Add a transition for smoother animation */
`;

const Navbar = styled(AppBar)`
    z-index: ${props => props.theme.zIndex.drawer + 1};
    background-color: #fff;
    box-shadow: inset 0 -1px 0 0 #dadce0;
    width: ${props => props.open ? '100%' : '100%'};
    transition: width 0.3s ease; /* Add a transition for smoother animation */
    border-radius: 0 10px 10px 0; /* Optionally, you can add rounded corners */
`;

const Heading = styled(Typography)`
    color : #5f6368;
    font-size: 22px;
    padding: 0 0 0 15px;
`;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Header = ({ handleDrawer, open }) => {
    const location = useLocation();
    const pathName = capitalize(location.pathname.substring(1));

    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderWrapper open={open} />
            <Navbar open={open}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        sx={{ marginRight: 5 }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={logo} alt="logo" style={{ width: 30 }} />
                      
                        <Heading>{'Handy Man'}</Heading>
                    </Box>
                </Toolbar>
            </Navbar>
        </Box>
    );
}

export default Header;
