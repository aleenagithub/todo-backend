const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRouter = require('./routes/loginRouter'); // Adjust the path if needed
const userRouter =require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', loginRouter);
app.use('/api', userRouter);
app.use('/api', taskRouter);


// Connect to MongoDB
mongoose.connect('mongodb+srv://aleena_11:aleena_11@cluster0.dkjmoah.mongodb.net/todoodb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
