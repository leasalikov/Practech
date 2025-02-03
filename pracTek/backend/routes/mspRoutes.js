const express = require('express');
const {
  getAllMsps,
  createMsp,
  updateMsp,
  deleteMsp,
  getMspById
} = require('../controllers/mspController');
const validateObjectId = require('../middlewares/validateObjectId');
const mongoose = require('mongoose');

const router = express.Router();


// Routes
router.get('/', getAllMsps);               // Get all MSPs
router.get('/:id', validateObjectId('id'), getMspById);  // Get MSP by ID
router.post('/', createMsp);               // Create a new MSP
router.put('/:id', validateObjectId('id'), updateMsp);   // Update an MSP by ID
router.delete('/:id', validateObjectId('id'), deleteMsp); // Delete an MSP by ID

module.exports = router;
