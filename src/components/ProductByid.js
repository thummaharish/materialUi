import React from 'react'
import { useGetProductByIdQuery } from '../redux/services/fakeApi'
import { Link, useParams } from 'react-router-dom'
import { AddToCart } from '../redux/features/cartSlice'
import { useDispatch } from 'react-redux'



const ProductByid = () => {

    const Id = useParams()

    const { data, isLoading, error } = useGetProductByIdQuery(Id.ProductId)

    const dispatch = useDispatch()
    return (
        <>
            {
                isLoading ? (
                    <h2>Product by Id Component is loading</h2>
                ) : error ? (
                    <h2>Error in Product by Id component</h2>
                ) : data ? (
                    <div className='p-5'>
                        <div className='card mt-3'>
                            <div className='d-flex flex-lg-row flex-md-row flex-sm-wrap justify-content-center align-items-center p-3'>
                                <div className=" w-50 text-center ">
                                    <img src={data.image} height={200} width={150} alt={data.title} />
                                </div>
                                <div className="w-50 ">
                                    <p>Name : {data.title}</p>
                                    <p>Price : {data.price}</p>
                                    <p>Description : {data.description}</p>
                                </div>
                            </div>                    

                        </div>
                        <div className='text-center  mt-3 '>

                            <button className="btn btn-primary" onClick={() => { dispatch(AddToCart(data)) }} >Add to cart</button>
                            <Link to={'/'} className="btn btn-dark ms-2"  ><i className="bi bi-arrow-left"></i>Back to Home</Link>

                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default ProductByid