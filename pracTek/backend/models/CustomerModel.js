const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  msp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Msp', required: true }, 
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  is_dtc: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profile_photo: { type: String, required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);
