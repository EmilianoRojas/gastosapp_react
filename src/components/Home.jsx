import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { TableComponent } from './TableComponent';
import CreateTransaction from './CreateTransaction';
import NavbarComponent from './Navbar';

function Home() {
  const [data, setData] = useState(null);

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
            categories (name)
          `,
          )
          .eq('user_id', user.id);

        if (error) throw error;
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="p-2">
        <CreateTransaction onTransactionCreated={fetchData} />
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export default Home;
