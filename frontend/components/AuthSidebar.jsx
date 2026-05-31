import React from 'react';

const AuthSidebar = () => {
  return (
    <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-indigo-50/50 border-b lg:border-b-0 lg:border-r border-gray-100">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            T
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">Task Manager</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 leading-tight mb-3">
          Simplify your daily team tasks.
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
          A clean, high-performance workspace designed to organize items, track progress, and complete projects with zero hassle.
        </p>
      </div>

      <div className="space-y-4 my-8 lg:my-0">
        <div className="flex gap-3 items-center text-sm font-medium text-gray-700">
          <span className="text-indigo-600 font-bold">✓</span>
          <span>Visual Kanban Board View</span>
        </div>
        <div className="flex gap-3 items-center text-sm font-medium text-gray-700">
          <span className="text-indigo-600 font-bold">✓</span>
          <span>Instant UI Drag-and-Drop Updates</span>
        </div>
        <div className="flex gap-3 items-center text-sm font-medium text-gray-700">
          <span className="text-indigo-600 font-bold">✓</span>
          <span>Secure Session Encryption</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 font-medium">
        Designed for modern development workflows.
      </div>
    </div>
  );
};

export default AuthSidebar;