import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaSwimmingPool } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "./Services.scss";
import arrsvg from "../../../../../../public/svg/arrow-right-solid-white.svg";
import { ServiceApi } from "../../../../../context/ContextApi";
import { useNavigate } from "react-router-dom";

function getFirstSentence(text) {
    const sentenceEnd = /[.!?]/;
    const match = sentenceEnd.exec(text);
    if (match) {
        return text.substring(0, match.index + 1);
    }
    return text;
}

function Services() {
    const navigate = useNavigate();
    const { serviceApiData } = useContext(ServiceApi);

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
                              <SwiperSlide key={elem._id}>
                                  <div className="card">
                                      <div className="image">
                                          <img
                                              className="max-w-[251px] max-h-[177px] mx-auto"
                                              src={elem.img}
                                              alt=""
                                          />
                                      </div>
                                      <div className="conent">
                                          <div className="circle">
                                              <FaSwimmingPool />
                                          </div>
                                          <h3 className="mt-[20px]">
                                              {elem.title}
                                          </h3>
                                          <div className="block-overlay">
                                              <button
                                                  onClick={() => {
                                                      navigate(
                                                          `service-detail/${elem._id}`
                                                      );
                                                  }}
                                                  className="circle"
                                              >
                                                  <img
                                                      src={arrsvg}
                                                      alt=""
                                                  />
                                              </button>
                                              <h3 className="overlay-title">
                                                  {elem.title}
                                              </h3>
                                              <p className="overlay-descr">
                                                  {getFirstSentence(
                                                      elem.descr
                                                  )}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </SwiperSlide>
                          ))
                        : ""}
                </Swiper>
            </div>
        </div>
    );
}

export default Services;
