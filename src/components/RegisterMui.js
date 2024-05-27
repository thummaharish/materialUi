import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const RegisterMui = () => {
    const [users, setUsers] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const res = await axios.get('https://test-server-qs1n.onrender.com/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 5}}>
            <Card  sx={{width:'75%', m:'auto', backgroundColor:'rgb(250, 233, 247)'}} >
                <CardContent   >
                    <Typography variant="h4" color='primary' textAlign="center" gutterBottom>
                        Register Form
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            mobile: '',
                            profile: null
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(4, ' name should be at least 4 characters')
                                .max(10, ' name should not exceed 10 characters')
                                .required(' name is required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Email is required'),
                            password: Yup.string()
                                .min(5, 'Password should be at least 5 characters')
                                .max(15, 'Password should not exceed 15 characters')
                                .required('Password is required'),
                            mobile: Yup.string()
                                .min(10, 'Mobile number should be 10 digits')
                                .max(10, 'Mobile number should be 10 digits')
                                .required('Mobile number is required'),
                            profile: Yup.mixed().required('Please upload a profile image')
                        })}
                        onSubmit={async (values) => {
                            let userdataEmail = users.find((user) => { return user.email === values.email })
                            let userdataMobile = users.find((user) => { return user.mobile === values.mobile })

                            if (userdataEmail && userdataMobile) {
                                alert('Please use different email and mobile number.');
                            } else if (userdataEmail) {
                                alert('Please use different email.');
                            } else if (userdataMobile) {
                                alert('Please use different mobile number.');
                            } else {
                                try {
                                    await axios.post('https://test-server-qs1n.onrender.com/users', values);
                                    console.log('register Mui values =', values)
                                    alert('Registration successful!');
                                    navigate('/login');
                                } catch (error) {
                                    console.error('Error registering user:', error);
                                }
                            }
                        }}
                    >
                        {
                            ({ setFieldValue, errors, touched }) => {
                                return <Form>
                                    <Grid container spacing={2}>
                                        
                                        <Grid item xs={12} sm={6}>
                                            <label className='form-label' htmlFor="name">Name</label>
                                            <Field
                                                name="name"
                                                as={TextField}
                                                // label=" Name"
                                                placeholder='Enter Your Name '
                                                fullWidth
                                                error={errors.name && touched.name}
                                                helperText={(errors.name && touched.name) && errors.name}
                                            />
                                            {/* <ErrorMessage name="name" component="div" className="text-danger" /> */}
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                        <label className='form-label' htmlFor="email">Email</label>
                                            
                                            <Field
                                                name="email"
                                                as={TextField}
                                                // label="Email"
                                                fullWidth
                                                placeholder='Enter Your Email '
                                                error={errors.email && touched.email}
                                                helperText={(errors.email && touched.email) && errors.email}
                                            />
                                            {/* <ErrorMessage name="email" component="div" className="text-danger" /> */}
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                        <label className='form-label' htmlFor="password">Password</label>

                                            <Field
                                                name="password"
                                                as={TextField}
                                                type="password"
                                                // label="Password"
                                                placeholder='Enter Your Password '
                                                fullWidth
                                                error={errors.password && touched.password}
                                                helperText={(errors.password && touched.password) && errors.password}
                                            />
                                            {/* <ErrorMessage name="password" component="div" className="text-danger" /> */}
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                        <label className='form-label' htmlFor="mobile">Mobile</label>

                                            <Field
                                                name="mobile"
                                                as={TextField}
                                                // label="Mobile"
                                                fullWidth
                                                placeholder='Enter Your Mobile number '
                                                error={errors.mobile && touched.mobile}
                                                helperText={(errors.mobile && touched.mobile) && errors.mobile}

                                            />
                                            {/* <ErrorMessage name="mobile" component="div" className="text-danger" /> */}
                                        </Grid>

                                        <Grid item xs={12}>
                                        <label className='form-label ' htmlFor="profile">Profile Photo</label>

                                            <Field
                                                name="profile"
                                                type="file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];

                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            setImagePreview(reader.result);
                                                            setFieldValue('profile', reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } else {
                                                        setImagePreview(null);

                                                    }

                                                }}
                                                component={TextField}
                                                // label="Upload Profile"
                                                fullWidth

                                                error={errors.profile && touched.profile}
                                                helperText={(errors.profile && touched.profile) && errors.profile}


                                            />
                                        </Grid>

                                        {imagePreview && (
                                            <Grid item xs={12}>
                                                <CardMedia
                                                    component="img"
                                                    image={imagePreview}
                                                    alt="Profile Preview"
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </Grid>
                                        )}

                                        <Grid item xs={12}>
                                            <Button type="submit" size='large' fullWidth variant="contained" color="primary">
                                                Register
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            }
                        }
                    </Formik>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default RegisterMui;
