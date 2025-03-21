import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos.length > 0 ? initialTodos : [
    { id: 1, title: '联系新客户李先生', completed: false, dueDate: '2025-03-22', priority: 'high', category: '客户' },
    { id: 2, title: '完成月度客户报表', completed: false, dueDate: '2025-03-25', priority: 'medium', category: '报表' },
    { id: 3, title: '参加部门周会', completed: false, dueDate: '2025-03-22', priority: 'high', category: '会议' },
    { id: 4, title: '更新客户资料', completed: true, dueDate: '2025-03-21', priority: 'medium', category: '客户' },
    { id: 5, title: '准备季度业绩报告', completed: false, dueDate: '2025-03-30', priority: 'high', category: '报表' }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // 获取所有类别
  const categories = [...new Set(todos.map(todo => todo.category).filter(Boolean) as string[])];
  
  // 今天的日期
  const today = new Date().toISOString().split('T')[0];
  
  // 过滤后的待办事项
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => !categoryFilter || todo.category === categoryFilter);
  
  // 按到期日期和优先级排序
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // 首先按完成状态排序
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // 然后按到期日期排序
    if (a.dueDate !== b.dueDate) {
      return a.dueDate < b.dueDate ? -1 : 1;
    }
    
    // 最后按优先级排序
    const priorityValue = { high: 0, medium: 1, low: 2 };
    return priorityValue[a.priority] - priorityValue[b.priority];
  });
  
  // 今日待办
  const todayTodos = sortedTodos.filter(todo => todo.dueDate === today);
  
  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">我的待办事项</h2>
        
        {/* 筛选选项 */}
        <div className="mb-6">
          <div className="flex space-x-2 mb-3">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('active')}
            >
              未完成
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setFilter('completed')}
            >
              已完成
            </button>
          </div>
          
          {/* 类别筛选 */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-xs ${
                  !categoryFilter ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setCategoryFilter(null)}
              >
                所有类别
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs ${
                    categoryFilter === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* 今日待办 */}
        {todayTodos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">今日待办</h3>
            <div className="space-y-2">
              {todayTodos.map(todo => (
                <div 
                  key={todo.id}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    todo.completed ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 rounded-full border-2 border-blue-500"
                  />
                  <div className="flex-1">
                    <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {todo.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">今天</span>
                      {todo.category && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">{todo.category}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        todo.priority === 'high' ? 'bg-red-100 text-red-600' :
                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {todo.priority === 'high' ? '紧急' : 
                         todo.priority === 'medium' ? '普通' : '低优先级'}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="block w-5 h-5 bg-gray-300 rounded-full"></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 所有待办 */}
        <div>
          <h3 className="text-lg font-medium mb-3">所有待办</h3>
          {sortedTodos.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              暂无待办事项
            </div>
          ) : (
            <div className="space-y-2">
              {sortedTodos.map(todo => (
                <div 
                  key={todo.id}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    todo.completed ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 rounded-full border-2 border-blue-500"
                  />
                  <div className="flex-1">
                    <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {todo.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {todo.dueDate === today ? '今天' : todo.dueDate}
                      </span>
                      {todo.category && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">{todo.category}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        todo.priority === 'high' ? 'bg-red-100 text-red-600' :
                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {todo.priority === 'high' ? '紧急' : 
                         todo.priority === 'medium' ? '普通' : '低优先级'}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="block w-5 h-5 bg-gray-300 rounded-full"></span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 添加按钮 */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-blue-600">
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
};