const Msp = require('../models/MspModel');
//const { createAuditLog } = require('../controllers/auditLogController');

// GET all MSPs
exports.getAllMsps = async (req, res) => {
  try {
    const msps = await Msp.find();
    res.status(200).json(msps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MSP by _id
exports.getMspById = async (req, res) => {
  try {
    const msp = await Msp.findById(req.params.id);  // Use findById with ObjectId
    if (!msp) return res.status(404).json({ message: 'MSP not found' });
    res.status(200).json(msp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new MSP
exports.createMsp = async (req, res) => {
  try {
    let { personal_documents, ...mspData } = req.body;

    // Ensure personal_documents is an array of strings
    if (personal_documents && Array.isArray(personal_documents)) {
      personal_documents = personal_documents.map(doc => doc.document || doc);
    } else {
      personal_documents = [];
    }

    // Create new MSP with personal_documents as an array of strings
    const msp = new Msp({ ...mspData, personal_documents });

    const newMsp = await msp.save();

    // Audit Log Entry
    // await createAuditLog(req.user.id, req.user.userType, 'Created MSP', newMsp._id);

    res.status(201).json(newMsp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an MSP
exports.updateMsp = async (req, res) => {
  try {
    // Find the MSP document by _id
    const msp = await Msp.findById(req.params.id);
    if (!msp) return res.status(404).json({ message: 'MSP not found' });

    // Update top-level fields dynamically (e.g., phone, photo)
    for (const key in req.body) {
      if (key !== 'app_settings' && key !== 'personal_documents') {
        msp[key] = req.body[key];
      }
    }

    // Update the app_settings fields dynamically without overwriting the object
    if (req.body.app_settings) {
      Object.assign(msp.app_settings, req.body.app_settings);
    }

    // If personal_documents is provided, replace it
    if (req.body.personal_documents) {
      msp.personal_documents = req.body.personal_documents;
    }

    // Save the updated MSP document
    const updatedMsp = await msp.save();

    // Audit Log Entry (commented out for now)
    // await createAuditLog(req.user.id, req.user.userType, 'Updated MSP', updatedMsp._id);

    res.status(200).json(updatedMsp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE an MSP
exports.deleteMsp = async (req, res) => {
  try {
    const msp = await Msp.findByIdAndDelete(req.params.id);  // Use findByIdAndDelete with ObjectId
    if (!msp) return res.status(404).json({ message: 'MSP not found' });

    // Audit Log Entry
    // await createAuditLog(req.user.id, req.user.userType, 'Deleted MSP', req.params.id);

    res.status(200).json({ message: 'MSP deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
