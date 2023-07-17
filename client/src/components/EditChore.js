import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditChore = () => {
    //allow the use of id from params
    const { id } = useParams()
    //hold state for chores
    const [choreState, setChoreState] = useState({ childAssigned: "", title: "", adultAssigned: "", choreAllowanceValue: 0, note: "" })
    //hold state for errors
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    //handle inputs in the form
    const inputHandler = (e) => {
        setChoreState({
            ...choreState,
            [e.target.name]: e.target.value
        })
    }
    //handle submitting the form
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
    //get chores from the database
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

    //hold state for children
    const [childState, setChildState] = useState([])
    //get children from the database
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/child")
            .then((res) => {
                setChildState(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    //hold state for adults
    const [adultState, setAdultState] = useState([])
    //get adults from the database
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/adult")
            .then((res) => {
                setAdultState(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    //delete a chore
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
    //logout function
    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='container bg-warning'>
            {/* nav bar */}
            <div className='row d-flex justify-content-around bg-info'>
                <div className='col m-3'>
                    <h1>Edit Chore</h1>
                </div>
                <div className='col d-flex justify-content-end m-3'>
                    <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
                    <Link to='/dashboard/newChore' className='btn btn-sm btn-warning mx-2 justify-content-center'>Add Chore</Link>

                </div>
                {/* display errors */}
                {errors.childAssigned ? <p className="text-danger fw-bold">{errors.childAssigned.message}</p> : ""}
                {errors.title ? <p className="text-danger fw-bold">{errors.title.message}</p> : ""}
                {errors.choreAllowanceValue ? <p className="text-danger fw-bold">{errors.choreAllowanceValue.message}</p> : ""}
                {errors.adultAssigned ? <p className="text-danger fw-bold">{errors.adultAssigned.message}</p> : ""}
                {errors.note ? <p className="text-danger fw-bold">{errors.note.message}</p> : ""}
            </div>
            {/* edit form */}
            <form className='col-4 mx-auto d-flex flex-column gap-4 p-4' onSubmit={submitHandler}>
                <div className='form-group'>
                    <label className='form-label'> Child to be assigned:

                        <select name="childAssigned" className="form-select" onChange={inputHandler} value={choreState.childAssigned} >
                            <option value="">Select Child</option>
                            {
                                childState.map((child, idx) => (
                                    <option key={idx} value={child.firstName}>{child.firstName}</option>
                                ))

                            }
                        </select>
                    </label>

                </div>
                <div className='form-group'>
                    <label className='form-label'>Chore Name:</label>
                    <input type="text" className="form-control" name="title" onChange={inputHandler} value={choreState.title} />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Allowance</label>
                    <input type="number" className="form-control" name="choreAllowanceValue" onChange={inputHandler} value={choreState.choreAllowanceValue} />
                </div>
                <div className='form-group'>
                    <label className='form-label'> Parent:

                        <select name="adultAssigned" className="form-select" onChange={inputHandler} value={choreState.adultAssigned}>
                            <option value="">Select Parent</option>
                            {
                                adultState.map((adult, idx) => (
                                    <option key={idx} value={adult._id}>{adult.firstName}</option>
                                ))

                            }
                        </select>
                    </label>
                    <div className='form-group'>
                        <label className='form-label'> Notes:</label>
                        <textarea name="note" className="form-control" onChange={inputHandler} value={choreState.note} />
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