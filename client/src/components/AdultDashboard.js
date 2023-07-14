import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AdultDashboard = () => {
    const [choreState, setChoreState] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/chores")
            .then((res) => {
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
                console.log(res.data.users)
                setChildState(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [adultState, setAdultState] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/adult')
            .then((res) => {
                setAdultState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <div className='container'>
            <div className='row'>
                <h1>Adult</h1>
                <h3>Children:</h3>
            </div>
            <div className='row'>
                <div className='col'>
                    <table className='table table-striped table-bordered'>
                        <thead className='bg-primary'>
                            <tr>
                                <th>Name</th>
                                <th>Allowance</th>
                                <th>Number of Chores assigned</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userState.map((user, i) => {

                                    return (
                                        <tr key={i}>
                                            <td><Link to={`/dashbord/${user._id}`}>{user.firstName} {user.lastName}</Link></td>
                                            <td>chore allowance</td>
                                            <td>number of chores</td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default AdultDashboard