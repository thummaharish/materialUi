import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useGetCategoriesQuery } from '../redux/services/fakeApi';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Stack } from '@mui/material';
import { useSelector } from 'react-redux';





function NavBarMui() {

    const { data } = useGetCategoriesQuery()



    const cart = useSelector((state) => state.cart)

    const cartCount = cart.cartitems.length



    const user = JSON.parse(localStorage.getItem('loginUser'))

    const navigate = useNavigate()

    const logout = async () => {
        localStorage.clear();
        navigate('/')
    }



    const [anchorElNav, setAnchorElNav] = React.useState(null);
   

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

   

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>


                    <Stack direction='row' >
                        {/* Logo */}

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 'auto',
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >

                            <Avatar

                                src="/assets/Harish Shopping.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                        </Typography>

                        {/* for menu button */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu

                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' }
                                }}
                            >


                                {data ? (
                                    data.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}  >
                                            <Button component={Link} to={`/category/${page}`} sx={{ textDecoration: 'none', color: 'black' }}>{page}</Button>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Loading...</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>


                    </Stack>



                    {/* for menu app bar */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


                        {data ? (
                            data.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                                    component={Link} to={`/category/${page}`}
                                >
                                    {page}
                                </Button>
                            ))

                        ) : (
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Loding...
                            </Button>
                        )}

                    </Box>


                    <Box sx={{ display: 'flex' }}  >


                        {/* for cart count */}

                        {
                            cartCount > 0 ? (
                                <Button component={Link} to={'/cartitems'} sx={{ textDecoration: 'none', color: 'black' }}>
                                    <Badge color="secondary" badgeContent={cartCount}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </Button>
                            ) : null
                        }

                        {/* for login, logout, register */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} >

                            {
                                !user ? (
                                    <Stack direction='row'>
                                        <Button sx={{ color: 'white', textDecoration: 'none' }} component={Link} to={'/register'}>Register</Button>

                                        <Button sx={{ color: 'white', textDecoration: 'none' }} component={Link} to={'/Login'}>LogIn</Button>
                                    </Stack>


                                ) : (
                                    <Stack direction='row' spacing={2}>
                                        <Button sx={{ color: 'white', textDecoration: 'none', marginX: '5px' }} onClick={logout}>LogOut</Button>

                                        <span>
                                            <Avatar alt='' src={user.profile} />
                                        </span>
                                    </Stack>


                                )
                            }



                            {/* {
                                user ? (
                                    <Button sx={{ color: 'white', textDecoration: 'none', marginX: '2px' }} onClick={logout}>LogOut</Button>
                                ) : null
                            }

                            {
                                user ? (
                                    <span>
                                        <Avatar alt='' src={user.profile} />
                                    </span>

                                ) : null
                            } */}


                        </Box>
                    </Box>

                    {/* For avatar */}

                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBarMui;
