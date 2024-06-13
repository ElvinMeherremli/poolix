import svg1 from "../../../../../../public/svg/about_funfucts1.svg";
import svg2 from "../../../../../../public/svg/about_funfucts2.svg";
import svg3 from "../../../../../../public/svg/about_funfucts3.svg";
import AnimatedNumbers from "react-animated-numbers";
import './FunFucts.scss'
function FunFucts() {
  return (
    <div className="FunFucts_about-section">
      <div className="container max-w-[1320px]">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-4 col-md-6 p-0">
              <div className="card card1">
                <div className="cirlce cirlce1">
                  <img src={svg1} alt="" />
                </div>
                <div className="content">
                  <div className="numbers">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={20}
                      fontStyle={{
                        fontSize: 40,
                        color: "#013B5A",
                      }}
                    />
                    <p style={{color: '#013B5A'}}>+</p>
                  </div>
                  <div className="name">
                    <h3 style={{color: '#013B5A'}}>Industry Awards</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 p-0">
              <div className="card card2">
                <div className="cirlce cirlce2">
                  <img src={svg2} alt="" />
                </div>
                <div className="content">
                  <div className="numbers">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={98}
                      fontStyle={{
                        fontSize: 40,
                        color: "white",
                      }}
                    />
                    <p>%</p>
                  </div>
                  <div className="name">
                    <h3>Project Success</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 p-0">
              <div className="card card3">
                <div className="cirlce cirlce3">
                  <img src={svg3} alt="" />
                </div>
                <div className="content">
                  <div className="numbers">
                    <AnimatedNumbers
                      includeComma
                      transitions={(index) => ({
                        type: "spring",
                        duration: index + 1.5,
                      })}
                      animateToNumber={5}
                      fontStyle={{
                        fontSize: 40,
                        color: "white",
                      }}
                    />
                    <p>k+</p>
                  </div>
                  <div className="name">
                    <h3>Happy Clients</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FunFucts;
