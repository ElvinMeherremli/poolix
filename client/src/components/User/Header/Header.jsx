import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import "./Header.scss";
import { useEffect, useState } from "react";
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`Header-section ${scrolled ? "scrolled" : ""}`}>
      <div className="container max-w-[1380px]">
        <div className="wrapper">
          <div className="left-column">
            <div className="logo" style={{ width: 186 }}>
              <Link to={"/"}>
                <img
                  style={{ width: 186, height: 60 }}
                  src="https://html.tonatheme.com/2023/poolix/assets/images/logo.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="conv" style={{ height: 53 }}>
              <img
                style={{ width: 5, height: 53 }}
                className="mx-[60px]"
                src="https://html.tonatheme.com/2023/poolix/assets/images/shape/shape-1.png"
                alt=""
              />
            </div>
            <nav className="flex gap-5">
              <Link to={"/"}>Home</Link>
              <Link to={"/about"}>About Us</Link>
              <Link to={"/services"}>Services</Link>
              <Link to={"/shop"}>Shop</Link>
              <Link to={"/pricing"}>Pricing</Link>
              <Link to={"/blog"}>Blog</Link>
              <Link to={"/contact"}>Contact</Link>
            </nav>
          </div>
          <div className="right-column">
            <div className="cart">
              <div className="circle">
                <span className="count">0</span>
                <BsCart2 />
              </div>
            </div>
            <div className="phone">
              <div className="circle">
                <FiPhone />
              </div>
            </div>
            <div className="numbers">
              <p>CALL US NOW!</p>
              <a href="tel:+912136660027">+91-213-666-0027</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
