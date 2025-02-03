const mongoose = require('mongoose');

const MspSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String},
  birthday: { type: Date },
  profession: { type: String },
  street_address: { type: String },
  city: { type: String },
  postal_code: { type: String },
  created_at: { type: Date, default: Date.now },
  photo: { type: String},
  personal_documents: [{ type: String }],  // Array of document links
  app_settings: {
    enable_notification: { type: Boolean, default: false },
    enable_alerts_reminders: { type: Boolean, default: false },
    mfa: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Msp', MspSchema);
