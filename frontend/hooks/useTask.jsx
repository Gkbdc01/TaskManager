import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (title, description, stage) => {
    const response = await api.post('/tasks', { title, description, stage });
    setTasks((prev) => [...prev, response.data]);
    return response.data;
  };

  const moveTask = async (id, currentStage, direction) => {
    const stages = ['Todo', 'In Progress', 'Done'];
    const currentIndex = stages.indexOf(currentStage);
    let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= stages.length) return;
    const newStage = stages[nextIndex];

    try {
      // Optimistic UI Update
      setTasks((prev) => prev.map(t => t._id === id ? { ...t, stage: newStage } : t));
      await api.put(`/tasks/${id}`, { stage: newStage });
    } catch (err) {
      console.error(err);
      fetchTasks(); // Rollback on failure
    }
  };

  const deleteTask = async (id) => {
    try {
      setTasks((prev) => prev.filter(t => t._id !== id));
      await api.delete(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
      fetchTasks();
    }
  };

const updateTask = async (id, updatedFields) => {
  try {
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...updatedFields } : t))
    );
    
    await api.put(`/tasks/${id}`, updatedFields);
  } catch (err) {
    console.error('Failed to update task text:', err);
    fetchTasks();
  }
};

return { tasks, loading, createTask, moveTask, deleteTask, updateTask };
};