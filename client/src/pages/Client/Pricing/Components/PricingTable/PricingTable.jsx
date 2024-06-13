import React, { useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import "./PricingTable.scss";

function PricingTable() {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div className="PricingTable_pricing-section">
      <div className="container max-w-[1320px]">
        <p className="title-top">Pricing Table</p>
        <h2 className="title">
          Not Any Hidden Charge, Choose
          <br />
          Our Pricing Plan
        </h2>
        <label className="flex mt-10 justify-center items-center mb-5 cursor-pointer">
          <p>Monthly</p>
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={handleToggle}
          />
          <div className="ml-3 mr-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-offset-[#ff5c02] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#ff5c02] after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#ebebeb]"></div>
          <p>Yearly</p>
        </label>
        {isYearly ? (
          <div className="pricing-tables yearly-tables ">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card1">
                  <h4 className="card-title">SALT WATER SERVICE</h4>
                  <div className="card-price-box">
                    <h3 className="price">$80.99</h3>
                    <p className="period"> / Yearly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">SELECT PLAN <span></span></button>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card2">
                  <h4 className="card-title">FULL POOL SERVICE</h4>
                  <div className="card-price-box">
                    <h3 className="price">$99.99</h3>
                    <p className="period"> / Yearly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">SELECT PLAN <span></span></button>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card1">
                  <h4 className="card-title">CHEMICAL ONLY</h4>
                  <div className="card-price-box">
                    <h3 className="price">$149.99</h3>
                    <p className="period"> / Yearly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">
                    SELECT PLAN
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pricing-tables monthly-tables">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card1">
                  <h4 className="card-title">SALT WATER SERVICE</h4>
                  <div className="card-price-box">
                    <h3 className="price">$50.99</h3>
                    <p className="period"> / Monthly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">SELECT PLAN <span></span></button>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card2">
                  <h4 className="card-title">FULL POOL SERVICE</h4>
                  <div className="card-price-box">
                    <h3 className="price">$70.99</h3>
                    <p className="period"> / Monthly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">SELECT PLAN <span></span></button>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card card1">
                  <h4 className="card-title">CHEMICAL ONLY</h4>
                  <div className="card-price-box">
                    <h3 className="price">$90.99</h3>
                    <p className="period"> / Monthly</p>
                  </div>
                  <ul>
                    <li>
                      <HiArrowLongRight /> <p>Test the pool</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Pressure Testing Lines</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Autometic Cleaners</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Lake Lines Underground</p>
                    </li>
                    <li>
                      <HiArrowLongRight /> <p>Heater and Venting</p>
                    </li>
                  </ul>
                  <button className="inner-btn">
                    SELECT PLAN
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricingTable;
