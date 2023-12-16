import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { TableComponent } from './TableComponent';
import CreateTransaction from './CreateTransaction';
import NavbarComponent from './Navbar';
import TotalExpenses from './TotalExpenses';

function Home() {
  const [data, setData] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

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
            id,
            description,
            amount,
            category_id,
            categories (name)
          `,
          )
          .eq('user_id', user.id);

        if (error) throw error;
        setData(data);
        const total = data.reduce((acc, transaction) => acc + transaction.amount, 0);
        setTotalExpenses(total);
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
        {data && <TotalExpenses data={data} />}
        <CreateTransaction onTransactionCreated={fetchData} />
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export default Home;
