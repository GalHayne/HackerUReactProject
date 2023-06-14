import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Users = () => {

  const [users, setUsers] = useState();

  const navigate = useNavigate();

  const getUsers = async () => {
    const { data } = await usersService.getAllUsers();
    setUsers(data);
  };

  useEffect(() => {

    getUsers()
  }, []);

  const handleDeleteUser = async (_id) => {
    const res = await axios.delete(`http://localhost:3900/api/users/${_id}`)
    getUsers();
  }

  const handleToggleUser = async (_id) => {
    const res = await axios.put(`http://localhost:3900/api/users/${_id}`)
    getUsers();
  }

  const renderUsers = users?.map((user) => {
    return (
      <tbody key={user._id}>
        <tr className="text-center">
          <th scope="row">{user._id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{JSON.stringify(user.biz)}</td>
          {!user.biz ? <td><button className="btn btn-none rounded" onClick={() => handleToggleUser(user._id)} title="make this user admin"><i className="bi bi-android2"></i></button></td> : <td></td>}
          {!user.biz ? <td><button className="btn btn-none rounded" onClick={() => handleDeleteUser(user._id)} title="delete this user"><i className="bi bi-person-dash-fill"></i></ button></td> : <td></td>}
        </tr>
      </tbody>

    )
  })


  return (
    <>
      <PageHeader
        title="Users"
        description="your users are in the table below"
      />

      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">business</th>
            <th scope="col">Make Admin</th>
            <th scope="col">Delete User</th>
          </tr>
        </thead>
        {renderUsers}

      </table>




    </>
  );

};

export default Users;
