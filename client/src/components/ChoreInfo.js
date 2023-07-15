import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ChoreInfo = () => {
    const { id } = useParams()
    const [choreState, setChoreState] = useState([])
    const navigate = useNavigate();

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

    const deleteHandler = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/chores/${id}`)
            .then(res => {
                console.log(res.data)
                navigate('/dashboard')
            })
            .catch(err => console.log(err))
    }

  return (
    <div>
        <h1>Chore Info</h1>
        <div className='m-4'>
                        <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
                    </div>
        <h2>Chore Title: {choreState.title}</h2>
        <h2>Assigned Child: {choreState.childAssigned}</h2>
        <h2>Chore Allowance Value: ${choreState.choreAllowanceValue} </h2>
        <h2>Chore Notes: {choreState.note} </h2>
        <div className='m-4'>
        <Link to={`/dashboard/updateChore/${id}`} className='btn btn-sm btn-warning'>Edit</Link>
        </div>
        <button className='btn btn-sm btn-danger' onClick={deleteHandler}>Delete</button>


    </div>
  )
}

export default ChoreInfo