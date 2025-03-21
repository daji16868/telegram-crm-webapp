import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import CustomerDetail from './CustomerDetail';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
}

const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { customers, selectCustomer, selectedCustomer, clearSelectedCustomer } = useCustomer();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg">
      {/* 搜索栏 */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索客户..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="divide-y divide-gray-200">
        {filteredCustomers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            暂无客户数据
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => selectCustomer(customer)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{customer.phone}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>
              {customer.notes && (
                <p className="mt-2 text-sm text-gray-600">{customer.notes}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* 客户详情弹窗 */}
      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={clearSelectedCustomer}
          onEdit={() => {/* TODO: 实现编辑功能 */}}
        />
      )}
    </div>
  );
};

export default CustomerList; 