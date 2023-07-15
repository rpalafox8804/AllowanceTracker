import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditChore = () => {
    const { id } = useParams()
    const [choreState, setChoreState] = useState({ childAssigned: "", title: "", adultAssigned: "", choreAllowanceValue: 0, note: "" })
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setChoreState({
            ...choreState,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/chores/${id}`, choreState)
            .then((res) => {
                console.log(res.data)
                navigate("/dashboard")
            })
            .catch((err) => {
                setErrors(err.response.data.errors)
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/chores/${id}`)
            .then((res) => {
                console.log(res.data)
                setChoreState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const [childState, setChildState] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/child")
            .then((res) => {
                setChildState(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const [adultState, setAdultState] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/adult")
            .then((res) => {
                setAdultState(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const deleteHandler = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/chores/${id}`)
            .then((res) => {
                console.log(res.data)
                navigate("/dashboard")
            })
            .catch((err) => {
                console.log(err)
            })
    }




    return (
        <div>
            <div className='row'>
                <h1>Edit Chore</h1>
                <div className='m-4'>
                    <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
                </div>
                {errors.childAssigned ? <p className="text-danger">{errors.childAssigned.message}</p> : ""}
              {errors.title ? <p className="text-danger">{errors.title.message}</p> : ""}
              {errors.choreAllowanceValue ? <p className="text-danger">{errors.choreAllowanceValue.message}</p> : ""}
              {errors.adultAssigned ? <p className="text-danger">{errors.adultAssigned.message}</p> : ""}
              {errors.note ? <p className="text-danger">{errors.note.message}</p> : ""}
            </div>
            <form className='col-4 mx-auto d-flex flex-column gap-4 p-4' onSubmit={submitHandler}>
                <div className='form-group'>
                    <label className='mx-4'> Child to be assigned:

                        <select name="childAssigned" onChange={inputHandler} value={choreState.childAssigned} >
                            <option value="">Select Child</option>
                            {
                                childState.map((child, idx) => (
                                    <option key={idx} value={child._id}>{child.firstName}</option>
                                ))

                            }
                        </select>
                    </label>

                </div>
                <div className='form-group'>
                    <label className='mx-4'>Chore Name:</label>
                    <input type="text" name="title" onChange={inputHandler} value={choreState.title} />
                </div>
                <div className='form-group'>
                    <label className='mx-4'>Allowance</label>
                    <input type="number" name="choreAllowanceValue" onChange={inputHandler} value={choreState.choreAllowanceValue} />
                </div>
                <div className='form-group'>
                    <label className='mx-4'> Parent:

                        <select name="adultAssigned" onChange={inputHandler} value={choreState.adultAssigned}>
                            <option value="">Select Parent</option>
                            {
                                adultState.map((adult, idx) => (
                                    <option key={idx} value={adult._id}>{adult.firstName} - {adult._id}</option>
                                ))

                            }
                        </select>
                    </label>
                    <div className='form-group'>
                        <label className='mx-4'> Notes:</label>
                        <textarea name="note" onChange={inputHandler} value={choreState.note} />
                    </div>
                </div>

                <div className='form-group'>
                    <input className='btn btn-primary btn-sm' type="submit" value="Update Chore" />
                </div>
            </form>

        </div>
    )
}

export default EditChore