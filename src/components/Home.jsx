import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react'; // Import Spinner component from Next UI
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { TableComponent } from './TableComponent';
import CreateTransaction from './CreateTransaction';
import NavbarComponent from './Navbar';
import TotalExpenses from './TotalExpenses';
import CategoryChart from './CategoryChart';

function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for managing loading status

  const fetchData = async () => {
    setIsLoading(true); // Start loading

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
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    setIsLoading(false); // End loading
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="p-2">
        {isLoading ? (
          <div className="flex justify-center items-center m-4">
            <Spinner size="lg" />
          </div>
        ) : (
          data && (
            <div>
              <TotalExpenses data={data} />
              <CategoryChart data={data} />
            </div>
          )
        )}
        <CreateTransaction onTransactionCreated={fetchData} />
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export default Home;
