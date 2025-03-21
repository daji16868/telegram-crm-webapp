import React, { useState, useEffect } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';
import { Customer, CustomerFormData } from './types/customer';
import { WebApp } from './utils/telegram';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // 添加检查确保应用正常加载
  useEffect(() => {
    console.log('App loaded!');
    if (WebApp) {
      console.log('Telegram WebApp is available');
    } else {
      console.log('Telegram WebApp is not available');
    }
  }, []);

  const handleSubmit = (formData: CustomerFormData) => {
    if (editingCustomer) {
      // 更新现有客户
      const updatedCustomers = customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...customer, ...formData }
          : customer
      );
      setCustomers(updatedCustomers);
      setEditingCustomer(null);
    } else {
      // 添加新客户
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsFormVisible(false);

    // 通过 WebApp 发送数据
    if (WebApp) {
      console.log('Sending data to Telegram', formData);
      WebApp.sendData(JSON.stringify({
        action: 'add_customer',
        customer: formData
      }));
      WebApp.close();
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormVisible(true);
  };

  const handleDelete = (customer: Customer) => {
    const updatedCustomers = customers.filter(c => c.id !== customer.id);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">客户管理系统</h1>
      {isFormVisible ? (
        <CustomerForm
          onSubmit={handleSubmit}
          initialData={editingCustomer || undefined}
        />
      ) : (
        <CustomerList
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;