import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error checking session:', error);
        setAuthenticated(false);
      } else {
        setAuthenticated(!!data.session);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
