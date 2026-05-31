const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    // Create task bound directly to the authorized user's ID
    const task = await Task.create({
      user: req.user,
      title,
      description,
      stage: stage || 'Todo' 
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating task', error: error.message });
  }
};

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching tasks', error: error.message });
  }
};

// @desc    Update a task (Content or Column Stage swap)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: 'User not authorized to modify this task' });
    }

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.stage = stage || task.stage;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: 'User not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};