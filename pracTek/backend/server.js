const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mspRoutes = require('./routes/mspRoutes');
// const customerRoutes = require('./routes/customerRoutes');
// const vendorRoutes = require('./routes/vendorRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const policyRoutes = require('./routes/policyRoutes');
// const sraRoutes = require('./routes/sraRoutes');
// const baaRoutes = require('./routes/baaRoutes');
// const auditLogRoutes = require('./routes/auditLogRoutes');
// const reminderRoutes = require('./routes/reminderRoutes');
// const frameworkRoutes = require('./routes/frameworkRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const employeeTaskRoutes = require('./routes/employeeTaskRoutes');
// const passwordRoutes = require('./routes/passwordRoutes');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/msps', mspRoutes); // נתיבים לניהול MSPs
// app.use('/api/customers', customerRoutes); // נתיבים לניהול לקוחות
// app.use('/api/vendors', vendorRoutes); // נתיבים לניהול ספקים
// app.use('/api/employees', employeeRoutes); // נתיבים לניהול ספקים
// app.use('/api/projects', projectRoutes); // נתיבים לניהול ספקים
// app.use('/api/policies', policyRoutes); //Routes for handling policies documents
// app.use('/api/sras', sraRoutes); //Routes for handling sra's documents
// app.use('/api/baas', baaRoutes); //Routes for handling baa's documents
// app.use('/api/audit-logs', auditLogRoutes); //Routes for handling audit logs
// app.use('/api/reminders', reminderRoutes); //Routes for handling reminders
// app.use('/api/frameworks', frameworkRoutes); //Routes for hadnling frameworks
// app.use('/api/tasks', taskRoutes); //Routes for handling tasks - actual steps of implementing the framework
// app.use('/api/employee-tasks', employeeTaskRoutes); //Routes for handling and managaing the tasks to be done by employees, seniors or anyone else
// app.use('/api/passwords', passwordRoutes); //Routes for handling and managing pws - should be stored in a secure evniornment





// Default route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));