import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.scss";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="Footer-section">
      <div className="transition">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#003a57"
            fill-opacity="1"
            d="M0,288L48,282.7C96,277,192,267,288,240C384,213,480,171,576,170.7C672,171,768,213,864,208C960,203,1056,149,1152,154.7C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <footer>
        <div className="container max-w-[1320px]">
          <div className="wrapper-top">
            <div className="logo">
              <img
                src="https://html.tonatheme.com/2023/poolix/assets/images/logo-light.png"
                alt=""
              />
            </div>
            <div className="in-wrapper-top">
              <div className="dashes">
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-5.png"
                  alt=""
                />
              </div>
              <div className="umbrella">
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-6.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="wrapper-center">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <h3 className="title">About Us</h3>
                <div className="descr">
                  Mauris pretium adipiscing tempus urna amet nisi massa cras
                  laoreet pellentesque vitae fermentum arcu.
                </div>
                <div className="socials">
                  <div className="circle">
                    <FaFacebookF />
                  </div>
                  <div className="circle">
                    <FaTwitter />
                  </div>
                  <div className="circle">
                    <FaLinkedinIn />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <h3 className="title">Links</h3>
                <ul className="links">
                  <li>
                    <Link to={'/about'}>About Us</Link>
                  </li>
                  <li>
                    <Link to={'/services'}>Services</Link>
                  </li>
                  <li>
                    <Link to={'/contact'}>Contact</Link>
                  </li>
                  <li>
                    <Link to={'/shop'}>Shop</Link>
                  </li>
                  <li>
                    <Link to={'pricing'}>Pricing</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="title">Working Hours</h3>
                <p className="descr">
                  Tincidunt neque pretium lectus donec risus.
                </p>
                <p className="work-days descr">
                  Mon - Fri: 9:00AM - 6:00PM <br /> Sat - Sun: 8:00AM - 4:00PM
                </p>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="title">Get In Touch</h3>
                <p className="descr">
                  Massa cras laoreet pellenteque vitae fermentum arcu.
                </p>
                <ul className="contact-data">
                  <li>Add: New Hyde Park, NY 11040</li>
                  <li>
                    Email:{" "}
                    <a href="mailto: example@poolix.com">example@poolix.com</a>
                  </li>
                  <li>
                    Phone: <a href="tel: 3336660000">333 666 0000</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
