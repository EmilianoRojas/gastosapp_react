import { useState } from 'react';
import { supabase } from '../supabaseClient';

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('transactions')
          .select('id, description, amount, category_id, categories (name)')
          .eq('user_id', user.id);

        if (error) throw error;
        setData(data);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, data, error, fetchData];
};

export default useFetchData;
