import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { SYSTEM_ROLE } from '@/types/role.types';

export default function AuthRedirector() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
      return;
    }

    if (user?.role === SYSTEM_ROLE.ADMIN) {
      navigate('/admin', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  return null;
}
