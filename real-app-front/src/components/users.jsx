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
    return <div key={user._id}>
      <ul>
        <li> {JSON.stringify(user.biz)}</li>
        <li>{user.createdAt}</li>
        <li>{user.email}</li>
        <li>{user.name}</li>
      </ul>
    </div>
  })


  return (
    <>
      <PageHeader
        title="Users"
        description="your users are in the table below"
      />
      {renderUsers}

    </>
  );

};

export default Users;
