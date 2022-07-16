import Cookie from 'js-cookie'
import { Link } from 'react-router-dom';

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Redirect } from 'react-router-dom'

import './navbar.css';

const Navbar = ({ isAuthenticated, setisAuthenticated, setRedirect }) => {
    const handleButton = () => {
        if (isAuthenticated) {
            Cookie.remove('token')
            localStorage.removeItem('token')
            setRedirect('')
            setisAuthenticated({ ...isAuthenticated, status: false })
        }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="color shadow-sm">
            <nav className="navbar navbar-light" style={{ padding: 'none' }}>
                <div className="container-fluid">
                    <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}><h5 className='title'>EventsGo</h5></Link>
                    <div className="d-flex mr-4">

                        <Stack spacing={2} direction="row">
                            <Button variant='text'>
                                <Link to="/" className="profileLink">Home</Link>
                            </Button>
                            {
                                !isAuthenticated.status
                                    ?
                                    <Button variant='text'>
                                        <Link to='/login' class="profileLink" onClick={(e) => handleButton(e)}>Login</Link>
                                    </Button>
                                    :
                                    <>
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Link to='/profile' className='profileLink'>
                                                <MenuItem>
                                                    <Avatar /> Profile
                                                </MenuItem>
                                            </Link>
                                            <Divider />
                                            <Link to='/login' class="profileLink" onClick={(e) => handleButton(e)}>
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <Logout fontSize="small" />
                                                    </ListItemIcon>
                                                    Logout
                                                </MenuItem>
                                            </Link>
                                        </Menu>
                                    </>
                            }
                            {/* <Button variant='text'>
                                <Link to='/login' class="profileLink" onClick={(e) => handleButton(e)}>{isAuthenticated.status ? 'Logout' : 'Login'}</Link>
                            </Button> */}
                        </Stack>

                    </div>
                </div>
            </nav>
        </div>

    );
}

export default Navbar;
