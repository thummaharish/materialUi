
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../../redux/features/cartSlice'

import { Typography, Button, Card, CardContent, CardActions, CardMedia, Stack, Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'




const Home = () => {
    const [allProducts, setAllProducts] = useState([])

    const dispatch = useDispatch([])





    async function GetAllProducts() {
        let res = await axios.get('https://fakestoreapi.com/products')

        let data = res.data
        setAllProducts(data)
    }



    useEffect(() => {
        GetAllProducts();
    }, [])


    return (





        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={1} >

            {
                allProducts && allProducts.map((pro) => {
                    return <Grid item xs={2} sm={3} md={3} key={pro.id} marginTop={1}>

                        <Card sx={{ boxShadow: '2px 2px 4px 2px rgba(0, 0, 1, 0.5)', padding:'5px' , backgroundColor:'#FFEBCD', height: '100%' }} >
                            <CardMedia

                                sx={{ height:200 }}
                                image={pro.image}
                                title={pro.title.substring(0, 25)}
                            />
                            <CardContent  >
                                <Typography gutterBottom variant="subtitle2" overflow='hidden'  sx={{height:50}} component="div">
                                    {pro.title.substring(0, 23)}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Price : {pro.price}
                                </Typography>
                            </CardContent>
                            <CardActions   >

                                <Grid container spacing={1}  >
                                    <Grid item xs={12} sm={6}>
                                        <Button color='secondary' fullWidth variant='contained' size="small" onClick={() => { dispatch(AddToCart(pro)) }} >Add to Cart</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button color='warning' fullWidth variant='contained' size="small" component={Link} to={`/product/${pro.id}`} >View</Button>
                                    </Grid>
                                </Grid>


                            </CardActions>
                        </Card>

                    </Grid>

                })
            }




        </Grid>





    )
}

export default Home