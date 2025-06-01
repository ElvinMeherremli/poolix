/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const BasketContext = createContext()
export const BasketContextProvider = ({ children }) => {
  const localBasket = JSON.parse(localStorage.getItem('basket'))
  if (!localBasket) {
    localStorage.setItem('basket', JSON.stringify([]))
  }
  const [basket, setBasket] = useState(localBasket || [])
  return (
    <BasketContext.Provider value={{basket, setBasket}}>
      {children}
    </BasketContext.Provider>
  )
}