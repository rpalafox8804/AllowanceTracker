import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react' 


const RegLogForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [loginErrors, setLoginErrors] = useState("");

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        typeOfAccount: "",
    })

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", userInfo, { withCredentials: true })

            .then(res => {
                console.log(res.data)
                
                navigate('/dashboard')
            })
            .catch((err) => {
                setErrors(err.response.data.errors)
                console.log(err)
            })
    }
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })
    const loginChangeHandler = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }
    const loginSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                // axios.get("http://localhost:8000/api/users/" + res.data.user._id, { withCredentials: true })
                
                navigate('/dashboard')
            })
            
            .catch((err)=>{
                console.log(err.response.data)
                setLoginErrors(err.response.data)
                
              })
            }


    return (
        <div className='container bg-warning'>
            <div className=" row d-flex justify-content-between border-bottom border-5 my-2 bg-info">
                <div className='m-3 '>
                    <h1>Allowance Tracker</h1>
                    
                </div>
            </div>
            <div className='row'>
                <div className='col d-flex flex-column-end justify-content-center bd-highlight mb-2'>

                    <form action='' className='col-med-6 offset-1 ' onSubmit={submitHandler}>
                        <h3>Registration Form</h3>
                        <div className='form-group'>
                            <label className=''>First Name</label>
                            <input type="text" className = "form-control" name="firstName" onChange={changeHandler} id="firstName" placeholder='First Name' />
                            {errors.firstName ? <p className='text-danger fw-bold'>{errors.firstName.message}</p> : ""}
                        </div>
                        <div className='form-group'>
                            <label className=''>Last Name</label>
                            <input type="text" className = "form-control" name="lastName" onChange={changeHandler} id='lastName' placeholder='Last Name' />
                            {errors.lastName ? <p className='text-danger fw-bold'>{errors.lastName.message}</p> : ""}
                        </div>
                        <div className='form-group'>
                            <label className=''>Email</label>
                            <input type="text" className = "form-control" name="email" onChange={changeHandler} id='email' placeholder='Email Address' />
                            {errors.email ? <p className='text-danger fw-bold'>{errors.email.message}</p> : ""}
                        </div>
                        <div className='form-group'>
                            <label className=''>Password</label>
                            <input type="password" className = "form-control" name="password" onChange={changeHandler} id='password' placeholder='Password' />
                            {errors.password ? <p className='text-danger fw-bold'>{errors.password.message}</p> : ""}
                        </div>
                        <div className='form-group'>
                            <label className=''>Confirm Password</label>
                            <input type="password" className = "form-control" name="confirmPassword" onChange={changeHandler} id='confirmPassword' placeholder='Confirm Password' />
                            {errors.confirmPassword ? <p className='text-danger fw-bold'>{errors.confirmPassword.message}</p> : ""}
                        </div>
                        <div className='form-group'>
                            <label className=''>Age</label>
                            <input type="text" className = "form-control" name="age" onChange={changeHandler} id='age' placeholder='Age' />
                            {errors.age ? <p className='text-danger fw-bold'>{errors.age.message}</p> : ""}

                        </div>
                        <div className='form-group m-3'>
                            <input type="radio" className='form-check-input m-1' id="typeOfAccount" name="typeOfAccount" onChange={changeHandler} value="Child" />
                            <label className='form-check-label'>Child</label>
                            <input type="radio" className='form-check-input ms-5 mb-3' id="typeOfAccount" name="typeOfAccount" onChange={changeHandler} value="Adult" />
                            <label className='form-check-label'>Parent</label>
                            {errors.typeOfAccount ? <p className='text-danger fw-bold'>{errors.typeOfAccount.message}</p> : ""}
                        </div>

                        <button type='submit' className='btn btn-primary'>Register</button>

                    </form>
                </div>
                <div className='col d-flex flex-column-end justify-content-start bd-highlight mb-2'>
                    {/* Login Form */}
                    <form action='' className='col-med-5 offset-2' onSubmit={loginSubmitHandler}>
                        <h3>Login Form</h3>
                        <div className='form-group'>
                            {loginErrors ? <p className='text-danger fw-bold'>{loginErrors.msg}</p> : ""}
                            <label className=''>Email</label>
                            <input type="text"  className = "form-control" name="email" onChange={loginChangeHandler} id='email' placeholder='Email Address' />
                        </div>

                        <div className='form-group'>
                            <label className=''>Password</label>
                            <input type="password" className = "form-control"  name="password" onChange={loginChangeHandler} id='password' placeholder='Password' />


                        </div>
                        <div className='form-group m-2'>
                            <button type='submit' className='btn btn-info'>Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default RegLogForm