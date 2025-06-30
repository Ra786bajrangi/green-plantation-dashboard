import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['article', 'video', 'tip'], required: true },
    description: { type: String },
    link: { type: String }, // For article or video
    embedUrl: { type: String }, // For embedded YouTube videos
  },
  { timestamps: true }
);

export default mongoose.model('Resource', resourceSchema);
