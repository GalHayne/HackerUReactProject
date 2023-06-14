import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";



const Users = () => {

  const [users, setUsers] = useState();


  useEffect(() => {
    const getUsers = async () => {
      const { data } = await usersService.getAllUsers();
      setUsers(data);
    };

    getUsers()
  }, []);

  const renderUsers = users?.map((user) => {
    return (
      <tbody key={user._id}>
        <tr className="text-center">
          <th scope="row">{user._id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{JSON.stringify(user.biz)}</td>
          {!user.biz && <td><button className="btn btn-primary text-light rounded border">🎓</button></td>}

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
          </tr>
        </thead>
        {renderUsers}

      </table>




    </>
  );

};

export default Users;
