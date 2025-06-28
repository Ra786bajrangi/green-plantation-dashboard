import Plantation from '../models/Plantation.js';
import User from '../models/User.js'; 

export const createPlantation = async (req, res) => {
  const { location, numberOfTrees, date, coordinates } = req.body;

  if (!location || !numberOfTrees || !date || !coordinates?.lat || !coordinates?.lng) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const plantation = await Plantation.create({
      user: req.user._id,
      location,
      numberOfTrees,
      date,
      coordinates,
    });
     await User.findByIdAndUpdate(req.user._id, {
      $inc: { plantations: numberOfTrees }
    });
    res.status(201).json(plantation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getPlantations = async (req, res) => {
  try {
    const plantations = await Plantation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(plantations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch plantations' });
  }
};

export const getAllPlantations = async (req, res) => {
  try {
    const plantations = await Plantation.find()
      .populate("user", "username")  
      .sort({ createdAt: -1 });

    res.json(plantations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch plantations" });
  }
};
export const getLeaderboard = async (req, res) => {
  try {
    const data = await Plantation.aggregate([
      {
        $group: {
          _id: "$user",
          totalTrees: { $sum: "$numberOfTrees" },
        },
      },
      { $sort: { totalTrees: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          totalTrees: 1,
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
