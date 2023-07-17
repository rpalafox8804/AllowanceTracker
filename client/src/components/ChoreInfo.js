import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ChoreInfo = () => {
    // hold id from params
    const { id } = useParams()
    // hold choreState and setChoreState
    const [choreState, setChoreState] = useState([])
    const navigate = useNavigate();

    // get chore info from db
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

    // delete chore from db
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
        <div className='container'>
            {/* nav bar */}
            <div className='row  bg-info justify-content-around'>
                <div className='col-4'>
                    <h1 className='my-2'>Chore Info</h1>
                </div>
                <div className='col-4 d-flex justify-content-end'>
                    <div className='m-4 col d-flex justify-content-end'>
                        <div className=''>
                            <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* chore info */}
            <div className='row justify-content-around bg-warning'>
                <h2>Chore Title: {choreState.title}</h2>
                <h2>Assigned Child: {choreState.childAssigned}</h2>
                <h2>Chore Allowance Value: ${choreState.choreAllowanceValue} </h2>
                <h2>Chore Notes: {choreState.note} </h2>
            </div>
            <div className='row d-flex justify-content-around bg-warning'>
                <div className='col d-flex mx-3 justify-content-end'>
                    <Link to={`/dashboard/updateChore/${id}`} className='btn btn-sm btn-info'>Edit</Link>
                </div>
                <div className='col d-flex '>
                    <button className='btn btn-sm btn-danger' onClick={deleteHandler}>Delete</button>
                </div>
            </div>



        </div>
    )
}

export default ChoreInfo