const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  stage: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);