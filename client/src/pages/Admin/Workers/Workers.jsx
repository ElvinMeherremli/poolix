import { BiSolidEdit } from "react-icons/bi";
import { TiUserDelete } from "react-icons/ti";
import { Button } from "flowbite-react";
import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import pica from "pica";
import placeholderImage from "../../../../public/img/placeholder.jpg";
import "./Workers.scss";
import { WorkerApi } from "../../../context/ContextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";

const resizeImage = async (file, maxWidth, maxHeight) => {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  const picaInstance = pica();
  await picaInstance.resize(img, canvas);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
      },
      "image/jpeg",
      0.5
    );
  });
};

function Workers() {
  const navigate = useNavigate();
  const { WorkerApiData, setWorkerApiData } = useContext(WorkerApi);
  const [base64Image, setBase64Image] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(placeholderImage);
        const imageBlob = await response.blob();
        const resizedBase64String = await resizeImage(imageBlob, 300, 300); // Adjust size as needed
        setBase64Image(resizedBase64String);
        formik.setFieldValue("img", resizedBase64String); // Set formik value on initial load
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      toast.error("Access denied: Admins only");
      navigate("/admin");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      img: base64Image,
      name: "",
      position: "",
      descr: "",
      instagram: "",
      twitter: "",
      facebook: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:1212/api/workers",
          values
        );
        setWorkerApiData([...WorkerApiData, response.data]); // Update context with new worker
        formik.resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error("Error adding worker:", error);
      }
    },
    enableReinitialize: true, // Allow reinitialization of form values when base64Image changes
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const resizedBase64String = await resizeImage(file, 300, 300); // Resize the uploaded image
    setBase64Image(resizedBase64String);
    formik.setFieldValue("img", resizedBase64String);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    const resizedBase64String = await resizeImage(file, 300, 300); // Resize the dropped image
    setBase64Image(resizedBase64String);
    formik.setFieldValue("img", resizedBase64String);
  };

  const handleDeleteWorker = (workerId) => {
    axios
      .delete(`http://localhost:1212/api/workers/${workerId}`)
      .then(() => {
        setWorkerApiData(
          WorkerApiData.filter((worker) => worker._id !== workerId)
        ); // Update context by filtering out the deleted worker
      })
      .catch((error) => {
        console.error("Error deleting worker:", error);
      });
  };

  const generateSocialLink = (username, platform) => {
    switch (platform) {
      case "instagram":
        return `https://www.instagram.com/${username}`;
      case "twitter":
        return `https://twitter.com/${username}`;
      case "facebook":
        return `https://www.facebook.com/${username}`;
      default:
        return "";
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="Workers_admin-section">
      <div className="container max-w-[1320px]">
        <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
          Add Workers
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex justify-center items-center gap-2 flex-col"
        >
          {/* Drag and drop area */}
          <div
            className={`w-[270px] border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-300 ${
              dragOver ? "border-[#ff5c02]" : "border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-500" style={{ fontFamily: "inter" }}>
              Drag & Drop image here
            </p>
          </div>
          {/* Actual file input, hidden */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="wrapper flex gap-3">
            <div className="inputs-group flex flex-col gap-2">
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Position"
                variant="outlined"
                name="position"
                onChange={formik.handleChange}
                value={formik.values.position}
              />
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="descr"
                onChange={formik.handleChange}
                value={formik.values.descr}
              />
            </div>
            <div className="inputs-group flex flex-col gap-2">
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
                name="instagram"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Twitter"
                variant="outlined"
                name="twitter"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
              <TextField
                className="w-[270px]"
                color="success"
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
                name="facebook"
                onChange={formik.handleChange}
                value={formik.values.facebook}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{ fontFamily: "inter" }}
            className="inner-btn mt-2 border py-2 px-3"
          >
            Upload
            <span></span>
          </button>
        </form>
      </div>
      <div className="container max-w-[1320px]">
        <div className="wrapper">
          <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
            Workers Table
          </h2>
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Position</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Instagram</Table.HeadCell>
                <Table.HeadCell>Twitter</Table.HeadCell>
                <Table.HeadCell>Facebook</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Delete</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {WorkerApiData
                  ? WorkerApiData.map((elem) => (
                      <Table.Row
                        key={elem._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="w-[150px]">
                          {" "}
                          <img
                            className="w-[100px] h-[100px]"
                            style={{ objectFit: "contain" }}
                            src={elem.img}
                            alt=""
                          />{" "}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {elem.name}
                        </Table.Cell>
                        <Table.Cell>{elem.position}</Table.Cell>
                        <Table.Cell>{elem.descr}</Table.Cell>
                        <Table.Cell className="max-w-[50px]">
                          {elem.instagram && (
                            <a
                            className="flex justify-center"
                              href={generateSocialLink(
                                elem.instagram,
                                "instagram"
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaInstagram style={{fontSize: 30}} />
                            </a>
                          )}
                        </Table.Cell>
                        <Table.Cell className="max-w-[50px]">
                          {elem.twitter && (
                            <a
                            className="flex justify-center"
                              href={generateSocialLink(elem.twitter, "twitter")}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaTwitter style={{fontSize: 30}}/>

                            </a>
                          )}
                        </Table.Cell>
                        <Table.Cell className="max-w-[50px]">
                          {elem.facebook && (
                            <a
                            className="flex justify-center"
                              href={generateSocialLink(
                                elem.facebook,
                                "facebook"
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IoLogoFacebook style={{fontSize: 30}}/>

                            </a>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Button className="px-1" color="warning">
                            <BiSolidEdit style={{ fontSize: 20 }} />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            className="px-1"
                            color="failure"
                            onClick={() => handleDeleteWorker(elem._id)}
                          >
                            <TiUserDelete style={{ fontSize: 20 }} />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  : ""}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Workers;
