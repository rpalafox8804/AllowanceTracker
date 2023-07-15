import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate();


    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
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
    const [userState, setUserState] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/adult")
            .then((res) => {
                console.log(res.data.users)
                setUserState(res.data.users)
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
    const deleteHandler = (id) => {
        const newList = userState.filter((user) => user._id !== id)
        setUserState(newList)
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container'>
            <div className='row d-flex justify-content-around bg-info'>
                <div className='col m-3'>
                    <h1>Dashboard</h1>
                </div>
                <div className='col d-flex justify-content-end m-3'>
                    <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
                    <Link to='/dashboard/newChore' className='btn btn-sm btn-warning mx-2 justify-content-center'>Add Chore</Link>

                </div>
            </div>
            <div className='row '>
                <div className='col'>
                    <table className='table table-striped table-bordered'>
                        <thead className='bg-primary'>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                userState.map((user, i) => {

                                    return (
                                        <tr key={i}>
                                            <td><Link to={`/dashboard/adult/${user._id}`}>{user.firstName} {user.lastName}</Link></td>
                                            <td>{user.age}</td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row '>
                <div className='col'>
                    <table className='table table-striped table-bordered'>
                        <thead className='bg-info'>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                childState.map((user, i) => {

                                    return (
                                        <tr key={i}>
                                            <td><Link to={`/dashboard/child/${user._id}`}>{user.firstName} {user.lastName}</Link></td>
                                            <td>{user.age}</td>
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

export default Dashboard