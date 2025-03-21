import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Customer, CustomerFormData } from '../types/customer';
import { syncAddCustomer, syncUpdateCustomer, syncDeleteCustomer } from '../utils/telegramSync';
import { fetchCustomers, createCustomer, updateCustomer as updateCustomerApi, deleteCustomer as deleteCustomerApi } from '../utils/api';

interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
  addCustomer: (data: CustomerFormData) => Promise<void>;
  updateCustomer: (id: string, data: CustomerFormData) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  selectCustomer: (customer: Customer) => void;
  clearSelectedCustomer: () => void;
  refreshCustomers: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取客户列表
  const refreshCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCustomers();
      if (response.success && response.data) {
        setCustomers(response.data);
      } else {
        throw new Error(response.error || '获取客户列表失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初始化时加载数据
  useEffect(() => {
    refreshCustomers();
  }, [refreshCustomers]);

  // 添加客户
  const addCustomer = useCallback(async (data: CustomerFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createCustomer(data);
      if (response.success && response.data) {
        setCustomers(prev => [...prev, response.data!]);
        syncAddCustomer(response.data);
      } else {
        throw new Error(response.error || '添加客户失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 更新客户
  const updateCustomer = useCallback(async (id: string, data: CustomerFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateCustomerApi(id, data);
      if (response.success && response.data) {
        setCustomers(prev => 
          prev.map(customer => customer.id === id ? response.data! : customer)
        );
        syncUpdateCustomer(response.data);
      } else {
        throw new Error(response.error || '更新客户失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 删除客户
  const deleteCustomer = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const customerToDelete = customers.find(c => c.id === id);
      if (!customerToDelete) {
        throw new Error('客户不存在');
      }

      const response = await deleteCustomerApi(id);
      if (response.success) {
        setCustomers(prev => prev.filter(customer => customer.id !== id));
        syncDeleteCustomer(customerToDelete);
      } else {
        throw new Error(response.error || '删除客户失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [customers]);

  const selectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  const clearSelectedCustomer = useCallback(() => {
    setSelectedCustomer(null);
  }, []);

  const value = {
    customers,
    selectedCustomer,
    isLoading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    selectCustomer,
    clearSelectedCustomer,
    refreshCustomers,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}; 