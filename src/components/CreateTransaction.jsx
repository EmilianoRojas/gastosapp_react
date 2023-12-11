import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';

const CreateTransaction = ({ onTransactionCreated }) => {
  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    description: '',
    category_id: '',
    payment_method: '',
    user_id: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data && data.user && data.user.id) {
        setTransaction((t) => ({ ...t, user_id: data.user.id }));
      }
    };

    const fetchCategories = async () => {
      let { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories: ', error);
      } else {
        setCategories(data.map((category) => ({ label: category.name, value: category.id })));
      }
    };

    fetchUser();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from('transactions').insert([transaction]);

      if (error) throw error;

      console.log('Data inserted: ', data);
      setTransaction({
        date: '',
        amount: '',
        description: '',
        category_id: '',
        payment_method: '',
        user_id: transaction.user_id,
      });
      onTransactionCreated();
    } catch (error) {
      console.error('Error inserting data: ', error.message);
    }
  };

  const handleSelectChange = (value) => {
    console.log(transaction);
    setTransaction({ ...transaction, category_id: value.target.value });
    console.log(transaction);
  };

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-col gap-2 my-1" onSubmit={handleSubmit}>
      <Input
        isClearable
        variant="bordered"
        label="Description"
        name="description"
        type="text"
        value={transaction.description}
        onChange={handleChange}
      />
      <Input
        isClearable
        variant="bordered"
        label="Amount"
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />
      <Input
        isClearable
        variant="bordered"
        label="Date"
        type="datetime"
        name="date"
        value={transaction.date}
        onChange={handleChange}
        required
      />
      <Select
        items={categories}
        label="Category"
        placeholder="Select a category"
        value={transaction.category_id}
        onChange={handleSelectChange}
      >
        {(category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        )}
      </Select>
      <Button type="submit" color="success">
        Create Transaction
      </Button>
    </form>
  );
};

export default CreateTransaction;
