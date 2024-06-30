import { useFormik } from "formik";
import * as Yup from "yup";
import "./GetInTouch.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneLength = phoneNumber.length;

  if (phoneLength < 4) return phoneNumber;
  if (phoneLength < 6) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5, 7)}`;
};

const cleanPhoneNumber = (value) => value.replace(/[^\d]/g, "");

const phoneRegExp = /^[0-9]{7}$/;

function GetInTouch() {
  const [formattedPhone, setFormattedPhone] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      phonePrefix: "050",
      phone: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      name: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formattedValues = {
          ...values,
          phone: `${values.phonePrefix}${values.phone}`,
        };
        await axios.post("http://localhost:1212/api/feedback", formattedValues);
        toast.success("Message sent successfully!");
        resetForm();
        setFormattedPhone("");
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
      }
    },
  });

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleanedValue = cleanPhoneNumber(value);
    setFormattedPhone(formatPhoneNumber(cleanedValue));
    formik.setFieldValue("phone", cleanedValue);
  };

  return (
    <div className="GetInTouch-contact_section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Get In Touch</p>
        <h2 className="title">Get in Touch with Poolix</h2>
        <div className="outer">
          <div className="vector-1">
            <img
              src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-22.png"
              alt=""
            />
          </div>
          <div className="form-inner">
            <form onSubmit={formik.handleSubmit}>
              <div className="row gap-y-7">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type="text"
                    className="name"
                    name="name"
                    placeholder="Your Name"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    name="email"
                    placeholder="Your email"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="phone-input flex gap-2">
                    <select
                      onChange={formik.handleChange}
                      value={formik.values.phonePrefix}
                      name="phonePrefix"
                      className="phone-prefix"
                    >
                      <option value="050">050</option>
                      <option value="051">051</option>
                      <option value="055">055</option>
                      <option value="070">070</option>
                      <option value="077">077</option>
                      <option value="010">010</option>
                      <option value="099">099</option>
                    </select>
                    <input
                      onChange={handlePhoneChange}
                      value={formattedPhone}
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      className="phone-number"
                      onBlur={formik.handleBlur}
                    />
                    {/* Скрытое поле для хранения значения без дефисов */}
                    <input
                      type="hidden"
                      name="phone"
                      value={formik.values.phone}
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error ml-[94px]">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <textarea
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    placeholder="Message"
                    name="message"
                    style={{ height: 150 }}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div className="error">{formik.errors.message}</div>
                  ) : null}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <button className="inner-btn" type="submit">
                    SEND MESSAGE <span></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="vector-2">
            <img
              src="https://html.tonatheme.com/2023/poolix/assets/images/shape/vector-3.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default GetInTouch;
