import React, { useEffect } from 'react'
import { CustomerForm } from './components/CustomerForm'
import { CustomerFormData } from './types/customer'
import { initTelegramApp } from './utils/telegram'

const App: React.FC = () => {
  useEffect(() => {
    // 初始化 Telegram WebApp
    initTelegramApp();
  }, []);

  const handleSubmit = (data: CustomerFormData) => {
    // 发送数据到 Telegram Bot
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.sendData(JSON.stringify({
        action: 'add',
        customer: data
      }));
      webApp.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-lg font-medium text-gray-900 mb-4">
              添加新客户
            </h1>
            <CustomerForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 