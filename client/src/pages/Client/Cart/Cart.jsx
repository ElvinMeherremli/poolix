import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Cart.scss";
import { BasketContext } from "../../../context/BaksetContext";
import { UserApi } from "../../../context/ContextApi";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const { basket, setBasket } = useContext(BasketContext);
  const { UserApiData } = useContext(UserApi);

  // Get user ID from sessionStorage or localStorage
  const getUserId = () => {
    const userSessionData = sessionStorage.getItem("user");
    const userLocalData = localStorage.getItem("user");

    if (userSessionData) {
      return JSON.parse(userSessionData)._id;
    } else if (userLocalData) {
      return JSON.parse(userLocalData)._id;
    } else {
      return null;
    }
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:1212/api/users/${userId}`);
        const userData = response.data;
        if (userData && userData.busket) {
          setBasket(userData.busket);
        }
      } catch (error) {
        console.error("Failed to fetch user data from the server:", error);
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, setBasket]);

  useEffect(() => {
    if (userId) {
      updateUserBasketInDB(userId, basket);
    }
  }, [basket, userId]);

  const calculateTotalSum = () => {
    let total = 0;
    if (basket) {
      basket.forEach((item) => {
        total += item.price * item.count;
      });
    }
    return total;
  };

  const updateUserBasketInDB = async (userId, basket) => {
    try {
      await axios.patch(`http://localhost:1212/api/users/${userId}`, { busket: basket });
    } catch (error) {
      console.error("Failed to update basket in the database:", error);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.role === "client") {
      setIsAdmin(true);
    } else {
      navigate("/");
    }
  }, [navigate]);
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="cart-section bg-white pt-40">
      <div className="container">
        <div className="relative">
          <table className="w-full mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {basket
                ? basket.map((basketItem) => (
                    <tr
                      key={basketItem._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        <img
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "contain",
                          }}
                          src={basketItem.img}
                          alt=""
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {basketItem.productName}
                      </th>
                      <td className="px-6 py-4">{basketItem.price}$</td>
                      <td className="px-6 py-4">{basketItem.count}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            const foundItem = basket.find(
                              (x) => x._id === basketItem._id
                            );
                            foundItem.count += 1;
                            setBasket([...basket]);
                            localStorage.setItem(
                              "basket",
                              JSON.stringify(basket)
                            );
                          }}
                          type="button"
                          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            const findItem = basket.find(
                              (x) => x._id === basketItem._id
                            );
                            if (findItem.count > 1) {
                              findItem.count -= 1;
                              setBasket([...basket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify(basket)
                              );
                            } else {
                              const updatedBasket = basket.filter(
                                (x) => x._id !== basketItem._id
                              );
                              setBasket([...updatedBasket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify(updatedBasket)
                              );
                            }
                          }}
                          type="button"
                          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          -
                        </button>
                        <button
                          onClick={() => {
                            const updatedBasket = basket.filter(
                              (x) => x._id !== basketItem._id
                            );
                            setBasket([...updatedBasket]);
                            localStorage.setItem(
                              "basket",
                              JSON.stringify(updatedBasket)
                            );
                          }}
                          type="button"
                          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <div className="total">
            <h2 className="sum">Total: {calculateTotalSum()}$</h2>
            <button
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  setBasket([]);
                  localStorage.setItem("basket", JSON.stringify([]));
                }
              }}
              type="button"
              className="block mx-auto mt-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
