import { Collapse } from "antd";
import "./Content.scss";
import { useContext } from "react";
import { ServiceApi } from "../../../../../../context/ContextApi";
import { useNavigate } from "react-router-dom";
function Content({ serverData }) {
  const navigate = useNavigate();
  const { serviceApiData } = useContext(ServiceApi);
  console.log(serviceApiData);
  const text = `Lorem ipsum dolor sit amet consectetur. Consequat morbi hendrerit cursus nullam urna mauris nisl phasellus sollicitudin sollicitudin amet libero in accumsan urna interdum viverra et ultrices faucibus pulvinar fermentum.`;

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
                  {serverData.benefits.benefitsArray &&
                    serverData.benefits.benefitsArray.map((elem) => (
                      <li>
                        <i
                          class="fa-solid fa-check"
                          style={{ color: "#ff5c00", marginRight: 10 }}
                        ></i>
                        {elem}
                      </li>
                    ))}
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
                              class="fa-solid fa-arrow-right"
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
                  <form>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required=""
                    />{" "}
                    <br />
                    <input
                      type="email"
                      name="email"
                      placeholder="e-mail address"
                      required=""
                    />{" "}
                    <br />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      required=""
                    />{" "}
                    <br />
                    <textarea
                      name="message"
                      placeholder="Your message"
                    ></textarea>
                    <button className="inner-btn">
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
                <ul class="info-list">
                  <li>
                    <span>Call Us Now:</span>
                    <h3>
                      <i class="fa-solid fa-phone"></i>
                      <a href="tel:913336660021">(+91) 333 666 0021</a>
                    </h3>
                  </li>
                  <li>
                    <span>Talk To Us:</span>
                    <h3>
                      <i class="fa-regular fa-envelope-open"></i>
                      <a href="mailto:example@info.com">example@info.com</a>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Content;
