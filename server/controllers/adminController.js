import Plantation from '../models/Plantation.js';
import User from '../models/User.js';

// Admin Dashboard Summary
export const getAdminDashboardSummary = async (req, res) => {
  try {
    const plantations = await Plantation.find().populate("user", "username");
    const users = await User.find();

    const totalTrees = plantations.reduce((sum, p) => sum + p.numberOfTrees, 0);
    const totalPlantations = plantations.length;

    const leaderboard = [];

    users.forEach(user => {
      const userPlantations = plantations.filter(
        (p) => p.user && p.user._id.equals(user._id)
      );
      const treeCount = userPlantations.reduce((sum, p) => sum + p.numberOfTrees, 0);
      if (treeCount > 0) {
        leaderboard.push({
          username: user.username,
          totalTrees: treeCount,
        });
      }
    });

    leaderboard.sort((a, b) => b.totalTrees - a.totalTrees);

    const recent = plantations
      .filter(p => p.user) // Only include plantations with valid users
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totalTrees,
      totalPlantations,
      leaderboard,
      recentPlantations: recent,
    });
  } catch (err) {
    console.error('Summary Error:', err);
    res.status(500).json({ message: "Failed to load admin dashboard" });
  }
};

// Get All Users (excluding admins)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Toggle User Active/Inactive
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle user status' });
  }
};

// Delete User by ID + optional: delete their plantations
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin user' });

    // Optional: Delete user's plantations
    await Plantation.deleteMany({ user: user._id });

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
