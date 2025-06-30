import Resource from '../models/Resource.js';

// GET /api/resources
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

// POST /api/resources
export const createResource = async (req, res) => {
  const { title, type, description, link, embedUrl } = req.body;
  try {
    const newResource = new Resource({ title, type, description, link, embedUrl });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create resource' });
  }
};

// DELETE /api/resources/:id
export const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete resource' });
  }
};
