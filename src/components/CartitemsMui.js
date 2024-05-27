import { Box, Button,  Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RemoveCart, decrement, increment } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const CartitemsMui = () => {
    const cart = useSelector((state) => state.cart)
    const cartitems = cart.cartitems
    const cartCount = cart.totalprice
    const dispatch = useDispatch()

    // const StyledTableRow = styled(TableRow)(({ theme }) => ({

    //       backgroundColor: 'black',

    //   }));

    return (
        <>

            {
                cartitems.length > 0 ? (

                    <Box sx={{ maxWidth: '80%', marginX: 'auto', marginY: '20px' }} >
                        <Table >
                            <TableHead >
                                <TableRow >
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Product Price</TableCell>
                                    <TableCell>Product Quantity</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cartitems.map((item, index) => <TableRow key={item}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img src={item.image} height={100} width={100} alt={item.title} />
                                        </TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>
                                            <RemoveIcon sx={{ backgroundColor: 'rgb(241, 87, 87)', borderRadius: '5px', color: 'white', padding: '3px' }} onClick={() => { dispatch(decrement(item)) }} />
                                            <span className='mx-2'>{item.quantity}</span>
                                            <AddIcon sx={{ backgroundColor: 'rgb(81, 150, 81)', borderRadius: '5px', color: 'white', padding: '3px' }} onClick={() => { dispatch(increment(item)) }} />
                                        </TableCell>
                                        <TableCell>{item.quantity * item.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant='contained' color='secondary' onClick={() => { dispatch(RemoveCart(item)) }} >Delete</Button>
                                        </TableCell>
                                    </TableRow>)
                                }
                            </TableBody>
                        </Table>

                        <Stack direction='row' spacing='auto' justifyContent='center' marginY={10}>
                            <Button variant='contained' color='secondary' component={Link} to={'/'} startIcon={<ArrowBackIcon />}>Go to Home</Button>
                            <Typography component='h5'>Total Cart Price : <b>{cartCount}</b></Typography>


                        </Stack>
                    </Box>
                ) : (

                    <Box textAlign='center' xp={5}>
                        <Typography component='h4' marginY={2}>Please Add The Product to the cart</Typography>
                        <Button variant='contained'  color='secondary' component={Link} to={'/'} startIcon={<ArrowBackIcon />}>Go to Home</Button>
                    </Box>
                )
            }


        </>
    )
}

export default CartitemsMui