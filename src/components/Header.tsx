import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          客户信息管理系统
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          请填写客户信息，系统将自动检查是否存在重复客户
        </p>
      </div>
    </header>
  );
};

export default Header; 