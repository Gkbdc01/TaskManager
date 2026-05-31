import React, { useState } from 'react';

const TaskCard = ({ task, onMove, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const isTodo = task.stage === 'Todo';
  const isDone = task.stage === 'Done';
  const accentColor = isTodo ? '#fbbf24' : task.stage === 'In Progress' ? '#3b82f6' : '#10b981';

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    await onUpdate(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 group relative"
      style={{ borderLeftColor: accentColor }}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Edit Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Edit Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none text-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button
              onClick={handleCancel}
              className="text-xs px-2.5 py-1 text-gray-500 hover:bg-gray-100 rounded border font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs px-2.5 py-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded font-medium shadow-sm transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-gray-900 text-sm tracking-tight break-words flex-1">
              {task.title}
            </h4>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-indigo-600 p-1 rounded-md text-xs hover:bg-gray-50"
                title="Edit Task"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-gray-400 hover:text-red-500 p-1 rounded-md text-xs hover:bg-gray-50"
                title="Delete Task"
              >
                🗑️
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed break-words line-clamp-3">
              {task.description}
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <button
              disabled={isTodo}
              onClick={() => onMove(task._id, task.stage, 'backward')}
              className="text-xs font-semibold px-2 py-1 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 disabled:opacity-0 transition-all duration-150"
            >
              ← Back
            </button>
            <button
              disabled={isDone}
              onClick={() => onMove(task._id, task.stage, 'forward')}
              className="text-xs font-semibold px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 disabled:opacity-0 transition-all duration-150"
            >
              Advance →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;