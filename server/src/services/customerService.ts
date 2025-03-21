import { Customer, CustomerFormData } from '../types/customer';
import { v4 as uuidv4 } from 'uuid';

class CustomerService {
  private customers: Map<string, Customer> = new Map();

  // 添加新客户
  async addCustomer(data: CustomerFormData): Promise<Customer> {
    const customer: Customer = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString()
    };
    this.customers.set(customer.id, customer);
    return customer;
  }

  // 获取所有客户
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  // 获取单个客户
  async getCustomer(id: string): Promise<Customer | null> {
    return this.customers.get(id) || null;
  }

  // 更新客户信息
  async updateCustomer(id: string, data: Partial<CustomerFormData>): Promise<Customer | null> {
    const customer = this.customers.get(id);
    if (!customer) {
      return null;
    }

    const updatedCustomer = {
      ...customer,
      ...data
    };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  // 删除客户
  async deleteCustomer(id: string): Promise<boolean> {
    return this.customers.delete(id);
  }

  // 根据搜索条件查找客户
  async searchCustomers(query: string): Promise<Customer[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.customers.values()).filter(customer => 
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.phone.includes(query) ||
      customer.email.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// 导出单例实例
export const customerService = new CustomerService(); 