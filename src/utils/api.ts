import { Customer, CustomerFormData } from '../types/customer';

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟 API 响应
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 获取客户列表
export const fetchCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  try {
    await delay(500); // 模拟网络延迟
    const customers = localStorage.getItem('telegram-crm-customers');
    return {
      success: true,
      data: customers ? JSON.parse(customers) : []
    };
  } catch (error) {
    return {
      success: false,
      error: '获取客户列表失败'
    };
  }
};

// 添加新客户
export const createCustomer = async (data: CustomerFormData): Promise<ApiResponse<Customer>> => {
  try {
    await delay(500);
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    
    // 获取现有客户列表
    const existingCustomers = await fetchCustomers();
    const updatedCustomers = [...(existingCustomers.data || []), newCustomer];
    
    // 保存更新后的列表
    localStorage.setItem('telegram-crm-customers', JSON.stringify(updatedCustomers));
    
    return {
      success: true,
      data: newCustomer
    };
  } catch (error) {
    return {
      success: false,
      error: '添加客户失败'
    };
  }
};

// 更新客户信息
export const updateCustomer = async (id: string, data: CustomerFormData): Promise<ApiResponse<Customer>> => {
  try {
    await delay(500);
    const customers = await fetchCustomers();
    const customerList = customers.data || [];
    
    const updatedCustomers = customerList.map(customer =>
      customer.id === id ? { ...customer, ...data } : customer
    );
    
    localStorage.setItem('telegram-crm-customers', JSON.stringify(updatedCustomers));
    const updatedCustomer = updatedCustomers.find(c => c.id === id);
    
    if (!updatedCustomer) {
      throw new Error('客户不存在');
    }
    
    return {
      success: true,
      data: updatedCustomer
    };
  } catch (error) {
    return {
      success: false,
      error: '更新客户信息失败'
    };
  }
};

// 删除客户
export const deleteCustomer = async (id: string): Promise<ApiResponse<void>> => {
  try {
    await delay(500);
    const customers = await fetchCustomers();
    const customerList = customers.data || [];
    
    const updatedCustomers = customerList.filter(customer => customer.id !== id);
    localStorage.setItem('telegram-crm-customers', JSON.stringify(updatedCustomers));
    
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: '删除客户失败'
    };
  }
}; 