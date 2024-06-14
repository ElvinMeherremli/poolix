import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import './ContactInfo.scss'
function ContactInfo() {
  return (
    <div className="ContactInfo-contact_section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Contact Info</p>
        <h2 className="title">Contact Information</h2>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="circle">
                <MdOutlinePhoneInTalk />
              </div>
              <h3 className="card-title">Phone Number</h3>
              <p className="descr">
                Emergency Cases <br />
                <a href="tel: 2085550112">+(208) 555-0112&nbsp;</a>
                (24/7)
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="circle">
                <HiOutlineMailOpen />
              </div>
              <h3 className="card-title">Email Address</h3>
              <p className="descr">
                <a href="mailto: contact@example.com">contact@example.com</a> <br />
                <a href="mailto: support@example.com">support@example.com</a>
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <div className="circle">
                <MdOutlineLocationOn />
              </div>
              <h3 className="card-title">Our Location</h3>
              <p className="descr">
                1901 Thornridge Cir. Shiloh, <br />
                Hawaii 81063
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactInfo;
