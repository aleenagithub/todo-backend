const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['start', 'in-progress', 'completed'],
    default: 'start',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
