import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export function TableComponent({ data }) {
  console.log(data);
  return (
    <Table aria-label="transactions table">
      <TableHeader>
        <TableColumn>Description</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Category</TableColumn>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.description}</TableCell>
              <TableCell>${data.amount}</TableCell>
              <TableCell>{data.categories.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
