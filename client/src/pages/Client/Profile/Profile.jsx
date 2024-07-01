import { useContext, useState, useEffect } from "react";
import { UserApi } from "../../../context/ContextApi";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDropzone } from "react-dropzone";
import "./Profile.scss";
import { AppContext } from "../../../context/AppContext";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Helmet } from "react-helmet";

function Profile() {
  const { UserApiData } = useContext(UserApi);
  const { triggerRerender } = useContext(AppContext);
  const [openModal1, setOpenModal1] = useState(false);
  const [UserData, setUserData] = useState(null);
  const [draggedImage, setDraggedImage] = useState(null); // State to store dragged image URL
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    if (sessionUser) {
      setUserData(JSON.parse(sessionUser));
    } else if (localUser) {
      setUserData(JSON.parse(localUser));
    } else {
      // Redirect to login if user data is not found
      navigate("/login");
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    username: Yup.string().required("Username is required"),
    fullname: Yup.string().required("Full Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: UserData?.email || "",
      password: UserData?.password || "",
      username: UserData?.username || "",
      fullname: UserData?.fullname || "",
      img: "", // Initialize img field
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedValues = { ...values }; // Clone values object

        // If draggedImage has a value, update img field with base64 data
        if (draggedImage) {
          updatedValues.img = draggedImage;
        }

        const response = await axios.patch(
          `http://localhost:1212/api/users/${UserData?._id}`,
          updatedValues
        );

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

  // Setup the react-dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/gif", // Accept only these image formats
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Assuming only one file is dropped

      // Use FileReader to read file as base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        setDraggedImage(base64Data); // Set state with base64 data
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div className="Profile-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="wrapper">
          <div className="card pt-[140px]">
            <div className="image">
              <div className="circle">
                <img src={UserData?.img} alt="" />
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
                  style={{ fontFamily: "inter", marginTop: 30 }}
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
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="username"
                          className="username-input  mt-2 px-2"
                          label="Username"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div
                            style={{
                              fontSize: 10,
                              color: "red",
                              fontFamily: "inter",
                            }}
                            className="error"
                          >
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="fullname"
                          className="fullname-input  mt-2 px-2"
                          label="Full Name"
                          onChange={formik.handleChange}
                          value={formik.values.fullname}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                          <div
                            style={{
                              fontSize: 10,
                              color: "red",
                              fontFamily: "inter",
                            }}
                            className="error"
                          >
                            {formik.errors.fullname}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="email"
                          type="email"
                          className="email-input  mt-2 px-2"
                          label="Email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div
                            style={{
                              fontSize: 10,
                              color: "red",
                              fontFamily: "inter",
                            }}
                            className="error"
                          >
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-x-4 mt-2">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="password"
                          type="password"
                          className="password-input  mt-2 px-2"
                          label="Password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div
                            style={{
                              fontSize: 10,
                              color: "red",
                              fontFamily: "inter",
                            }}
                            className="error"
                          >
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                      <div className="drag_zone flex gap-3">
                        <div
                          className="drag_drop_profile w-[100%]"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files (Images only)
                          </p>
                        </div>
                        <div className="drag_img w-[200px] mt-[20px]">
                          {draggedImage && (
                            <img src={draggedImage} alt="Dropped" />
                          )}
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <button className="update-modal-btn" type="submit">
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
      {/* <div className="container">
        <div className="cart mb-[-100px] text-center">
          <h1>Cart Section</h1>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {UserApiData &&
            UserApiData.busket &&
            UserApiData.busket.length > 0 ? (
              UserApiData.busket.map((elem) => (
                <SwiperSlide key={elem._id}>
                  <div className="basket-item">
                    <img src={elem.img} alt={elem.productName} />
                    <h3>{elem.productName}</h3>
                    <p>Price: ${elem.price}</p>
                    <p>Count: {elem.count}</p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </Swiper>
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
