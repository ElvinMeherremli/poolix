import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

import "./AboutPoolix.scss";
import { useNavigate } from "react-router-dom";

function AboutPoolix() {
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      const shape1 = document.querySelector(".shape-1");
      const shape2 = document.querySelector(".shape-2");

      if (shape1 && shape2) {
        const scrollPosition = window.scrollY;
        shape1.style.transform = `translateY(${scrollPosition * -0.09}px)`;
        shape2.style.transform = `translateY(${scrollPosition * -0.09}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="AboutPoolix-section">
      <div className="container max-w-[1320px]">
        <div className="shape-1">
          <img
            src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-3.png"
            alt=""
          />
        </div>
        <div className="row wrapper">
          <div className="col-lg-6">
            <div className="image">
              <img
                src="https://html.tonatheme.com/2023/poolix/assets/images/resource/about.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 content">
            <p className="title-top">About Poolix</p>
            <h2 className="title">
              <b>
                Swimming Pool Repair and <br />
                Maintenance Company
              </b>
            </h2>
            <p className="descr">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Maecenas
              turpis nibh magna eu dolor nibh. Consequat praesent maecenas
              senectus semper present feugiat consequat senectus.
            </p>
            <div className="row unit">
              <div className="col-6 box">
                <h3 className="box-title">Mission</h3>
                <p className="box-title-bottom">
                  Fegiat consequt senectus sit amet dictum eu volutpat magna.
                </p>
                <p className="box-descr">
                  Lorem ipsum dolor sit amet coset etur adipicing elit Macenas
                  semper magna eu dolor nibh consequat semper dictum
                </p>
                <button onClick={() => {
                  navigate('/about')
                }} className="inner-btn">
                  DISCOVER MORE
                  <span></span>
                </button>
              </div>
              <div className="col-6 box">
                <h3 className="box-title">Vision</h3>
                <p className="descr">
                  Lorem ipsum dolor sit amet coseter etur adipiscing elit.
                  Maecenas tor magna eu dolor
                </p>
                <ul>
                  <li>
                    <FaCheck /> Olympic Size Pool
                  </li>
                  <li>
                    <FaCheck /> Food & Drinks Service
                  </li>
                  <li>
                    <FaCheck /> Relax Atmosphere
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-2">
          <img
            src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPoolix;
