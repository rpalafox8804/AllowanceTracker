import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddChore = () => {
  const [state, setState] = useState({ childAssigned: "", title: "", adultAssigned: "", choreAllowanceValue: 0, note: "" });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/chores", state)
      .then((res) => {
        navigate("/dashboard")
      })
      .catch((err) => {
        console.log(err)
        setErrors(err.response.data.errors)

      })
  }
  const [choreState, setChoreState] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/chores")
      .then((res) => {
        setChoreState(res.data.chores)
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
      <div className='row d-flex justify-content-around bg-info'>
        <div className='col m-3'>
          <h1>Add a Chore</h1>
        </div>
        <div className='col d-flex justify-content-end m-4'>
          <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
          <button className='ms-3 btn btn-primary' onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className='col-4 mx-auto'>
        {errors.childAssigned ? <p className="text-danger fw-bold">{errors.childAssigned.message}</p> : ""}
        {errors.title ? <p className="text-danger fw-bold">{errors.title.message}</p> : ""}
        {errors.choreAllowanceValue ? <p className="text-danger fw-bold">{errors.choreAllowanceValue.message}</p> : ""}
        {errors.adultAssigned ? <p className="text-danger fw-bold">{errors.adultAssigned.message}</p> : ""}
        {errors.note ? <p className="text-danger fw-bold">{errors.note.message}</p> : ""}
      </div>
      <form className='col-4 mx-auto d-flex flex-column gap-4 p-4' onSubmit={submitHandler}>
        <div className='form-group'>
          <label className='form-label'> Child to be assigned:

            <select name="childAssigned" className="form-select" onChange={inputHandler} value={state.childAssigned} >
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
          <label className='form-label'>Chore Name:</label>
          <input type="text" className="form-control" name="title" onChange={inputHandler} value={state.title} />
        </div>
        <div className='form-group'>
          <label className='form-label'>Allowance</label>
          <input type="number" className="form-control" name="choreAllowanceValue" onChange={inputHandler} value={state.choreAllowanceValue} />
        </div>
        <div className='form-group'>
          <label className='form-label'> Parent:

            <select name="adultAssigned" className="form-select" onChange={inputHandler} value={state.adultAssigned}>
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
            <textarea name="note" className="form-control" onChange={inputHandler} value={state.note} />
          </div>
        </div>

        <div className='form-group'>
          <input className='btn btn-primary btn-sm' type="submit" value="Add Chore" />
        </div>
      </form>

    </div>
  )
}

export default AddChore