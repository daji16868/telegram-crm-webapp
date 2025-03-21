import { Customer } from '../types/customer';
import { sendDataToTelegram } from './telegram';

// 同步类型定义
export type SyncAction = 'add' | 'update' | 'delete';

export interface SyncData {
  action: SyncAction;
  customer: Customer;
}

// 发送数据到 Telegram Bot
export const syncWithTelegram = (action: SyncAction, customer: Customer) => {
  const syncData: SyncData = {
    action,
    customer,
  };
  
  sendDataToTelegram(syncData);
};

// 添加客户时同步
export const syncAddCustomer = (customer: Customer) => {
  syncWithTelegram('add', customer);
};

// 更新客户时同步
export const syncUpdateCustomer = (customer: Customer) => {
  syncWithTelegram('update', customer);
};

// 删除客户时同步
export const syncDeleteCustomer = (customer: Customer) => {
  syncWithTelegram('delete', customer);
}; 