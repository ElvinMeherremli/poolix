import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaSwimmingPool } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Services.scss";
import arrsvg from "../../../../../../public/svg/arrow-right-solid-white.svg";
import { ServiceApi } from "../../../../../context/ContextApi";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate()
  const { serviceApiData, setServiceApiData } = useContext(ServiceApi);
  return (
    <div className="Services_home-section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Services</p>
        <h2 className="title">
          Swimming Pool Facilities <br /> & Services
        </h2>
        <Swiper
          style={{ cursor: "grab" }}
          slidesPerView={4}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {serviceApiData
            ? serviceApiData.map((elem) => (
                <SwiperSlide>
                  <div className="card">
                    <div className="image">
                      <img src={elem.img} alt="" />
                    </div>
                    <div className="conent">
                      <div className="circle">
                        <FaSwimmingPool />
                      </div>
                      <h3 className="mt-[20px]">{elem.title}</h3>
                      <div className="block-overlay">
                        <button onClick={() => {
                          navigate(`service-detail/${elem._id}`)
                        }} className="circle">
                          <img src={arrsvg} alt="" />
                        </button>
                        <h3 className="overlay-title">Drain & Clean</h3>
                        <p className="overlay-descr">
                          Lorem ipsum dolor amet coset <br /> etur adipiscing
                          elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : ""}
          {/* <SwiperSlide>
            <div className="card">
              <div className="image">
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/resource/service-2.jpg"
                  alt=""
                />
              </div>
              <div className="conent">
                <div className="circle">
                  <FaSwimmingPool />
                </div>
                <h3 className="mt-[20px]">Drain & Clean</h3>
                <div className="block-overlay">
                  <button className="circle">
                    <img src={arrsvg} alt="" />
                  </button>
                  <h3 className="overlay-title">Drain & Clean</h3>
                  <p className="overlay-descr">
                    Lorem ipsum dolor amet coset <br /> etur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
}
export default Services;
