import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRoleRedirect = (role) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem(role));
    if (!storedRole) {
      navigate(`/login`); // Redirect to login page based on the role
    }
  }, [role, navigate]);
};

export default useRoleRedirect;
