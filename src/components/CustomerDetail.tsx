import React, { useState } from 'react';
import { Customer } from '../types/customer';
import CustomerEditForm from './CustomerEditForm';

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <CustomerEditForm customer={customer} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">客户详情</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">姓名</label>
            <p className="mt-1 text-gray-900">{customer.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">电话</label>
            <p className="mt-1 text-gray-900">{customer.phone}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <p className="mt-1 text-gray-900">{customer.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">备注</label>
            <p className="mt-1 text-gray-900">{customer.notes}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">创建时间</label>
            <p className="mt-1 text-gray-900">
              {new Date(customer.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            编辑客户信息
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail; 