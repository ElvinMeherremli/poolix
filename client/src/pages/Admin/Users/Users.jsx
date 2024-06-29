import { Button, FloatingLabel, Modal } from "flowbite-react";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserApi } from "../../../context/ContextApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import placeholderImage from "../../../../public/img/placeholder.jpg";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Users() {
  const formikUser = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      img: "", // Initialize img as null
      password: "",
      username: "",
      role: "client",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://localhost:1212/api/users`,
          values
        );
        setUserApiData((prevData) => [...prevData, response.data]);
        formikUser.resetForm();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  });

  const [userId, SetUserId] = useState();
  const formikUserEdit = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      img: "",
      password: "",
      username: "",
      role: "client",
    },
    onSubmit: async (values, elem) => {
      try {
        const response = await axios.patch(
          `http://localhost:1212/api/users/${id}`,
          values
        );
        setUserApiData((prevData) =>
          prevData.map((user) => (user._id === id ? response.data : user))
        );
        setOpenModalUser(false); // Закрываем модальное окно после успешного обновления
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  });
  console.log(userId);

  const formiAdmin = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      img: "https://static.vecteezy.com/system/resources/previews/015/665/684/original/man-with-the-inscription-admin-icon-outline-style-vector.jpg",
      password: "",
      username: "",
      role: "admin",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://localhost:1212/api/users`,
          values
        );
        setUserApiData((prevData) => [...prevData, response.data]);
        formikUser.resetForm();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  });

  //] MODAL
  const [openModalUser, setOpenModalUser] = useState(false);

  const [allImage, setAllImage] = useState(null);
  const { UserApiData, setUserApiData } = useContext(UserApi);
  const [clientPasswordVisibility, setClientPasswordVisibility] = useState({});
  const [adminPasswordVisibility, setAdminPasswordVisibility] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  if (!isAdmin) {
    return null;
  }
  const toggleClientPasswordVisibility = (id) => {
    setClientPasswordVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleAdminPasswordVisibility = (id) => {
    setAdminPasswordVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1212/api/users/${id}`);
      setUserApiData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="Users_admin-section">
      <div className="AddUser_admin-section">
        <div className="container max-w-[1320px]">
          <div className="row">
            <form
              onSubmit={formikUser.handleSubmit}
              className="add-user flex flex-col items-center col-lg-6 col-12"
            >
              <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
                Add Client
              </h2>
              <TextField
                className="w-[300px]"
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                onChange={formikUser.handleChange}
                value={formikUser.values.username}
                color="success"
              />
              <TextField
                type="password"
                className="w-[300px] mt-2"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={formikUser.handleChange}
                value={formikUser.values.password}
                color="success"
              />
              <TextField
                type="email"
                className="w-[300px] mt-2"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formikUser.handleChange}
                value={formikUser.values.email}
                color="success"
              />
              <TextField
                className="w-[300px] mt-2"
                id="fullname"
                name="fullname"
                label="Full Name"
                variant="outlined"
                onChange={formikUser.handleChange}
                value={formikUser.values.fullname}
                color="success"
              />
              {/* <input
                type="file"
                onChange={onInputChange}
                className="mt-2"
              />{" "} */}
              <br />
              <button type="submit" className="inner-btn border py-2 px-3">
                Upload
                <span></span>
              </button>
            </form>

            <form
              onSubmit={formiAdmin.handleSubmit}
              className="add-admin flex flex-col items-center col-lg-6 col-12"
            >
              <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
                Add Admin
              </h2>
              <TextField
                className="w-[300px]"
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                onChange={formiAdmin.handleChange}
                value={formiAdmin.values.username}
                color="success"
              />
              <TextField
                type="password"
                className="w-[300px] mt-2"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={formiAdmin.handleChange}
                value={formiAdmin.values.password}
                color="success"
              />
              <br />
              <button type="submit" className="inner-btn border py-2 px-3">
                Upload
                <span></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="UserTable_admin-section">
        <h2 className="title text-center mb-3 font-sans mt-20 font-bold text-4xl text-[#003E3C]">
          Clients Table
        </h2>
        <div className="container max-w-[1320px] mt-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Profile Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {UserApiData
                  ? UserApiData.filter((user) => user.role === "client").map(
                      (elem) => (
                        <tr
                          key={elem._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={elem.img || placeholderImage}
                              alt={elem.username}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                e.target.src = placeholderImage;
                              }}
                            />
                          </td>
                          <td className="px-6 py-4">{elem.username}</td>
                          <td className="px-6 py-4">{elem.email}</td>
                          <td className="px-6 py-4 flex items-center">
                            {clientPasswordVisibility[elem._id]
                              ? elem.password
                              : "••••••••"}
                            <button
                              onClick={() =>
                                toggleClientPasswordVisibility(elem._id)
                              }
                              className="ml-2"
                            >
                              {clientPasswordVisibility[elem._id] ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">{elem.fullname}</td>
                          <td className="px-6 py-4">
                            <Button
                              color="failure"
                              outline
                              onClick={() => deleteUser(elem._id)}
                            >
                              <TiUserDeleteOutline />
                            </Button>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => setOpenModalUser(true)}
                              color="warning"
                              outline
                            >
                              <LiaUserEditSolid />
                            </Button>
                            <Modal
                              style={{ fontFamily: "inter" }}
                              dismissible
                              show={openModalUser}
                              onClose={() => setOpenModalUser(false)}
                            >
                              <Modal.Header className="modal-title">
                                Enter the data you want to update
                              </Modal.Header>
                              <form
                                onSubmit={() =>
                                  formikUserEdit.handleSubmit(elem._id)
                                }
                              >
                                <Modal.Body>
                                  <div className="grid grid-flow-col justify-stretch space-x-4">
                                    <FloatingLabel
                                      onChange={formikUserEdit.handleChange}
                                      value={formikUserEdit.values.username}
                                      variant="standard"
                                      name="username"
                                      className="username-input"
                                      label="Username"
                                    />
                                  </div>
                                  <div className="grid grid-flow-col justify-stretch space-x-4 mt-2">
                                    <FloatingLabel
                                      onChange={formikUserEdit.handleChange}
                                      value={formikUserEdit.values.fullname}
                                      variant="standard"
                                      name="fullname"
                                      className="fullname-input"
                                      label="Full Name"
                                    />
                                  </div>
                                  <div className="grid grid-flow-col justify-stretch space-x-4 mt-2">
                                    <FloatingLabel
                                      onChange={formikUserEdit.handleChange}
                                      value={formikUserEdit.values.email}
                                      variant="standard"
                                      name="email"
                                      type="email"
                                      className="email-input"
                                      label="Email"
                                    />
                                  </div>
                                  <div className="grid grid-flow-col justify-stretch space-x-4 mt-2">
                                    <FloatingLabel
                                      onChange={formikUserEdit.handleChange}
                                      value={formikUserEdit.values.password}
                                      variant="standard"
                                      name="password"
                                      type="password"
                                      className="password-input"
                                      label="Password"
                                    />
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <button
                                    className="update-modal-btn"
                                    type="submit"
                                  >
                                    Update
                                    <span></span>
                                  </button>
                                  <button
                                    className="decline-modal-btn"
                                    type="button"
                                    color="gray"
                                    onClick={() => {
                                      SetUserId(elem._id); // Установите userId для использования в форме
                                      setOpenModalUser(false); // Закрыть модальное окно
                                    }}
                                  >
                                    Decline
                                    <span></span>
                                  </button>
                                </Modal.Footer>
                              </form>
                            </Modal>
                          </td>
                        </tr>
                      )
                    )
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="AdminTable_admin-section">
        <h2 className="title text-center mb-3 font-sans mt-20 font-bold text-4xl text-[#003E3C]">
          Admins Table
        </h2>
        <div className="container max-w-[1320px] mt-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Profile Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {UserApiData
                  ? UserApiData.filter((user) => user.role === "admin").map(
                      (elem) => (
                        <tr
                          key={elem._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={elem.img}
                              alt={elem.username}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                e.target.src = placeholderImage;
                              }}
                            />
                          </td>
                          <td className="px-6 py-4">{elem.username}</td>
                          <td className="px-6 py-4 flex items-center">
                            {adminPasswordVisibility[elem._id]
                              ? elem.password
                              : "••••••••"}
                            <button
                              onClick={() =>
                                toggleAdminPasswordVisibility(elem._id)
                              }
                              className="ml-2"
                            >
                              {adminPasswordVisibility[elem._id] ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">Administrator</td>
                          <td className="px-6 py-4">
                            <Button
                              color="failure"
                              outline
                              onClick={() => deleteUser(elem._id)}
                            >
                              <TiUserDeleteOutline />
                            </Button>
                          </td>
                          <td className="px-6 py-4">
                            <Button color="warning" outline>
                              <LiaUserEditSolid />
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Users;
