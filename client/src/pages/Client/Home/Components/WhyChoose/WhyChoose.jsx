import { useState } from "react";
import AffordablePricing from "../../../../../../public/svg/Why Choose Affordable Pricing.svg";
import ExperiencedTeam from "../../../../../../public/svg/Why Choose Experienced Team.svg";
import QualityProduct from "../../../../../../public/svg/Why Choose Quality Product.svg";
import QualityServices from "../../../../../../public/svg/Why Choose Quality Services.svg";
import AnimatedNumbers from "react-animated-numbers";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./WhyChoose.scss";

function WhyChoose() {
  const [num1, setNum1] = useState(20);
  const [num2, setNum2] = useState(98);
  const [num3, setNum3] = useState(5);

  return (
    <div className="WhyChoose-section">
      <div className="main-wrapper">
        <div className="wrapper">
          <div className="content">
            <div className="container max-w-[660px]">
              <p className="title-top">Why Choose</p>
              <h2 className="title">Why Choose Poolix</h2>
              <p className="descr">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Maecenas
                turpis magna eu dolor nibh.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <img src={QualityServices} alt="" />
                    <div className="card-content">
                      <h3 className="card-content-title">Quality Services</h3>
                      <p className="card-descr">
                        Amet mauris sed enim suspendise odio nullam sed eite.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <img src={ExperiencedTeam} alt="" />
                    <div className="card-content">
                      <h3 className="card-content-title">Experienced Team</h3>
                      <p className="card-descr">
                        Amet mauris sed enim suspendise odio nullam sed eite.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <img src={AffordablePricing} alt="" />
                    <div className="card-content">
                      <h3 className="card-content-title">Affordable Pricing</h3>
                      <p className="card-descr">
                        Amet mauris sed enim suspendise odio nullam sed eite.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <img src={QualityProduct} alt="" />
                    <div className="card-content">
                      <h3 className="card-content-title">Quality Product</h3>
                      <p className="card-descr">
                        Amet mauris sed enim suspendise odio nullam sed eite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="unit" style={{ backgroundColor: "#FF5C02" }}>
            <div className="image">
              <img
                src="https://html.tonatheme.com/2023/poolix/assets/images/resource/image-1.jpg"
                alt=""
              />
            </div>
            <div className="number-swiper">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                speed={1400}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper max-w-[720px]"
              >
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={num1}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>+</p>
                  </div>
                  <p>Happy Clients</p>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={num2}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>%</p>
                  </div>
                  <p>Project Success</p>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1,
                      })}
                      animateToNumber={num3}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>k+</p>
                  </div>
                  <p>Industry Awards</p>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={num1}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>+</p>
                  </div>
                  <p>Happy Clients</p>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={num2}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>%</p>
                  </div>
                  <p>Project Success</p>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="box flex justify-center items-center">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1,
                      })}
                      animateToNumber={num3}
                      fontStyle={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                    <p>k+</p>
                  </div>
                  <p>Industry Awards</p>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyChoose;
