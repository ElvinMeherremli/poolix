import { GoPlus } from "react-icons/go";
import * as React from "react";
import Fancybox from "../../../../../helpers/Fancybox/Fancybox";
import "./Portfolio.scss";
function Portfolio() {
  return (
    <div className="Portfolio-section">
      <p className="title-top">Portfolio</p>
      <h2 className="title">Some of Our Recent <br /> Memories</h2>
      <div
        className="wrapper"
        style={{ display: "flex", justifyContent: 'center', flexDirection: "row", width: 1440 }}
      >
        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 p-0">
              <a
                style={{ display: "block", width: 200 }}
                data-fancybox="gallery"
                href="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-1.jpg"
              >
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-1.jpg"
                  width="200"
                  height="150"
                />
                <div className="box-overlay">
                  <div className="plus">
                    <GoPlus />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 p-0">
              <a
                style={{ display: "block", width: 200 }}
                data-fancybox="gallery"
                href="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-2.jpg"
              >
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-2.jpg"
                  width="200"
                  height="150"
                />
                <div className="box-overlay">
                  <div className="plus">
                    <GoPlus />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 p-0">
              <a
                style={{ display: "block", width: 200 }}
                data-fancybox="gallery"
                href="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-3.jpg"
              >
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-3.jpg"
                  width="200"
                  height="150"
                />
                <div className="box-overlay">
                  <div className="plus">
                    <GoPlus />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 p-0">
              <a
                style={{ display: "block", width: 200 }}
                data-fancybox="gallery"
                href="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-4.jpg"
              >
                <img
                  src="https://html.tonatheme.com/2023/poolix/assets/images/gallery/gallery-4.jpg"
                  width="200"
                  height="150"
                />
                <div className="box-overlay">
                  <div className="plus">
                    <GoPlus />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </Fancybox>
      </div>
    </div>
  );
}
export default Portfolio;
