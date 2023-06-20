import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";


const Users = () => {

  const { user } = useAuth();

  const userId = user._id;

  const [users, setUsers] = useState();

  const getUsers = async () => {
    const { data } = await usersService.getAllUsers();
    setUsers(data);
  };

  useEffect(() => {

    getUsers()
  }, []);

  const handleToggleUser = async (_id) => {
    const res = usersService.toggleUserPermissions(_id)
    res.then(response => {
      toast.success(`The user ${response.data.name} became a admin`)
      getUsers();
    })
      .catch(err => toast.error(err))
  }

  const renderUsers = users?.map((user) => {
    return (
      <tbody key={user._id}>
        <tr className="text-center">
          <th className="">{userId === user._id ? <div title="connected now" className="connectNow"></div> : <div></div>}</th>
          <th scope="row">{user._id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{JSON.stringify(user.biz)}</td>
          {!user.biz ? <td><button className="btn btn-none rounded" onClick={() => handleToggleUser(user._id)} title="make this user admin"><i className="bi bi-android2"></i></button></td> : <td></td>}
        </tr>
      </tbody>

    )
  })


  return (
    <>
      <PageHeader
        title="Users"
        description="All users registered in the system are in the table below. You can turn a regular user into an administrator and only regular users can be deleted"
        note="Note that when you delete a user, all their cards will also be deleted for the deleted user"
      />

      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Connect Now</th>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Is Admin</th>
            <th scope="col">Make Admin</th>
          </tr>
        </thead>
        {renderUsers}

      </table>




    </>
  );

};

export default Users;
