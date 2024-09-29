import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const validarLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas. Intente de nuevo.');
      }

      const data = await response.json();
      setEmail(email);
      setToken(data.token);
      setMessage("");
      return data;
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validarRegister = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el registro. Verifique sus datos.');
      }

      const data = await response.json();
      setEmail(email);
      setToken(data.token);
      setMessage("");
      return data;
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setEmail("");
    setToken(null);
    setProfile(null); // Limpiar el perfil en el cierre de sesión
    setMessage("Cierre de sesión exitoso.");
    setTimeout(() => setMessage(""), 3000);
  };

  const obtenerPerfil = async () => {
    if (!token) return; 

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el perfil del usuario.');
      }

      const data = await response.json();
      setProfile(data); 
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ token, validarLogin, validarRegister, logout, email, message, loading, profile, obtenerPerfil }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
