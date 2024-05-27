import React from 'react'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../redux/features/cartSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetProductBycategoryQuery } from '../redux/services/fakeApi'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'





const CategoryProduct = () => {
    const dispatch = useDispatch([])

    const catName = useParams()



    const { data, error, isLoading } = useGetProductBycategoryQuery(catName.catname)



    return (
        <>

            <Stack direction='row' justifyContent='flex-end' padding={4} >
                <Button to={'/'} component={Link} color='info' variant='contained'  > Go to Home</Button>
            </Stack>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={2} >

                {
                    isLoading ? (
                        <Typography varient='h2'>Product by category is loading</Typography>
                    ) : error ? (
                        <Typography varient='h2'>Error in Product by category component</Typography>

                    ) : data ? (
                        data.map((pro) => {
                            return <Grid item xs={12} sm={3} md={3} key={pro.id} marginTop={1}>

                            <Card sx={{ boxShadow: '2px 2px 4px 2px rgba(0, 0, 1, 0.5)', height: '100%' }} >
                                <CardMedia
    
                                    sx={{ height: 200 }}
                                    image={pro.image}
                                    title={pro.title.substring(0, 20)}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pro.title.substring(0, 20)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price : {pro.price}
                                    </Typography>
                                </CardContent>
                                <CardActions >
    
                                    <Grid container spacing={1}>
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
                    ) : null
                }




            </Grid>
        </>
    )
}

export default CategoryProduct



