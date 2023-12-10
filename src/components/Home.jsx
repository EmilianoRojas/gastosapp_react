import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { TableComponent } from './TableComponent';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select(
              `
              description,
              amount,
              category_id,
              categories (
                name
              )`,
            )
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
      <TableComponent data={data} />
    </div>
  );
}

export default Home;
