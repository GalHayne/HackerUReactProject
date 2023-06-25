import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import useDarkContext from "../hooks/useDarkModa-context";
import useModal from "../hooks/use-modal";
import Modal from "./common/Modal";
import DeleteCardsModal from "./DeleteCardsModal";

const Users = () => {
  const { user } = useAuth();

  const { theme } = useDarkContext();

  const [modalStatus, openModal, closeModal] = useModal();

  const userId = user._id;

  const [users, setUsers] = useState();

  const [userIdSelect, setUserIdSelect] = useState();

  const getUsers = async () => {
    const { data } = await usersService.getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleToggleUser = async (_id) => {
    try {
      await usersService.toggleUser(_id);
      toast.success(`User permissions have changed`);
      getUsers();
    } catch (err) {
      toast.err(err);
    }
  };

  const handleRemoveBlock = async (_id) => {
    const res = usersService.removeBlock(_id);
    res
      .then((response) => {
        toast.success(`The user: ${response.data.email} has been unblocked`);
        getUsers();
      })
      .catch((err) => toast.error(err));
  };

  const handleDeleteUser = async (_id) => {
    setUserIdSelect(_id);
    try {
      const res = await usersService.deleteUser(_id);
      if (res.status === 200) {
        handleDeleteUser(_id);
      } else {
        toast.success(`The user: ${res.data.email} has been deleted`);
        getUsers();
      }
    } catch (err) {
      if (err.response.status === 404) {
        openModal();
        toast.error(
          "The user have that him created please delete the cards before"
        );
      } else {
        console.log(
          "The user cannot be deleted because hte user have favorite card. remove the favorite card from the user",
          err.response.data
        );
        toast.error(
          "The user cannot be deleted because hte user have favorite card. remove the favorite card from the user"
        );
      }
    }
  };

  let tableMode = theme === "dark" ? "light" : "dark";

  const renderUsers = users?.map((user) => {
    let makeNoraml;

    if (!user.admin && user.biz) {
      makeNoraml = true;
    } else if (!user.admin && !user.biz) {
      makeNoraml = false;
    }

    return (
      <tbody key={user._id}>
        <tr className="text-center">
          <th>
            {userId === user._id ? (
              <div
                title="connected now"
                className={`connectNow ${theme}`}
              ></div>
            ) : (
              <div></div>
            )}
          </th>
          <td>{user?.name}</td>
          <td>{user?.email}</td>
          <td>{JSON.stringify(user?.admin)}</td>
          <td>
            {makeNoraml && !user.admin ? (
              <i
                title="make normal user"
                className="bi bi-person-fill"
                onClick={() => handleToggleUser(user._id)}
              ></i>
            ) : (
              ""
            )}
          </td>
          <td>
            {!makeNoraml && !user.admin ? (
              <i
                title="make business user"
                className="bi bi-people-fill"
                onClick={() => handleToggleUser(user._id)}
              ></i>
            ) : (
              ""
            )}
          </td>
          {user.block ? (
            <td>
              <button
                className="btn btn-none rounded"
                onClick={() => handleRemoveBlock(user?._id)}
                title="remove the block from user"
              >
                <i className="bi bi-shield-fill-x"></i>
              </button>
            </td>
          ) : (
            <td></td>
          )}
          {!user?.admin ? (
            <td>
              <button
                className="btn btn-none rounded"
                onClick={() => handleDeleteUser(user?._id)}
                title="delete the user"
              >
                <i className="bi bi-person-dash-fill"></i>
              </button>
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      </tbody>
    );
  });

  return (
    <>
      <PageHeader
        title="Users"
        description="In the table below you can see all the users registered to the site, you can see which users have administrator privileges.
        Additionally, you can give a regular user admin privileges by clicking Make Admin on the user you want to give admin privileges"
      />

      <table className={`my-5 table table-${tableMode} table-striped`}>
        <thead>
          <tr className="text-center">
            <th>Connect Now</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Is Admin</th>
            <th scope="col">Make Noraml User</th>
            <th scope="col">Make Business User</th>
            <th scope="col">Remove Block</th>
            <th scope="col">Delete User</th>
          </tr>
        </thead>
        {renderUsers}
      </table>
      <Modal modalStatus={modalStatus} onClose={closeModal}>
        <DeleteCardsModal
          onClose={closeModal}
          msg={"Note that this user has cards that he created:"}
          userIdSelect={userIdSelect}
        />
      </Modal>
    </>
  );
};

export default Users;
