import React, { createContext, useState } from 'react';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [isSeller, setSeller] = useState(false);
  const [Email, setEmail] = useState('');

  return (
    <userContext.Provider value={{ name, setName, isSeller, setSeller, Email, setEmail }}>
      {children}
    </userContext.Provider>
  );
};
