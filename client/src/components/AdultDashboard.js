import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// Dashboard for the Adult User
const AdultDashboard = () => {
    const { id } = useParams()
    const [choreState, setChoreState] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/chores/adult/${id}`)
            .then((res) => {
                console.log(res)
                setChoreState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

//hold state of the adult user
    const [adultState, setAdultState] = useState([])
//get the adult user by id
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/id/${id}`)
            .then((res) => {
                setAdultState(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    //delete a chore
    const deleteHandler = (choreId) => {
        const newList = choreState.filter((chore) => chore._id !== choreId)
        setChoreState(newList)
        axios.delete(`http://localhost:8000/api/chores/${choreId}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container'>
            {/* Nav bar area */}
            <div className='row justify-content-around bg-info'>
                <div className='col'>
                    <h2>{adultState.firstName} {adultState.lastName} Dashboard</h2>
                    <h3>Kids Chores:</h3>
                </div>
                <div className='col d-flex justify-content-end'>
                    <div className='m-4'>
                        <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
                    </div>
                </div>
            </div>
            {/* Table area */}
            <div className='row'>
                <div className='col'>
                    <table className='table table-striped table-bordered'>
                        <thead className='bg-primary'>
                            <tr>
                                <th>Name of Chore</th>
                                <th>Child Name</th>
                                <th>Chore Allowance</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        {/* map through and show chores that the adult assigned */}
                        <tbody>
                            {

                                choreState.map((chore, i) => {

                                    return (
                                        <tr key={i}>
                                            <td><Link to={`/dashboard/readChore/${chore._id}`}>{chore.title}</Link></td>
                                            <td>{chore.childAssigned}</td>
                                            
                                            <td>${chore.choreAllowanceValue}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => deleteHandler(chore._id)}>Delete</button>
                                                <Link to={`/dashboard/updateChore/${chore._id}`} className='btn btn-sm btn-primary ms-2'>Update Chore</Link>

                                            </td>


                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='m-4'>
                        <Link to='/dashboard/newChore' className='btn btn-sm btn-info'>Add Chore</Link>
                    </div>
            </div>

        </div>
    )
}

export default AdultDashboard