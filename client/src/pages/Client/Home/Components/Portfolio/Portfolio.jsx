import { GoPlus } from "react-icons/go";
import * as React from "react";
import Fancybox from "../../../../../helpers/Fancybox/Fancybox";
import "./Portfolio.scss";
import { PortfolioApi } from "../../../../../context/ContextApi";
function Portfolio() {
  const { PortfolioApiData } = React.useContext(PortfolioApi);
  return (
    <div className="Portfolio-section">
      <p className="title-top">Portfolio</p>
      <h2 className="title">
        Some of Our Recent <br /> Memories
      </h2>
      <div
        className="wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: 1440,
        }}
      >
        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <div className="row">
            {PortfolioApiData
              ? PortfolioApiData.map((elem) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-6 p-0 pb-1">
                      <a
                        style={{ display: "block", width: 200}}
                        data-fancybox="gallery"
                        href={elem.img}
                      >
                        <img
                          src={elem.img}
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
                  );
                })
              : ""}
          </div>
        </Fancybox>
      </div>
    </div>
  );
}
export default Portfolio;
