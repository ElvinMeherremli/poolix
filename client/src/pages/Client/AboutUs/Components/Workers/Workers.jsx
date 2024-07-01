import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import "./Workers.scss";
import { useContext } from "react";
import { WorkerApi } from "../../../../../context/ContextApi";
function Workers() {
  const { WorkerApiData } = useContext(WorkerApi);
  return (
    <div className="Workers_about-section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Our Experts</p>
        <h2 className="title">
          Expert Swimming Pool Repair <br /> Team Member
        </h2>
        <div className="row">
          {WorkerApiData
            ? WorkerApiData.map((elem) => {
                return (
                  <div className="col-lg-3 col-md-6">
                    <div className="card">
                      <div className="image">
                        <img src={elem.img} alt="" />
                        <div className="share-icon">
                          <IoShareSocialSharp />
                        </div>
                        <div className="icon-area">
                          <ul>
                            <a
                              href={`https://www.instagram.com/${elem.instagram}`}
                            >
                              <li className="instagram-ico social-icon">
                                <FaInstagram />
                              </li>
                            </a>
                            <a href={`https://x.com/${elem.twitter}`}>
                              <li className="twitter-ico social-icon">
                                <FaTwitter />
                              </li>
                            </a>
                            <a
                              href={`https://www.facebook.com/${elem.facebook}`}
                            >
                              <li className="facebook-ico social-icon">
                                <FaFacebookF />
                              </li>
                            </a>
                          </ul>
                        </div>
                      </div>
                      <div className="content">
                        <h3 className="content-title">{elem.name}</h3>
                        <p className="content-worker-position">
                          {elem.position}
                        </p>
                        <p className="content-descr">{elem.descr}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
export default Workers;
