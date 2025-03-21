import React, { useState, useEffect } from 'react';
import { CustomerFormData } from '../types/customer';
import { WebApp, setMainButtonText, showMainButton, hideMainButton, onMainButtonClick, offMainButtonClick } from '../utils/telegram';

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: CustomerFormData;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CustomerFormData>(() => initialData || {
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  // 添加调试日志
  useEffect(() => {
    console.log('CustomerForm rendered');
    
    // 设置 Telegram 主按钮
    if (WebApp) {
      console.log('Setting up Telegram MainButton');
      setMainButtonText('提交客户信息');
      showMainButton();
      onMainButtonClick(handleSubmit);
      
      return () => {
        offMainButtonClick(handleSubmit);
        hideMainButton();
      };
    } else {
      console.log('Telegram WebApp is not available');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'phone', 'email'] as const;
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`请填写${field === 'name' ? '姓名' : field === 'phone' ? '电话' : '邮箱'}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Submitting form data:', formData);
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">客户信息</h2>
      <form 
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="请输入客户姓名"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            电话
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="请输入联系电话"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="请输入电子邮箱"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            备注
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="添加备注信息（可选）"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          提交
        </button>
      </form>
    </div>
  );
};