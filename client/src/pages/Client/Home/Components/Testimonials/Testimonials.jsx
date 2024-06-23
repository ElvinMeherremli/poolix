import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { PiQuotesFill } from "react-icons/pi";
import "./Testimonials.scss";
import { useContext } from "react";
import { TestimonialApi } from "../../../../../context/ContextApi";

function Testimonials() {
  const { TestimonialApiData } = useContext(TestimonialApi);
  return (
    <div className="Testimonials-section">
      <div className="container max-w-[1320px]">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-6">
              <p className="title-top">Testimonials</p>
              <h2 className="title">
                What Our Clients Say <br /> About Poolix
              </h2>
            </div>
            <div className="col-lg-6">
              <img
                src="https://html.tonatheme.com/2023/poolix/assets/images/resource/image-2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="slider">
        <Swiper
          style={{ cursor: "grab" }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000, // Time in ms for how long each slide will be shown
            disableOnInteraction: false,
          }}
          speed={2000}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {TestimonialApiData
            ? TestimonialApiData.map((elem) => {
                return (
                  <SwiperSlide key={elem.id}>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="testimonial-card">
                          <div className="quotes-ico">
                            <PiQuotesFill />
                          </div>
                          <div className="stars">
                            <i
                              className={`${
                                elem.rating >= 1
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }`}
                            ></i>
                            <i
                              className={`${
                                elem.rating >= 2
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }`}
                            ></i>
                            <i
                              className={`${
                                elem.rating >= 3
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }`}
                            ></i>
                            <i
                              className={`${
                                elem.rating >= 4
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }`}
                            ></i>
                            <i
                              className={`${
                                elem.rating >= 5
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }`}
                            ></i>
                          </div>
                          <p className="descr">{elem.descr}</p>
                          <div className="testimonial-name">
                            <span className="name"> - {elem.name},</span>{" "}
                            <span>{elem.whoIs}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </div>
    </div>
  );
}
export default Testimonials;
