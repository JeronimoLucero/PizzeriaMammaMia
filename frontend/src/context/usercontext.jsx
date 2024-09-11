import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('auth-Token');
    if (token) {
     
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('auth-Token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth-Token');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);