const Customer = require('../models/CustomerModel');
//const { createAuditLog } = require('../controllers/auditLogController');

// GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('msp_id');  
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('msp_id');
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new customer
exports.createCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  try {
    const newCustomer = await customer.save();

    // Audit Log Entry
    // await createAuditLog(req.user.id, req.user.userType, 'Created Customer', newCustomer._id);

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a customer by ObjectId
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });

    // Audit Log Entry
    // await createAuditLog(req.user.id, req.user.userType, 'Updated Customer', updatedCustomer._id);

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a customer by ObjectId
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    // Audit Log Entry
    // await createAuditLog(req.user.id, req.user.userType, 'Deleted Customer', req.params.id);

    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all customers of a specific MSP
exports.getCustomersByMsp = async (req, res) => {
  try {
    const mspId = req.params.mspId;
    const customers = await Customer.find({ msp_id: mspId }).populate('msp_id');
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
