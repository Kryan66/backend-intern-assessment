const User = require("../models/User");

// GET ALL USERS (PAGINATED)
exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select("-password")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalUsers: total,
    users,
  });
};

// ACTIVATE USER
exports.activateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: true });
  res.json({ message: "User activated successfully" });
};

// DEACTIVATE USER
exports.deactivateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "User deactivated successfully" });
};
