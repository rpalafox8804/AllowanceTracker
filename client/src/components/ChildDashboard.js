import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const ChildDashboard = () => {
  // hold id and firstName from params
  const { id } = useParams()
  const { firstName } = useParams()
  const navigate = useNavigate();

  // hold childState and setChildState
  const [childState, setChildState] = useState([])
  //get user information by id
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/id/${id}`)
      .then((res) => {
        setChildState(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //hold state for chores
  const [choreState, setChoreState] = useState([])
  //get chores by child name
  useEffect(() => {
    const fetchData = async  () => {
      try {
      const res = await axios.get(`http://localhost:8000/api/chores/child/${firstName}`)
      setChoreState(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  fetchData()
  }, [])


      


  return (
    <div className='container'>
      {/* nav bar */}
      <div className='row justify-content-around bg-info'>
        <div className='col'>
          <h2>{childState.firstName}'s Dashboard</h2>
          <h3>Chores:</h3>
        </div>
        <div className='col d-flex justify-content-end'>
          <div className='m-4'>
            <Link to='/dashboard' className='btn btn-sm btn-primary'>Main Dashboard</Link>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {/* table for chores assigned */}
          <table className='table table-striped'>
            <thead className='bg-primary'>
              <tr>
                <th>Chore</th>
                <th>Chore Allowance</th>
                <th>Chore Note</th>
              </tr>
            </thead>
            <tbody>
              {
                choreState.map((chore, i) => {
                  return (
                    <tr key={i}>
                      {console.log(i)}
                      <td><Link to={`/dashboard/readChore/${chore._id}`}>{chore.title}</Link></td>
                      <td>${chore.choreAllowanceValue}</td>
                      <td>{chore.note}</td>
                    </tr>
                  )
                })



              }
            </tbody>
          </table>
        </div>
      </div>
      <div className='m-4'>
        <Link to='/dashboard/newChore' className='btn btn-sm btn-info'>Add Chore</Link>
      </div>

    </div>

  )
}

export default ChildDashboard