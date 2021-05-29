import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUser,
  getAllUser,
  updateStatus,
  updateUser,
  setLoading,
} from "../redux/UserData/userDataAction";
import { Icon } from "@iconify/react";
import status from "@iconify/icons-mdi/account-reactivate-outline";
import remove from "@iconify/icons-mdi/account-remove-outline";
import Logout from "./Logout";
import UpdateModal from "./UpdateModal";
import Loader from "react-loader-spinner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const loading = useSelector((state) => state.userData.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllUser()).then((users) => {
      dispatch(setLoading(false));
      setUsers(users.data);
    });
  }, [dispatch]);

  const handleStatus = (id, index) => {
    dispatch(updateStatus(id, !users[index].status));
    setUsers(
      users.map((user, i) =>
        i === index ? { ...user, status: !user.status } : user
      )
    );
  };
  const handleDelete = (id, index) => {
    console.log(id);
    dispatch(deleteUser(id));
    setUsers([...users].filter((user) => user._id !== id));
  };
  const handleUpdate = (id, index, updatedDetails) => {
    const tempUsers = [...users];
    tempUsers[index].name = updatedDetails.name;
    tempUsers[index].email = updatedDetails.email;
    tempUsers[index].contact = updatedDetails.contact;
    setUsers(tempUsers);
    dispatch(
      updateUser(
        id,
        updatedDetails.name,
        updatedDetails.email,
        updatedDetails.contact
      )
    );
  };
  return (
    <>
      <div className="text-center">
        <h1>Admin Dashboard</h1>
        <Link to="/signup">
          <button className="btn btn-warning">Add User</button>
        </Link>
        &nbsp;
        <Logout />
      </div>
      {console.log(users)}
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <table className="table caption-top table-success">
            <caption>List of users</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">DOB</th>
                <th scope="col">Username</th>
                <th scope="col">Action</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {loading && (
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            )}
            <tbody>
              {users.length > 0 &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <th
                      className={!user.status ? "bg-dark text-light" : " "}
                      scope="row"
                    >
                      {index + 1}
                    </th>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      {user.name}
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      {user.email}
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      {user.contact}
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      {user.dob}
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      {user.username}
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : " "}>
                      <UpdateModal
                        user={user}
                        index={index}
                        handleUpdate={handleUpdate}
                      />

                      <Icon
                        icon={remove}
                        height="30px"
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(user._id, index)}
                      />
                      <Icon
                        icon={status}
                        height="30px"
                        className="mx-1"
                        onClick={() => handleStatus(user._id, index)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td className={!user.status ? "bg-dark text-light" : ""}>
                      {user.status ? <>A</> : <>D</>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
};

export default AdminDashboard;
