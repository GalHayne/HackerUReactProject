import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import useDarkContext from "../hooks/useDarkModa-context";
import useModal from "../hooks/use-modal";
import Modal from "./common/Modal";
import DeleteCardsModal from "./DeleteCardsModal";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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
      <Tbody key={user._id}>
        <Tr className="text-center">
          <Th>
            {userId === user._id ? (
              <div
                title="connected now"
                className={`connectNow ${theme}`}
              ></div>
            ) : (
              <div></div>
            )}
          </Th>
          <Td>{user?.name}</Td>
          <Td>{user?.email}</Td>
          <Td>{JSON.stringify(user?.admin)}</Td>
          <Td>
            {makeNoraml && !user.admin ? (
              <i
                title="make normal user"
                className="bi bi-person-fill"
                onClick={() => handleToggleUser(user._id)}
              ></i>
            ) : (
              ""
            )}
          </Td>
          <Td>
            {!makeNoraml && !user.admin ? (
              <i
                title="make business user"
                className="bi bi-people-fill"
                onClick={() => handleToggleUser(user._id)}
              ></i>
            ) : (
              ""
            )}
          </Td>
          {user.block ? (
            <Td>
              <button
                className="btn btn-none rounded"
                onClick={() => handleRemoveBlock(user?._id)}
                title="remove the block from user"
              >
                <i className="bi bi-shield-fill-x"></i>
              </button>
            </Td>
          ) : (
            <Td></Td>
          )}
          {!user?.admin ? (
            <Td>
              <button
                className="btn btn-none rounded"
                onClick={() => handleDeleteUser(user?._id)}
                title="delete the user"
              >
                <i className="bi bi-person-dash-fill"></i>
              </button>
            </Td>
          ) : (
            <Td></Td>
          )}
        </Tr>
      </Tbody>
    );
  });
  return (
    <>
      <PageHeader
        title="Users"
        description="In the table below you can see all the users registered to the site and you can see their permissions. In addition, you can turn a normal user into a business user, a business user into a normal user, unblock a blocked user and delete a user."
      />
      <Table className={`my-5 table table-${tableMode} table-striped`}>
        <Thead>
          <Tr className="text-center">
            <Th>Connect Now</Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Email</Th>
            <Th scope="col">Is Admin</Th>
            <Th scope="col">Make Noraml User</Th>
            <Th scope="col">Make Business User</Th>
            <Th scope="col">Remove Block</Th>
            <Th scope="col">Delete User</Th>
          </Tr>
        </Thead>
        {renderUsers}
      </Table>
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
