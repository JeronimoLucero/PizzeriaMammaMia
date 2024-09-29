import { useState } from 'react';
import { useUser } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { validarLogin } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await validarLogin(email, password);
      if (data && data.token) {
        navigate('/'); 
      } else {
        setErrorMessage('Inicio de sesión fallido. Intente de nuevo.');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage(error.message || 'Error en el proceso de inicio de sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }} aria-live="assertive">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="emailHelp"
          />
          
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default LoginPage;
