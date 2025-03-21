import React from 'react';

export type NavPage = 'dashboard' | 'customers' | 'todos' | 'notification';

interface BottomNavigationProps {
  currentPage: NavPage;
  onChangePage: (page: NavPage) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage, 
  onChangePage 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2">
      <button 
        className={`flex flex-col items-center justify-center w-full h-full ${
          currentPage === 'dashboard' ? 'text-blue-500' : 'text-gray-500'
        }`}
        onClick={() => onChangePage('dashboard')}
      >
        <div className={`w-6 h-6 mb-1 rounded-full ${
          currentPage === 'dashboard' ? 'bg-blue-500' : 'bg-gray-300'
        }`}></div>
        <span className="text-xs">主页</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center w-full h-full ${
          currentPage === 'customers' ? 'text-blue-500' : 'text-gray-500'
        }`}
        onClick={() => onChangePage('customers')}
      >
        <div className={`w-6 h-6 mb-1 rounded-full ${
          currentPage === 'customers' ? 'bg-blue-500' : 'bg-gray-300'
        }`}></div>
        <span className="text-xs">客户</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center w-full h-full ${
          currentPage === 'todos' ? 'text-blue-500' : 'text-gray-500'
        }`}
        onClick={() => onChangePage('todos')}
      >
        <div className={`w-6 h-6 mb-1 rounded-full ${
          currentPage === 'todos' ? 'bg-blue-500' : 'bg-gray-300'
        }`}></div>
        <span className="text-xs">待办</span>
      </button>
      
      <button 
        className={`flex flex-col items-center justify-center w-full h-full ${
          currentPage === 'notification' ? 'text-blue-500' : 'text-gray-500'
        }`}
        onClick={() => onChangePage('notification')}
      >
        <div className="relative">
          <div className={`w-6 h-6 mb-1 rounded-full ${
            currentPage === 'notification' ? 'bg-blue-500' : 'bg-gray-300'
          }`}></div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
        </div>
        <span className="text-xs">通知</span>
      </button>
    </div>
  );
};