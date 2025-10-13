import React, { createContext, useState } from "react";

export const PriceContext = createContext();

export const StatePrice = ({ children }) => {
  const [price, setPrice] = useState(0);

  const addPrice = (amount) => {
    setPrice((prev) => prev + amount);
  };

  return (
    <PriceContext.Provider value={{ price, addPrice }}>
      {children}
    </PriceContext.Provider>
  );
};
