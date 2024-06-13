import AffordablePricing from '../../../../../../public/svg/Why Choose Affordable Pricing.svg'
import ExperiencedTeam from '../../../../../../public/svg/Why Choose Experienced Team.svg'
import QualityProduct from '../../../../../../public/svg/Why Choose Quality Product.svg'
import QualityServices from '../../../../../../public/svg/Why Choose Quality Services.svg'
import QuickResponse from '../../../../../../public/svg/Quick Response.svg'
import SafetyInspection from '../../../../../../public/svg/Safety Inspection.svg'
import './WhyChooseUs.scss'

function WhyChooseUs() {
  return (
    <div className="WhyChooseUs_about-section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Why Choose Us</p>
        <h2 className="title">Why Choose Poolix</h2>
        <p className="descr">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Maecenas
          turpis <br /> magna eu dolor nibh.
        </p>
        <div className="row gap-y-7 mt-7">
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={QualityServices} alt="" />
              <div className="content">
                <h3>Quality Services</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={ExperiencedTeam} alt="" />
              <div className="content">
                <h3>Experienced Team</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={SafetyInspection} alt="" />
              <div className="content">
                <h3>Safety Inspection</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={AffordablePricing} alt="" />
              <div className="content">
                <h3>Affordable Pricing</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={QualityProduct} alt="" />
              <div className="content">
                <h3>Quality Product</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <img src={QuickResponse} alt="" />
              <div className="content">
                <h3>Quick Response</h3>
                <div className="card-descr">
                  Amet mauris sed enim suspendise odio nullam sed eite.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyChooseUs;
