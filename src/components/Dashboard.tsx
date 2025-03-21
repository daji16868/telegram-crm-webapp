import React from 'react';
import { Customer } from '../types/customer';

interface DashboardProps {
  customers: Customer[];
  username?: string;
  organization?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  customers = [], 
  username = "经理", 
  organization = "默认组织" 
}) => {
  const newCustomersThisMonth = customers.filter(c => {
    const date = new Date(c.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const conversionRate = customers.length > 0 ? 75 : 0; // 示例数据

  // 模拟待办数据
  const todos = [
    { id: 1, title: '联系新客户李先生', time: '10:30' },
    { id: 2, title: '完成月度客户报表', time: '14:00' },
    { id: 3, title: '参加部门周会', time: '16:30' }
  ];

  // 模拟通知数据
  const notifications = [
    { id: 1, title: '客户数据导出功能上线更新', content: '新版本已发布，支持批量导出客户数据', time: '刚刚', type: '更新' },
    { id: 2, title: '新成员加入团队', content: '陈经理已加入您的团队', time: '昨天', type: '团队' },
    { id: 3, title: '业绩报表已生成', content: '您的月度业绩报表已生成', time: '2天前', type: '报表' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* 欢迎信息 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">欢迎回来，{username}</h2>
        <p className="text-gray-600">所属组织 {organization}</p>
        
        {/* 统计数据 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{customers.length}</p>
            <p className="text-sm text-gray-600">我的客户</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{newCustomersThisMonth.length}</p>
            <p className="text-sm text-gray-600">本月新增</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{conversionRate}%</p>
            <p className="text-sm text-gray-600">转化率</p>
          </div>
        </div>
      </div>
      
      {/* 今日待办 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">今日待办</h2>
          <button className="text-blue-500 text-sm">查看全部</button>
        </div>
        <div className="space-y-3">
          {todos.map(todo => (
            <div key={todo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-800">{todo.title}</p>
              <p className="text-sm text-gray-500">{todo.time}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 快捷操作 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">快捷操作</h2>
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
            <span className="block w-8 h-8 bg-blue-500 rounded-full mb-2"></span>
            <span className="text-xs">添加客户</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100">
            <span className="block w-8 h-8 bg-green-500 rounded-full mb-2"></span>
            <span className="text-xs">客户列表</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100">
            <span className="block w-8 h-8 bg-purple-500 rounded-full mb-2"></span>
            <span className="text-xs">组织架构</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span className="block w-8 h-8 bg-gray-500 rounded-full mb-2"></span>
            <span className="text-xs">设置</span>
          </button>
        </div>
      </div>
      
      {/* 系统通知 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">系统通知</h2>
          <button className="text-blue-500 text-sm">全部已读</button>
        </div>
        
        {/* 通知类型选择 */}
        <div className="flex space-x-2 mb-4">
          <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">全部</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">更新</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">团队</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">系统</button>
        </div>
        
        {/* 通知列表 */}
        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className="p-3 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {notification.title}
                </h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
              {notification.id === 1 && (
                <div className="flex space-x-2 mt-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">查看详情</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">立即更新</button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-center text-blue-500 border border-blue-500 rounded-lg">
          查看更多通知
        </button>
      </div>
    </div>
  );
};