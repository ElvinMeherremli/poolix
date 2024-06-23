import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./AddServices.scss"; // Ensure you have the appropriate styles
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
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:1212/api/services", values);
        toast.success("Successfully added service!");
        setServiceApiData([...serviceApiData, response.data]); // Add new service to the list
        formik.resetForm(); // Reset the form after successful submission
      } catch (error) {
        toast.error("Failed to add service!");
        console.error(error);
      }
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

  const handleRemoveFile = () => {
    setFile(null);
    formik.setFieldValue("img", "");
  };

  const handleRemoveSolutionFile = (fileName) => {
    const updatedSolutionFiles = formik.values.imageCollection.filter(
      (file) => file.name !== fileName
    );
    formik.setFieldValue("imageCollection", updatedSolutionFiles);
  };

  const getFirstSentence = (text) => {
    const sentenceEnd = /[.!?]/;
    const match = sentenceEnd.exec(text);
    if (match) {
      return text.substring(0, match.index + 1);
    }
    return text;
  };

  return (
    <div className="AddServices-admin-section">
      <div className="container max-w-[1320px]">
        <div className="add-services">
          <h2 className="title text-center font-sans mt-16 font-bold text-4xl text-[#003E3C]">
            Add Services
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Form content */}
          </form>
        </div>
        <div className="table-services mt-20">
          <h2 className="title text-center font-sans mt-10 font-bold text-4xl text-[#003E3C]">
            Services Info
          </h2>
          <div className="container max-w-[1320px] mt-7">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Preview image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
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
                            onClick={async () => {
                              try {
                                await axios.delete(`http://localhost:1212/api/services/${elem._id}`);
                                toast.success("Successfully deleted!");
                                setServiceApiData(serviceApiData.filter((service) => service._id !== elem._id));
                              } catch (error) {
                                toast.error("Error deleting service!");
                                console.error(error);
                              }
                            }}
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
