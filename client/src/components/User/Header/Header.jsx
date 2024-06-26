import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../../context/BaksetContext";

function Header() {
  const { basket } = useContext(BasketContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [flexDirection, setFlexDirection] = useState("column");
  const [username, setUsername] = useState(null);

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

    updateUser(); // вызываем updateUser сразу для инициализации

    const handleStorageChange = (event) => {
      // Проверяем, что изменилось именно хранилище пользователя
      if (event.key === "user") {
        updateUser();
      }
    };

    // Слушаем событие storage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="cart"
            >
              <div className="circle">
                <span className="count">{basket.length}</span>
                <BsCart2 />
              </div>
            </button>
            <button onClick={() => {
              navigate('/profile')
            }} className="phone">
              <div className="circle">
                <FaRegUser />
              </div>
            </button>
            {username ? (
              <div className="storage flex items-center gap-4">
                <h2 className="username">{username}</h2>
                <button onClick={() => {
                  localStorage.removeItem('user')
                  sessionStorage.removeItem('user')
                }} className="log-out">Log Out <span></span></button>
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
    </div>
  );
}

export default Header;
