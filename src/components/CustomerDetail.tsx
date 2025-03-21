import React, { useState } from 'react';
import { Customer } from '../types/customer';
import { CustomerEditForm } from './CustomerEditForm';

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onClose,
  onEdit,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <CustomerEditForm
            customer={customer}
            onSubmit={(data) => {
              onEdit({ ...customer, ...data });
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

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
            onClick={() => setIsEditing(true)}
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