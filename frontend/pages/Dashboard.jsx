import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTask';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, createTask, moveTask, deleteTask, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title, description, 'Todo');
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const columns = ['Todo', 'In Progress', 'Done'];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-xl tracking-wider shadow-md shadow-indigo-200">
            TM
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Task Manager</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
            👋 Welcome, <strong className="text-gray-900">{user?.name}</strong>
          </span>
          <button
            onClick={logout}
            className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-950">Project Board</h2>
          <p className="text-sm text-gray-500 mt-1">Manage, sort, and optimize your production milestones seamlessly.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-100 transition-all duration-150 transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <span className="text-lg font-bold">+</span> <span>Add Task</span>
        </button>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {columns.map((col) => {
              const columnTasks = tasks.filter((t) => t.stage === col);
              return (
                <div key={col} className="bg-gray-100 border rounded-2xl p-4 flex flex-col min-h-[500px]">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-gray-800">{col}</h3>
                    <span className="bg-white border text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                      {columnTasks.length}
                    </span>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    {columnTasks.length === 0 ? (
                      <div className="border border-dashed rounded-xl py-8 text-center text-sm text-gray-400 bg-gray-50/50">
                        No tasks here
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onMove={moveTask}
                          onDelete={deleteTask}
                          onUpdate={updateTask}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 transform scale-100 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Board Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-semibold px-2 py-1 rounded-lg hover:bg-gray-50"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Fix API Connection Bug"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Description (Optional)</label>
                <textarea
                  placeholder="Add a detailed context regarding this milestone..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;