import React, { useContext, useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import Textarea from "@mui/joy/Textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ServiceApi } from "../../../context/ContextApi";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  descr: Yup.string().required("Description is required"),
  img: Yup.string().required("Preview image is required"),
  benefits: Yup.object().shape({
    descrBenefits: Yup.string().required("Benefits description is required"),
  }),
  solutions: Yup.object().shape({
    descrSolutions: Yup.string().required("Solutions description is required"),
  }),
  imageCollection: Yup.array().min(1, "Image collection is required"),
});

function AddServices() {
  const { serviceApiData, setServiceApiData } = useContext(ServiceApi);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

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
      title: "",
      descr: "",
      img: "",
      benefits: {
        descrBenefits: "",
      },
      solutions: {
        descrSolutions: "",
      },
      imageCollection: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post("http://localhost:1212/api/services", values)
        .then((response) => {
          setServiceApiData([...serviceApiData, response.data]);
          toast.success("Successfully added!");
        })
        .catch((error) => {
          toast.error("Failed to add service.");
          console.error("Error adding service:", error);
        });
    },
  });

  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/heif": [".heif"],
    },
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      setFile(
        Object.assign(newFile, { preview: URL.createObjectURL(newFile) })
      );
      formik.setFieldValue("img", newFile.preview);
    },
  });

  const {
    getRootProps: getSolutionRootProps,
    getInputProps: getSolutionInputProps,
    isDragActive: isSolutionDragActive,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/heif": [".heif"],
    },
    onDrop: (acceptedFiles) => {
      const updatedSolutionFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      formik.setFieldValue("imageCollection", [
        ...formik.values.imageCollection,
        ...updatedSolutionFiles,
      ]);
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
    formik.setFieldValue("img", "");
  };

  function getFirstSentence(text) {
    const sentenceEnd = /[.!?]/;
    const match = sentenceEnd.exec(text);
    if (match) {
      return text.substring(0, match.index + 1);
    }
    return text;
  }

  const handleRemoveSolutionFile = (fileName) => {
    const updatedSolutionFiles = formik.values.imageCollection.filter(
      (file) => file.name !== fileName
    );
    formik.setFieldValue("imageCollection", updatedSolutionFiles);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1212/api/services/${id}`)
      .then(() => {
        setServiceApiData(serviceApiData.filter(item => item._id !== id));
        toast.success("Successfully deleted!");
      })
      .catch((error) => {
        toast.error("Failed to delete service.");
        console.error("Error deleting service:", error);
      });
  };

  useEffect(() => {

  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="AddServices-admin-section">
      <div className="container max-w-[1320px]">
        <div className="add-services">
          <h2 className="title text-center font-sans mt-16 font-bold text-4xl text-[#003E3C]">
            Add Services
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-center flex-row gap-10 mt-2">
              <div className="unit">
                <TextField
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  variant="outlined"
                  className="w-[300px] mt-3"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                />
                <br />
                <span
                  style={{
                    color: "#D3302F",
                    fontSize: 12,
                    fontFamily: "roboto",
                    marginLeft: 10,
                  }}
                >
                  {formik.touched.title && formik.errors.title}
                </span>
                <Textarea
                  color="neutral"
                  disabled={false}
                  minRows={2}
                  placeholder="Description"
                  size="lg"
                  variant="outlined"
                  name="descr"
                  className="w-[300px] mt-1"
                  onChange={formik.handleChange}
                  value={formik.values.descr}
                  error={formik.touched.descr && Boolean(formik.errors.descr)}
                />
                <span
                  style={{
                    color: "#D3302F",
                    fontSize: 12,
                    fontFamily: "roboto",
                    marginLeft: 10,
                  }}
                >
                  {formik.touched.descr && formik.errors.descr}
                </span>
                <div
                  {...getRootProps()}
                  className={`dropzone mt-1 p-4 border-dashed border-2 rounded w-[300px] mx-auto ${
                    isDragActive ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the preview image</p>
                  ) : (
                    <p>
                      Drag & drop a{" "}
                      <span style={{ color: "#FF5C02", fontFamily: "inter" }}>
                        preview image
                      </span>
                      , or click to select a file
                    </p>
                  )}
                </div>
                {formik.touched.img && formik.errors.img && (
                  <p className="text-red-500">{formik.errors.img}</p>
                )}
                {file && (
                  <div className="relative p-2 mt-4">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-32 w-32 object-cover mx-auto"
                    />
                    <IconButton
                      className="absolute top-0 right-0"
                      onClick={handleRemoveFile}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </div>
                )}
              </div>
              <div className="unit">
                <div className="benefits-input mt-3 flex max-w-[300px] gap-2">
                  <h3
                    style={{ fontFamily: "inter", color: "#003E3C" }}
                    className="mt-1 font-medium"
                  >
                    Benefits:
                  </h3>
                  <div className="area">
                    <Textarea
                      color="neutral"
                      disabled={false}
                      minRows={2}
                      placeholder="Benefits Description"
                      size="md"
                      variant="outlined"
                      name="benefits.descrBenefits"
                      className="mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.benefits.descrBenefits}
                      error={
                        formik.touched.benefits?.descrBenefits &&
                        Boolean(formik.errors.benefits?.descrBenefits)
                      }
                    />
                    <span
                      style={{
                        color: "#D3302F",
                        fontSize: 12,
                        fontFamily: "roboto",
                        marginLeft: 10,
                      }}
                    >
                      {formik.touched.benefits?.descrBenefits &&
                        formik.errors.benefits?.descrBenefits}
                    </span>
                  </div>
                </div>
                <div className="solutions-input flex max-w-[300px] gap-2">
                  <h3
                    style={{ fontFamily: "inter", color: "#003E3C" }}
                    className="mt-1 font-medium"
                  >
                    Solutions:
                  </h3>
                  <div className="area">
                    <Textarea
                      color="neutral"
                      disabled={false}
                      minRows={2}
                      placeholder="Solutions Description"
                      size="md"
                      variant="outlined"
                      name="solutions.descrSolutions"
                      className="mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.solutions.descrSolutions}
                      error={
                        formik.touched.solutions?.descrSolutions &&
                        Boolean(formik.errors.solutions?.descrSolutions)
                      }
                    />
                    <span
                      style={{
                        color: "#D3302F",
                        fontSize: 12,
                        fontFamily: "roboto",
                        marginLeft: 10,
                      }}
                    >
                      {formik.touched.solutions?.descrSolutions &&
                        formik.errors.solutions?.descrSolutions}
                    </span>
                  </div>
                </div>
                <div
                  {...getSolutionRootProps()}
                  className={`dropzone mt-[15px] p-4 border-dashed border-2 rounded w-[300px] mx-auto ${
                    isSolutionDragActive
                      ? "border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  <input {...getSolutionInputProps()} />
                  {isSolutionDragActive ? (
                    <p>Drop the Image Collection here...</p>
                  ) : (
                    <p>
                      Drag & drop{" "}
                      <span style={{ color: "#FF5C02", fontFamily: "inter" }}>
                        image collection
                      </span>
                      , or click to select files
                    </p>
                  )}
                </div>
                {formik.touched.imageCollection &&
                  formik.errors.imageCollection && (
                    <p className="text-red-500">
                      {formik.errors.imageCollection}
                    </p>
                  )}
                <div className="flex flex-wrap mt-4 w-[300px]">
                  {formik.values.imageCollection.map((file) => (
                    <div key={file.name} className="relative p-2">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-32 w-32 object-cover"
                      />
                      <IconButton
                        className="absolute top-0 right-0"
                        onClick={() => handleRemoveSolutionFile(file.name)}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              variant="contained"
              color="primary"
              className="inner-a-btn mt-2 d-block mx-auto"
            >
              Add
              <span></span>
            </button>
          </form>
        </div>
        <div
          className="table-services mt-20"
          style={{ borderTop: "1px solid #00000020" }}
        >
          <h2 className="title text-center font-sans mt-10 font-bold text-4xl text-[#003E3C]">
            Services Info
          </h2>
          <div className="container max-w-[1320px] mt-7">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      preview image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      descr
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {serviceApiData &&
                    serviceApiData.map((elem) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={elem._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img src={elem.img} className="w-[150px]" alt="" />
                        </th>
                        <td className="px-6 py-4">{elem.title}</td>
                        <td className="px-6 py-4">
                          {getFirstSentence(elem.descr)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(elem._id)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddServices;
