const express = require('express');
const {
  createCustomer,
  getCustomersByMsp,
  getAllCustomers,
  deleteCustomer,
  updateCustomer, 
  getCustomerById
} = require('../controllers/customerController');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

router.post('/', createCustomer);  // יצירת לקוח חדש
router.get('/', getAllCustomers);  // קבלת כל הלקוחות
router.get('/msp/:mspId', validateObjectId('mspId'), getCustomersByMsp);  // קבלת לקוחות לפי MSP
router.get('/:id', validateObjectId('id'), getCustomerById);  // קבלת לקוח לפי ID
router.put('/:id', validateObjectId('id'), updateCustomer);  // עדכון לקוח
router.delete('/:id', validateObjectId('id'), deleteCustomer);  // מחיקת לקוח

module.exports = router;
