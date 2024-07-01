import { IoClose } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../../context/BaksetContext";

function Header() {
  const { basket } = useContext(BasketContext);
  const navigate = useNavigate();
  const location = useLocation(); // Importing useLocation to listen to route changes
  const [scrolled, setScrolled] = useState(false);
  const [flexDirection, setFlexDirection] = useState("column");
  const [username, setUsername] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for opening/closing the mobile menu
  const [isLoading, setIsLoading] = useState(false); // State for loading screen

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
        setFlexDirection("row");
      } else {
        setScrolled(false);
        setFlexDirection("column");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        setUsername(user.username);
      } else {
        setUsername(null);
      }
    };

    updateUser();

    const handleStorageChange = (event) => {
      if (event.key === "user") {
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "client") {
      setIsAdmin(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoading(true); // Show loading screen

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setTimeout(() => {
      window.location.reload(); // Reload the page after a short delay
    }, 1000); // Adjust the delay as needed
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`Header-section ${scrolled ? "scrolled" : ""}`}>
      {isLoading ? (
        <div className="loading-screen">
          <span className="loader"></span>
        </div>
      ) : (
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
              {/* Burger menu for mobile screens */}
              <button className="nav-btn" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                  <IoClose style={{ fontSize: 30 }} />
                ) : (
                  <AiOutlineMenuUnfold style={{ fontSize: 30 }} />
                )}
              </button>
              {/* Navigation menu */}
              <nav className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <Link to={"/"} onClick={toggleMobileMenu}>Home</Link>
                <Link to={"/about"} onClick={toggleMobileMenu}>About Us</Link>
                <Link to={"/services"} onClick={toggleMobileMenu}>Services</Link>
                <Link to={"/shop"} onClick={toggleMobileMenu}>Shop</Link>
                <Link to={"/pricing"} onClick={toggleMobileMenu}>Pricing</Link>
                <Link to={"/contact"} onClick={toggleMobileMenu}>Contact</Link>
              </nav>
            </div>
            <div className="right-column">
              <button
                onClick={() => {
                  navigate("/cart");
                }}
                className="cart"
              >
                <div className="circle">
                  <span className="count">{isAdmin ? basket.length : 0}</span>
                  <BsCart2 />
                </div>
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                }}
                className="phone"
              >
                <div className="circle">
                  <FaRegUser />
                </div>
              </button>
              {username ? (
                <div className="storage flex items-center gap-4">
                  <h2 className="username">{username}</h2>
                  <button onClick={handleLogout} className="log-out">
                    Log Out <span></span>
                  </button>
                </div>
              ) : (
                <div
                  className="prof-btns"
                  style={{ flexDirection: flexDirection }}
                >
                  <button
                    onClick={() => {
                      navigate("login");
                    }}
                    className="login-btn"
                  >
                    Log In <span></span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("register");
                    }}
                    className="register-btn"
                  >
                    Register <span></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
