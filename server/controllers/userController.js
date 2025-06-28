import Plantation from '../models/Plantation.js';
import User from '../models/User.js';

// @desc Get user summary (contribution, trees count)
export const getUserSummary = async (req, res) => {
  try {
    const plantations = await Plantation.find({ user: req.user._id }).sort({ date: -1 });

    const totalTrees = plantations.reduce((sum, p) => sum + Number(p.numberOfTrees), 0);

    res.json({
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar, 
      totalTrees,
      totalPlantations: plantations.length,
      recentPlantations: plantations.slice(0, 3),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user summary' });
  }
};
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { username } = req.body;
  const avatar = req.file?.path;

  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { username, ...(avatar && { avatar }) },
    { new: true }
  ).select('-password');

  res.json(updated);
};