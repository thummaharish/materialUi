import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


const Register = () => {

    const [users, setUsers] = useState()

    async function GetUsers() {

        let res = await axios.get('http://localhost:7200/users');
        console.log(res.data)
        setUsers(res.data)

    }

    useEffect(() => {
        GetUsers()
    }, [])

    const navigate = useNavigate()
    const [imagepreview, setImagepreview] = useState('')



    const { handleBlur, handleChange, handleReset, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            name: '', email: '', password: '', mobile: '', profile: Blob
        },

        validationSchema: Yup.object({

            name: Yup.string().max(10, "first name not greater than 10 char").min(4, "first name not less than 4 char")
                .required('first name required'),
            email: Yup.string().email('Invalid Email')
                .required('Email Required'),
            password: Yup.string().min(6, 'Password contains atleast 6 letters')
                .max(15, 'Password should not contain more than 15 letters').required('Password Required'),
            mobile: Yup.string().max(10, "mobile number contain 10 digits").min(10, "mobile number contain 10 digits")
                .required('mobile number required'),
            profile: Yup.mixed().required('Please upload an image')
        }),

        onSubmit: async (values) => {
           

            let userdataEmail = users.find((user) => { return user.email === values.email })
            let userdataMobile = users.find((user) => { return user.mobile === values.mobile })

            if (userdataEmail && userdataMobile) {
                alert('use different Email and mobile number')
            } else if (userdataEmail) {
                alert('use different Email');
            } else if (userdataMobile) {
                alert('use different  Mobile number');
            } else {
                alert('Registration successful!');
                
                await axios.post('http://localhost:7200/users', values)
                    .then(function (response) {
                        console.log('register details =', response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                navigate('/login')

            }



        }
    })

    return (
        <>


            <div className='d-flex justify-content-center align-items-center'>

                <form onSubmit={handleSubmit} className='w-75 mt-5'  >

                    <h2 className="text-primary text-center">Register Form</h2>

                    <div className="row">
                        <div className="mb-2 p-2 col">
                            <label htmlFor="name">First Name</label>
                            <input type="text" name='name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className='form-control' placeholder='Enter Your Name' />
                            {
                                touched.name && errors.name ? (<p className='text-danger'>{errors.name}</p>) : null
                            }
                        </div>

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
                    </div>


                    <div className="row">
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


                        <div className="mb-2 p-2 col">
                            <label htmlFor="mobile">mobile</label>
                            <input type="text" name='mobile'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                className='form-control' placeholder='Enter mobile number' />

                            {
                                touched.mobile && errors.mobile ? (<p className='text-danger'>{errors.mobile}</p>) : null
                            }
                        </div>
                    </div>

                    <div className="row">

                        <div className="mb-2 p-2 col">
                            <label htmlFor="profile">Upload a Profile</label>
                            <input type="file"
                                onChange={(e) => {

                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        setFieldValue('profile', reader.result)
                                        setImagepreview(reader.result)
                                    }
                                    reader.readAsDataURL(e.target.files[0])

                                }
                                }
                                onBlur={handleBlur}

                                name='profile'
                                className='form-control' />

                            {
                                touched.profile && errors.profile ? (<p className='text-danger'>{errors.profile}</p>) : null
                            }
                        </div>


                        {
                            imagepreview && (<div className='col'>
                                <img src={imagepreview} height={100} width={100} alt="" />
                            </div>)
                        }
                    </div>

                    <div className="mb-2 p-2">
                        <button type="submit" className='btn btn-primary'>Register</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Register