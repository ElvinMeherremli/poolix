import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./MainTop.scss";
function MainTop() {
  return (
    <div className="MainTop-section">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        speed={2000}
      >
        <SwiperSlide>
          <div className="content-outer">
            <div className="content-box box1">
              <div className="inner">
                <h4>20 Years Of Experience</h4>
                <h1>
                  Expert Swimming Pool <br /> Maintenance
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit <br />{" "}
                  Turpis ridiculus tellus.
                </p>
                <button className="inner-btn">
                  Make Appointment
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="content-outer">
            <div className="content-box box2">
              <div className="inner">
                <h4>20 Years Of Experience</h4>
                <h1>
                  Expert Swimming Pool <br /> Maintenance
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit <br />{" "}
                  Turpis ridiculus tellus.
                </p>
                <button className="inner-btn">
                  Make Appointment
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="content-outer">
            <div className="content-box box3">
              <div className="inner">
                <h4>20 Years Of Experience</h4>
                <h1>
                  Expert Swimming Pool <br /> Maintenance
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit <br />{" "}
                  Turpis ridiculus tellus.
                </p>
                <button className="inner-btn">
                  Make Appointment
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="banner-shape">
        <img src="https://html.tonatheme.com/2023/poolix/assets/images/shape/banner-shape.svg" alt="" />
      </div>
    </div>
  );
}

export default MainTop;
