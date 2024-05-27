import { Formik, Form, Field } from 'formik'
import React, { useEffect, useState } from 'react'

import * as Yup from 'yup'

import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'









const LoginMui = () => {

    const [users, setUsers] = useState()

    async function GetUsers() {

        let res = await axios.get('https://test-server-qs1n.onrender.com/users');

        setUsers(res.data)

    }

    useEffect(() => {
        GetUsers()
    }, [])

    const navigate = useNavigate()


    const initialValues = {

        email: '',
        password: '',

    }

    const validationSchema = Yup.object({

        email: Yup.string().email('Invalid Email').required('email required'),
        password: Yup.string().min(5, 'Password contains atleast 5 letters')
            .max(15, 'Password should not contain more than 15 letters').required('Password Required'),


    })

    const onSubmit = async (values, formikHelpers) => {


        let logindata = users.find((user) => { return user.email === values.email && user.password === values.password })


        if (!logindata) {
            alert('enter correct login details')
            formikHelpers.resetForm()
        } else {
            alert(' login successfully')
            localStorage.setItem('loginUser', JSON.stringify(logindata))
            formikHelpers.resetForm()
            navigate('/')
        }


    }

   





    return (
        <>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    ({ errors, isValid, dirty, touched }) => {

                        return (
                            <Box   >
                                <Form  >


                                    <Grid container justifyContent='center' p={5} >
                                        <Grid item md={6} xs={12}  >

                                            <Grid item mt={2} >

                                                <Typography variant='h4' fontWeight={500} textAlign='center' color='#4B0082'>
                                                    Login Form
                                                </Typography>

                                            </Grid>
                                            <Grid item mt={2} >

                                                <Field name="email" fullWidth type="email" label='Email' color='secondary' as={TextField} error={Boolean(errors.email) && Boolean(touched.email)} helperText={Boolean(touched.email) && errors.email} />


                                            </Grid>
                                            <Grid item mt={2}>

                                                <Field name="password" fullWidth type="password" label='Password' color='secondary' as={TextField} error={Boolean(errors.password) && Boolean(touched.password)} helperText={Boolean(touched.password) && errors.password} />


                                            </Grid>
                                            <Grid item mt={2}>

                                                <Button type='submit' fullWidth disabled={!dirty || !isValid} variant="contained" size='large' color='secondary'>Contained</Button>


                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <div className='text-center p-3'>

                                        <h4 className='text-success'>login with the details </h4>
                                        <p>Email : harish@gmail.com</p>
                                        <p>Password : 12345</p>

                                    </div>


                                </Form>
                            </Box>
                        )
                    }
                }

            </Formik>



        </>
    )
}

export default LoginMui