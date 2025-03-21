import { Customer } from '../types/customer';

const STORAGE_KEY = 'telegram-crm-customers';

// 保存客户数据到本地存储
export const saveCustomers = (customers: Customer[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error('保存客户数据失败:', error);
  }
};

// 从本地存储加载客户数据
export const loadCustomers = (): Customer[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('加载客户数据失败:', error);
    return [];
  }
};

// 清除本地存储的客户数据
export const clearCustomers = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除客户数据失败:', error);
  }
}; 