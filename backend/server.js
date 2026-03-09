const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const app = express();
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Employee Management System Backend');
});

// Database Connection
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);