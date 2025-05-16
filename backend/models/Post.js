import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       String,
  category:    String,
  author:      { type: String, required: true },
  createdAt:   { type: Date, default: Date.now },
  approved:    { type: Boolean, default: false }      // ← nouveau champ
});

export default mongoose.model('Post', postSchema);
