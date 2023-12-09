import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        
const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
        try {
            const { data, error } = await supabase
            .from('transactions')
            .select()
            .eq('user_id', user.id);

            if (error) throw error;
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
        }
    };

    fetchData();
    }, []);

  return (
    <div>
      <h1>Página Principal</h1>
      {data && <div>{JSON.stringify(data)}</div>} {/* Display fetched data */}
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;
