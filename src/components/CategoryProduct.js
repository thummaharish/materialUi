import React from 'react'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../redux/features/cartSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetProductBycategoryQuery } from '../redux/services/fakeApi'

const CategoryProduct = () => {
    const dispatch = useDispatch([])

    const catName = useParams()



    const { data, error, isLoading } = useGetProductBycategoryQuery(catName.catname)



    return (
        <>
            <div className='row px-3 py-3'>
                <div className='text-end my-3'>
                    <Link to={'/'} className='btn btn-dark'><i className="bi bi-arrow-left"></i> Go to Home</Link>
                </div>

                {
                    isLoading ? (
                        <h2>Product by category is loading</h2>
                    ) : error ? (
                        <h2>Error in Product by category component</h2>
                    ) : data ? (
                        data.map((pro) => {
                            return <div className="col-lg-3 col-md-6 col-sm-12    py-2" key={pro.id}>
                                <div className="card h-100">
                                    <div className="card-header">
                                        <img src={pro.image} className='w-100' height={100} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <p>{pro.title}</p>
                                        <p>{pro.price}</p>
                                    </div>
                                    <div className=" card-footer gap-2 d-flex flex-lg-row flex-md-row   flex-sm-column justify-content-center align-items-center ">
                                        <button className="btn btn-primary w-100" onClick={() => { dispatch(AddToCart(pro)) }} >Add to Cart</button>
                                        <Link to={`/product/${pro.id}`} className="btn btn-warning w-100"  >View </Link>

                                    </div>

                                </div>
                            </div>
                        })
                    ) : null
                }


            </div>
        </>
    )
}

export default CategoryProduct