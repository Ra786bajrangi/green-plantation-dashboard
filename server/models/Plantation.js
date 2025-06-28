import mongoose from 'mongoose';

const plantationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  numberOfTrees: { type: Number, required: true },
  date: { type: Date, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
}, { timestamps: true });

const Plantation = mongoose.model('Plantation', plantationSchema);
export default Plantation;
