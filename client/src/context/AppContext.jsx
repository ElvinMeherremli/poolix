import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [forceRerender, setForceRerender] = useState(false);

  const triggerRerender = () => {
    setForceRerender(prev => !prev);
  };

  return (
    <AppContext.Provider value={{ forceRerender, triggerRerender }}>
      {children}
    </AppContext.Provider>
  );
};
