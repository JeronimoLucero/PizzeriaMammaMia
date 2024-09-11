import { useUser } from '../context/UserContext';

import { Outlet, Navigate } from 'react-router-dom';

const Layout = () => {
  const { user } = useUser();

  return (
    <>
      
      <main>
        <Outlet />
      </main>
      
    </>
  );
};

const AuthLayout = () => {
  const { user } = useUser();
  
 
  return user ? <Navigate to="/" /> : <Outlet />;
};

export { Layout, AuthLayout };