const db = require('../models');
const Policy = db.Policy;

exports.uploadPolicy = async (req, res) => {
  try {
    const { title, fileUrl } = req.body;
    const policy = await Policy.create({ title, fileUrl });
    res.status(201).json(policy);
  } catch (error) {
    console.error("Upload policy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.findAll();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Fetch policies error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
