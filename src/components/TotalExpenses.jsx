import React from 'react';

function TotalExpenses({ data }) {
  const total = data.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Total Expenses</h2>
      <p style={{ fontSize: '24px', marginTop: '10px' }} className="font-bold">
        ${total.toFixed(2)}
      </p>
    </div>
  );
}

export default TotalExpenses;
