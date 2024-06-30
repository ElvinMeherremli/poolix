import { Collapse } from "antd";
import "./Content.scss";
import { useContext, useState } from "react";
import { ServiceApi } from "../../../../../../context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneLength = phoneNumber.length;

  if (phoneLength < 4) return phoneNumber;
  if (phoneLength < 6)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    5
  )}-${phoneNumber.slice(5, 7)}`;
};

const cleanPhoneNumber = (value) => value.replace(/[^\d]/g, "");

const phoneRegExp = /^[0-9]{7}$/;

function Content({ serverData }) {
  const [formattedPhone, setFormattedPhone] = useState("");

  const navigate = useNavigate();
  const { serviceApiData } = useContext(ServiceApi);
  console.log(serviceApiData);
  const text = `Lorem ipsum dolor sit amet consectetur. Consequat morbi hendrerit cursus nullam urna mauris nisl phasellus sollicitudin sollicitudin amet libero in accumsan urna interdum viverra et ultrices faucibus pulvinar fermentum.`;
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

  const items = [
    {
      key: "1",
      label: "Support in environmental enrichment programs",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Assisting the animals with the veterinarian",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "Construction of natural structures for animals",
      children: <p>{text}</p>,
    },
  ];

  return (
    <div className="Content_serviceDeteail-section">
      {serverData && (
        <div className="container max-w-[1320px]">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <img className="title-img" src={serverData.img} alt="" />
              <h2 className="title">{serverData.title}</h2>
              <p className="descr">{serverData.descr}</p>
              <div className="image-collection">
                {serverData.imageCollection.map((img) => (
                  <img src={img} alt="" />
                ))}
              </div>
              <div className="benefits-insection">
                <h2 className="benefits-title">Benefits of Service</h2>
                <p className="benefits-descr">
                  {serverData.benefits.descrBenefits}
                </p>
                <ul>
                  <li>
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "#ff5c00", marginRight: 10 }}
                    ></i>
                    Olympic Size Pool
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "#ff5c00", marginRight: 10 }}
                    ></i>
                    Food & Drinks Service
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "#ff5c00", marginRight: 10 }}
                    ></i>
                    Relax Atmosphere
                  </li>
                </ul>
              </div>
              <div className="solutions-insection">
                <h2 className="solutions-title title">Our Solutions</h2>
                <p className="solutions-descr descr">
                  {serverData.solutions.descrSolutions}
                </p>
              </div>
              <div className="dedication-insection">
                <h2 className="dedication-title title">
                  We Help You with the Dedication
                </h2>
                <Collapse accordion items={items} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="all_services-card">
                <h2 className="card-title">All Services</h2>
                <div className="wrapper">
                  <ul>
                    {serviceApiData &&
                      serviceApiData.map((elem) => (
                        <li className="mt-3">
                          <button
                            className="perexod"
                            onClick={() => {
                              navigate(`service-detail/${elem._id}`);
                              setTimeout(() => {
                                navigate(`service-detail/${elem._id}`);
                              }, 0);
                            }}
                          >
                            <i
                              className="fa-solid fa-arrow-right"
                              style={{ color: "white", marginRight: 10 }}
                            ></i>
                            <p>{elem.title}</p>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="ask_question-card">
                <h2 className="card-title">Ask Question</h2>
                <div className="wrapper">
                  <form onSubmit={formik.handleSubmit}>
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
                    <br />
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
                    <br />
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
                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="error ml-[94px]">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    <br />
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
                    <button type="submit" className="inner-btn">
                      Send Message <span></span>
                    </button>
                  </form>
                </div>
              </div>
              <div className="help-card">
                <h2 className="card-title">
                  Do You <br /> Need Any <span>Help?</span>
                </h2>
                <div className="line"></div>
                <ul className="info-list">
                  <li>
                    <span>Call Us Now:</span>
                    <h3>
                      <i className="fa-solid fa-phone"></i>
                      <a href="tel:913336660021">(+91) 333 666 0021</a>
                    </h3>
                  </li>
                  <li>
                    <span>Talk To Us:</span>
                    <h3>
                      <i className="fa-regular fa-envelope-open"></i>
                      <a href="mailto:example@info.com">example@info.com</a>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
export default Content;
