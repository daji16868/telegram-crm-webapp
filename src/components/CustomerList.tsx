import React, { useState } from 'react';
import { Customer } from '../types/customer';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">客户详情</h3>
        <div className="space-y-2">
          <p><span className="font-medium">姓名：</span>{customer.name}</p>
          <p><span className="font-medium">电话：</span>{customer.phone}</p>
          <p><span className="font-medium">邮箱：</span>{customer.email}</p>
          <p><span className="font-medium">备注：</span>{customer.notes || '无'}</p>
          <p><span className="font-medium">创建时间：</span>{new Date(customer.createdAt).toLocaleString('zh-CN')}</p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => onEdit(customer)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            编辑
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            删除
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

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