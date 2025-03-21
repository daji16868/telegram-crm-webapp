import React, { useState } from 'react';
import type { Customer } from '../types/customer';
import { CustomerDetail } from './CustomerDetail';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">客户列表</h2>
      {customers.length === 0 ? (
        <p className="text-gray-500">暂无客户数据</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map(customer => (
            <div
              key={customer.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCustomer(customer)}
            >
              <h3 className="font-medium">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.phone}</p>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          ))}
        </div>
      )}

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};