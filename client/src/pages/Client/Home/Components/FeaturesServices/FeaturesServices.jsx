import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GrSwim } from "react-icons/gr";
import { FiLifeBuoy } from "react-icons/fi";

import "./FeaturesServices.scss";

function FeaturesServices() {
  return (
    <div className="FeaturesServices-section flex justify-center">
      <div className="container">
        <p className="title-top">Features Services</p>
        <h2>
          Expert Swimming Pool <br />
          Maintenance
        </h2>
        <div className="row justify-center">
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="image">
                <img
                  className="card-image"
                  src="https://html.tonatheme.com/2023/poolix/assets/images/resource/feature-image-1.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4 className="content-title">Residential Pool Services</h4>
                <p className="content-descr">
                  Amet minim mollit no deserunt ulamco sit enim aliqua dolor
                  sint velit officia praesent maecenas senectus.
                </p>
                <div className="circle">
                  <LiaSwimmingPoolSolid />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="image">
                <img
                  className="card-image"
                  src="https://html.tonatheme.com/2023/poolix/assets/images/resource/feature-image-2.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4 className="content-title">Commercial Pool Services</h4>
                <p className="content-descr">
                  Amet minim mollit no deserunt ulamco sit enim aliqua dolor
                  sint velit officia praesent maecenas senectus.
                </p>
                <div className="circle">
                  <GrSwim />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="image">
                <img
                  className="card-image"
                  src="https://html.tonatheme.com/2023/poolix/assets/images/resource/feature-image-3.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h4 className="content-title">Get Support Directly</h4>
                <p className="content-descr">
                  Amet minim mollit no deserunt ulamco sit enim aliqua dolor
                  sint velit officia praesent maecenas senectus.
                </p>
                <div className="circle">
                  <FiLifeBuoy />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeaturesServices;
