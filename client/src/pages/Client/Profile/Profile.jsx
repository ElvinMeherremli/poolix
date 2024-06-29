import { FloatingLabel } from "flowbite-react";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { UserApi } from "../../../context/ContextApi";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Profile.scss";
import { AppContext } from '../../../context/AppContext'; // Import the AppContext

function Profile() {
  const { UserApiData } = useContext(UserApi);
  const { triggerRerender } = useContext(AppContext); // Use the AppContext
  const [openModal1, setOpenModal1] = useState(false);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    if (sessionUser) {
      setUserData(JSON.parse(sessionUser));
    } else if (localUser) {
      setUserData(JSON.parse(localUser));
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    username: Yup.string().required("Username is required"),
    fullname: Yup.string().required("Full Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: UserData?.email || "",
      password: "",
      username: UserData?.username || "",
      fullname: UserData?.fullname || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedValues = {};

        if (values.email) updatedValues.email = values.email;
        if (values.password) updatedValues.password = values.password;
        if (values.username) updatedValues.username = values.username;
        if (values.fullname) updatedValues.fullname = values.fullname;

        const response = await axios.patch(`http://localhost:1212/api/users/${UserData?._id}`, updatedValues);

        const updatedUserData = response.data.data;

        if (sessionStorage.getItem("user")) {
          sessionStorage.setItem("user", JSON.stringify(updatedUserData));
        }

        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(updatedUserData));
        }

        setUserData(updatedUserData);
        setOpenModal1(false);

        triggerRerender();
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    },
  });

  return (
    <div className="Profile-section">
      <div className="container">
        <div className="wrapper">
          <div className="card pt-[140px]">
            <div className="image">
              <div className="circle">
                <img
                  src={UserData?.img}
                  alt=""
                />
              </div>
            </div>
            <div className="content">
              <h2 className="username">{UserData?.username}</h2>
              <h2 className="fullname">{UserData?.fullname}</h2>
              <div className="change_password-button h-[100%]">
                <button
                  className="mt-20 d-block ml-auto inner-modal-btn"
                  onClick={() => setOpenModal1(true)}
                >
                  Change Login Details
                  <span></span>
                </button>
                <Modal
                  style={{ fontFamily: "inter" }}
                  dismissible
                  show={openModal1}
                  onClose={() => setOpenModal1(false)}
                >
                  <Modal.Header className="modal-title">
                    Enter the data you want to update
                  </Modal.Header>
                  <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                      <div className="flex flex-col space-x-4">
                        <FloatingLabel
                          variant="standard"
                          name="username"
                          className="username-input  mt-2 px-2"
                          label="Username"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div style={{fontSize: 10, color: 'red', fontFamily: 'inter'}} className="error">{formik.errors.username}</div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <FloatingLabel
                          variant="standard"
                          name="fullname"
                          className="fullname-input  mt-2 px-2"
                          label="Full Name"
                          onChange={formik.handleChange}
                          value={formik.values.fullname}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                          <div style={{fontSize: 10, color: 'red', fontFamily: 'inter'}} className="error">{formik.errors.fullname}</div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <FloatingLabel
                          variant="standard"
                          name="email"
                          type="email"
                          className="email-input  mt-2 px-2"
                          label="Email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div style={{fontSize: 10, color: 'red', fontFamily: 'inter'}} className="error">{formik.errors.email}</div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <FloatingLabel
                          variant="standard"
                          name="password"
                          type="password"
                          className="password-input  mt-2 px-2"
                          label="Password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div style={{fontSize: 10, color: 'red', fontFamily: 'inter'}} className="error">{formik.errors.password}</div>
                        ) : null}
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
                        onClick={() => setOpenModal1(false)}
                      >
                        Decline
                        <span></span>
                      </button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cart mb-[-100px] text-center">
          <h1>cart section</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
