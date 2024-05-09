import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCategoriesQuery } from '../../redux/services/fakeApi'
import { useSelector } from 'react-redux'

import './Navbar.css'

const Navbar = () => {
    const cart = useSelector((state) => state.cart)

    const cartCount = cart.cartitems.length

    const { data } = useGetCategoriesQuery()



    const user = JSON.parse(localStorage.getItem('loginUser'))

    const navigate = useNavigate()

    const logout = async () => {
        localStorage.clear();
        navigate('/')
    }

  return (
    <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <Link to={'/'} className="navbar-brand" ><h4>Harish Shopping</h4></Link>
                  
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link " to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select a Category
                                </Link>


                                <ul className="dropdown-menu ">
                                    {
                                        data ? (
                                            data.map((category) => <li key={category}><Link className='dropdown-item'  to={`/category/${category}`}>{category}</Link></li>)
                                        ) : null
                                    }

                                </ul>
                            </li>
                           
                        </ul>


                    </div>

                    <div>
                    {
                        (user && cartCount > 0) ? ( <Link to={'/cartitems'} className=' mx-2 text-white nav-link position-relative'>
                            <i class="bi bi-cart-fill"></i>  
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span></Link>) : null
                    }
                    </div>

                    
                        {
                            !user ? (<div className='register' >
                                <Link className='registerLink'  to={'/register'}>Register</Link>
                            </div>

                            ) : null
                        }

                        {
                            !user ? (<div className="register">
                                <Link className="registerLink" to={'/Login'}>LogIn</Link>
                            </div>) : null
                        }

                        {
                            user ? (<div className="register">
                            <button className="registerLink btn btn-dark"  onClick={logout}>LogOut</button>
                        </div>):null
                        }

                    <span>
                    {
                         user ? (<img src={user?.profile} height={30} width={30} alt='' className='mx-2' style={{ borderRadius: '50%' }} />) : null

                    }

                    </span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

        </>
  )
}

export default Navbar