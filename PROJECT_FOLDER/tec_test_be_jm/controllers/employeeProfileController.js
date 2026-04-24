const profileService = require("../services/employeeProfileService");

// CREATE or UPDATE (upsert)
exports.createProfile = async (req, res) => {
  try {
    const result = await profileService.createProfile(req.body);
    const status = result.action === "created" ? 201 : 200;
    const message = result.action === "created" ? "Profile created" : "Profile updated (already existed)";
    res.status(status).json({ message, data: result.data });
  } catch (err) {
    if (err.message === "EMPLOYEE_NOT_FOUND")
      return res.status(404).json({ message: "Employee not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllProfiles = async (req, res) => {
  try {
    const data = await profileService.getAllProfiles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE BY ID
exports.getProfileById = async (req, res) => {
  try {
    const data = await profileService.getProfileById(req.params.id);
    res.json(data);
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Profile not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET BY EMPLOYEE ID
exports.getProfileByEmployeeId = async (req, res) => {
  try {
    const data = await profileService.getProfileByEmployeeId(req.params.employeeId);
    res.json(data);
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Profile not found" });
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProfile = async (req, res) => {
  try {
    const result = await profileService.updateProfile(req.params.id, req.body);
    res.json({ message: "Profile updated", data: result });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Profile not found" });
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.params.id);
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Profile not found" });
    res.status(500).json({ error: err.message });
  }
};
