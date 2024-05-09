import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveCart, increment, decrement } from '../redux/features/cartSlice'
import { Link } from 'react-router-dom'




const Cartitems = () => {
    const cart = useSelector((state) => state.cart)
    const cartitems = cart.cartitems
    const cartCount = cart.totalprice
    const dispatch = useDispatch()
    return (
        <>
            <div className=" container ">
                {
                    cartitems.length > 0 ? (<div>
                        <table className="table table-responsive my-3">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Product Quantity</th>
                                    <th>Products Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    cartitems.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={item.image} width={100} height={100} alt={item.title} />
                                                </td>
                                                <td>{item.title.substring(0, 20)}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-danger" onClick={() => { dispatch(decrement(item)) }}><i className="bi bi-dash-lg"></i></button>
                                                    <span className='mx-2'>{item.quantity}</span>
                                                    <button className="btn btn-sm btn-success" onClick={() => { dispatch(increment(item)) }}><i className="bi bi-plus-lg"></i></button>
                                                </td>
                                                <td>{item.quantity * item.price.toFixed(2)}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-danger text-white" onClick={() => { dispatch(RemoveCart(item)) }}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>

                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>

                        <div className='d-flex justify-content-between'>
                        <div>
                                <Link to={'/'} className='btn btn-primary'><i className="bi bi-arrow-left"></i> Go to Shopping</Link>
                            </div>
                            <div>
                                <p className=" bg-dark text-white p-2">Total Cart Price:  {cartCount.toFixed(2)} </p>
                            </div>
                        </div>

                    </div>

                    ) : (
                        <div className='d-flex justify-content-center p-5'>
                            <div className="card w-50">
                                <div className="card-header text-center">
                                    <h4>Please Add The Product to the cart</h4>
                                    <Link to={'/'} className='btn btn-dark'><i className="bi bi-arrow-left"></i> Go to Home</Link>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>
        </>
    )
}

export default Cartitems