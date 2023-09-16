import React, { useEffect, useState } from 'react'
import Logout from '../../components/Logout'
import Navbar from '../../components/Navbar'
import { ADMIN } from '../redux/constants/admin';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.Users);

    useEffect(() => {
        try {
            dispatch({ type: ADMIN.FETCH_USERS_REQUEST });
            axios.get('http://localhost:5000/admin/api/dashboard').then(res => {
                const newData = res.data.filter(obj => obj.isAdmin !== true);
                console.log(newData);
                setUsers(newData)
                if (res.status == 200) {
                    dispatch({ type: ADMIN.FETCH_USERS_SUCCESS, payload: newData });
                } else {
                    dispatch({ type: ADMIN.FETCH_USERS_FAILED, error: res.error });
                }
            });
        } catch (err) {
            dispatch({ type: ADMIN.FETCH_USERS_FAILED, error: "error" });
        }
    }
        , []);
    const HandleDelete = (id) => {
        try {
            dispatch({ type: ADMIN.DELETE_USER_REQUEST })
            axios.post('http://localhost:5000/admin/api/delete-user', {
                id
            }).then(res => {
                if (res.status == 200) {
                    dispatch({ type: ADMIN.DELETE_USER_SUCCESS })
                    location.reload();
                } else {
                    dispatch({ type: ADMIN.DELETE_USER_FAILED })
                }
            })
        } catch (error) {
            dispatch({ type: ADMIN.DELETE_USER_FAILED })
        }
    }
    return (
        loading? <Loading />
        :
        <div>
            <Navbar />
            <div>
                <div className="create-btn-container">
                    <div className="inner-div">

                        <Link to={'/create-user'}>
                            <button className='create-user'> Create</button>
                        </Link>
                    </div>
                </div>
                <h2>USERS</h2>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>SL.NO</th>
                                <th>First Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((value, index, array) => {



                                    return (
                                        <tr key={value._id}>
                                            <td>{index + 1}</td>
                                            <td>{value.fullname}</td>
                                            <td>{value.username}</td>
                                            <td>{value.email}</td>
                                            <td>{value.address}</td>
                                            <td>{value.phone}</td>
                                            <td >
                                                <Link to={`/edit/${value._id}`} >
                                                    <button>Edit</button>
                                                </Link>

                                                <button onClick={() => HandleDelete(value._id)} className='btn1'>Delete</button>

                                            </td>

                                        </tr>
                                    )


                                })
                            }

                        </tbody >
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
