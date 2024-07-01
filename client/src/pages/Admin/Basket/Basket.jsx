import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import pica from "pica";
import "./Basket.scss";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Basket() {
  const [CartData, setCartData] = useState([]);
  const [file, setFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const fetchCartData = () => {
    axios.get("http://localhost:1212/api/cart").then((res) => {
      setCartData(res.data.data);
    });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const resizeImage = async (file) => {
    const picaInstance = pica();
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const resizedCanvas = document.createElement("canvas");

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;

        img.onload = async () => {
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);

          resizedCanvas.width = img.width / 2;
          resizedCanvas.height = img.height / 2;

          try {
            await picaInstance.resize(canvas, resizedCanvas);
            const resizedDataURL = resizedCanvas.toDataURL("image/jpeg", 0.7); // Adjust quality here
            resolve(resizedDataURL);
          } catch (error) {
            reject(error);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);

    try {
      const resizedImage = await resizeImage(file);
      formik.setFieldValue("img", resizedImage);
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: null,
      img: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
    }),
    onSubmit: (values, { resetForm }) => {
      axios.post("http://localhost:1212/api/cart", values).then(() => {
        fetchCartData();
        resetForm();
        setFile(null); // Clear the file state
      });
    },
  });

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1212/api/cart/${id}`)
      .then(() => {
        fetchCartData();
      })
      .catch((error) => {
        console.error("Failed to delete item", error);
      });
  };
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      toast.error("Access denied: Admins only");
      navigate("/admin");
    }
  }, [navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="Basket_admin-section">
      <div className="container max-w-[1320px]">
        <h2 className="title text-center mb-8 font-sans mt-16 font-bold text-4xl text-[#003E3C]">
          Add Item
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-[300px] mx-auto">
          <div className="form-field flex flex-col">
            <TextField
              id="productName"
              label="Product Name"
              name="productName"
              variant="outlined"
              color="success"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.productName && formik.errors.productName ? (
              <span className="error-message">{formik.errors.productName}</span>
            ) : null}
          </div>
          <div className="form-field flex flex-col">
            <TextField
              color="success"
              id="price"
              label="Price"
              name="price"
              variant="outlined"
              type="number"
              value={formik.values.price || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <span className="error-message">{formik.errors.price}</span>
            ) : null}
          </div>
          <div
            className={`drag_drop ${isDragActive ? "dragging" : ""}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <button type="submit" className="inner-btn">
            Add <span></span>
          </button>
        </form>
      </div>
      <div className="container max-w-[1320px] mt-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CartData.length > 0 ? (
                CartData.map((elem) => (
                  <tr
                    key={elem._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <img src={elem.img} className="w-[70px]" alt="" />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {elem.productName}
                    </th>
                    <td className="px-6 py-4">${elem.price}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(elem._id)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No items in the cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Basket;
