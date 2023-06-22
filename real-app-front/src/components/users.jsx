import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import useDarkContext from "../hooks/useDarkModa-context";

const Users = () => {

  const { user } = useAuth();

  const { theme } = useDarkContext();

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

  const handleRemoveBlock = async (_id) => {
    const res = usersService.removeBlock(_id)
    res.then(response => {
      toast.success(`The ${response.data.name} has been unblocked`)
      getUsers();
    })
    .catch(err => toast.error(err))
  }

  let tableMode = (theme === 'dark') ? 'light' : 'dark'

  const renderUsers = users?.map((user) => {
    return (
      <tbody key={user._id}>
        <tr className="text-center">
          <th>{userId === user._id ? <div title="connected now" className={`connectNow ${theme}`}></div> : <div></div>}</th>
          <th scope="row">{user._id}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{JSON.stringify(user.biz)}</td>
          {!user.biz ? <td><button className="btn btn-none rounded" onClick={() => handleToggleUser(user._id)} title="make this user admin"><i className="bi bi-people-fill"></i></button></td> : <td></td>}
          {user.block ? <td><button className="btn btn-none rounded" onClick={() => handleRemoveBlock(user._id)} title="delete the block from user"><i className="bi bi-shield-fill-x"></i></button></td> : <td></td>}
        </tr>
      </tbody>

    )
  })


  return (
    <>
      <PageHeader
        title="Users"
        description="In the table below you can see all the users registered to the site, you can see which users have administrator privileges.
        Additionally, you can give a regular user admin privileges by clicking Make Admin on the user you want to give admin privileges"
      />

      <table className={`table table-${tableMode} table-striped`}>
        <thead>
          <tr className="text-center">
            <th>Connect Now</th>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Is Admin</th>
            <th scope="col">Make Admin</th>
            <th scope="col">Remove Block</th>
          </tr>
        </thead>
        {renderUsers}
      </table>
    </>
  );
};

export default Users;
