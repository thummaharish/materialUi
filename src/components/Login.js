import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


const Login = () => {

    const [users, setUsers] = useState()

    async function GetUsers(){

        let res = await axios.get('http://localhost:7200/users');
     
        setUsers(res.data)

    }

    useEffect(()=>{
        GetUsers()
    },[])

    const navigate = useNavigate()

    const { handleBlur, handleChange, handleReset, handleSubmit, values, errors, touched } = useFormik({

        initialValues: {
             email: '', password: ''
        },

        validationSchema: Yup.object({

            email: Yup.string().email('Invalid Email')
                .required('Email Required'),
            password: Yup.string().min(6, 'Password contains atleast 6 letters')
                .max(15, 'Password should not contain more than 15 letters').required('Password Required'),
           
        }),

        onSubmit: async (values) => {
        

            let logindata = users.find( (user)=>{return user.email === values.email && user.password === values.password})

            
            if(!logindata){
                alert('enter correct login details')
            }else{
                alert(' login successfully')
                localStorage.setItem('loginUser',JSON.stringify(logindata))
                navigate('/')
            }

            
        }
    })

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>

                <form onSubmit={handleSubmit} className='w-75 mt-5'  >

                    <h2 className="text-primary text-center">Login Form</h2>

                    <div className="row">
                        
                        <div className="mb-2 p-2 col">
                            <label htmlFor="email">Email</label>
                            <input type="text" name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className='form-control' placeholder='Enter email' />

                            {
                                touched.email && errors.email ? (<p className='text-danger'>{errors.email}</p>) : null
                            }
                        </div>

                        <div className="mb-2 p-2 col">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className='form-control' placeholder='Enter password' />

                            {
                                touched.password && errors.password ? (<p className='text-danger'>{errors.password}</p>) : null
                            }
                        </div>

                    </div>

                    <div className="mb-2 p-2">
                        <button type="submit" className='btn btn-primary'>Login</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login