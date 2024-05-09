
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../../redux/features/cartSlice'
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
        <>

            <div className="row px-3 ">
                {
                    allProducts && allProducts.map((pro) => {
                        return <div className="col-lg-3 col-md-6 col-sm-12 my-3" key={pro.id}>
                            <div className="card h-100" >
                                <div className="card-header">
                                    <img src={pro.image} className='w-100' height={100} alt="" />
                                </div>
                                <div className="card-body">
                                    <p>{pro.title.substring(0,20)}</p>
                                    <p>{pro.price}</p>
                                    <p>{pro.quantity}</p>

                                </div>
                                <div className="card-footer gap-2 d-flex flex-lg-row flex-md-row   flex-sm-column justify-content-center align-items-center ">
                                    
                                    <button className="btn btn-primary w-100   " onClick={()=>{dispatch(AddToCart(pro))}} >Add to Cart</button>
                                    <Link to={`/product/${pro.id}`} className="btn btn-warning w-100   "  >View </Link>

                                </div>

                            </div>
                        </div>
                    })
                }
            </div>

        </>
    )
}

export default Home