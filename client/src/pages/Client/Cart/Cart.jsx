import { useContext } from "react";

import "./Cart.scss";
import { BasketContext } from "../../../context/BaksetContext";

function Cart() {
  const { basket, setBasket } = useContext(BasketContext);

  // Function to calculate the total sum of all items in the basket
  const calculateTotalSum = () => {
    let total = 0;
    if (basket) {
      basket.forEach((item) => {
        total += item.price * item.count;
      });
    }
    return total;
  };

  return (
    <div className="cart-section bg-white pt-40">
      <div className="container">
        <div className="relative">
          <table className="w-full mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  count
                </th>
                <th scope="col" className="px-6 py-3">
                  incr decr reset
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
                          remove
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <div className="total">
            <h2 className="sum">
              Total: {calculateTotalSum()}$
            </h2>
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
