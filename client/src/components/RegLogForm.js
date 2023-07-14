import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react' 


const RegLogForm = () => {
    const navigate = useNavigate();

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
                
                navigate('/dashboard/adult')
            })
            .catch(err => console.log(err))
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
                axios.get("http://localhost:8000/api/users/" + res.data.user._id, { withCredentials: true })
                
                navigate('/dashboard/adult')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='container'>
            <div className=" row d-flex justify-content-between border-bottom border-5 my-2">
                <div className='m-3'>
                    <h1>Allowance Tracker</h1>
                    
                </div>
            </div>
            <div className='row'>
                <div className='col'>

                    <form action='' className='col-med-6 offset-1' onSubmit={submitHandler}>
                        <h3>Registration Form</h3>
                        <div className='form-group'>
                            <label className=''>First Name</label>
                            <input type="text" name="firstName" onChange={changeHandler} id="firstName" placeholder='First Name' />

                        </div>
                        <div className='form-group'>
                            <label className=''>Last Name</label>
                            <input type="text" name="lastName" onChange={changeHandler} id='lastName' placeholder='Last Name' />
                        </div>
                        <div className='form-group'>
                            <label className=''>Email</label>
                            <input type="text" name="email" onChange={changeHandler} id='email' placeholder='Email Address' />
                        </div>
                        <div className='form-group'>
                            <label className=''>Password</label>
                            <input type="password" name="password" onChange={changeHandler} id='password' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <label className=''>Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={changeHandler} id='confirmPassword' placeholder='Confirm Password' />
                        </div>
                        <div className='form-group'>
                            <label className=''>Age</label>
                            <input type="text" name="age" onChange={changeHandler} id='age' placeholder='Age' />

                        </div>
                        <div className='form-group'>
                            <input type="radio" id="typeOfAccount" name="typeOfAccount" onChange={changeHandler} value="Child" />
                            <label for="huey">Child</label>
                            <input type="radio" id="typeOfAccount" name="typeOfAccount" onChange={changeHandler} value="Adult" />
                            <label for="huey">Parent</label>
                        </div>

                        <button type='submit' className='btn btn-primary'>Register</button>

                    </form>
                </div>
                <div className='col'>
                    {/* Login Form */}
                    <form action='' className='col-med-5 offset-2' onSubmit={loginSubmitHandler}>
                        <h3>Login Form</h3>
                        <div className='form-group'>
                            <label className=''>Email</label>
                            <input type="text" name="email" onChange={loginChangeHandler} id='email' placeholder='Email Address' />
                        </div>

                        <div className='form-group'>
                            <label className=''>Password</label>
                            <input type="password" name="password" onChange={loginChangeHandler} id='password' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-info'>Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default RegLogForm