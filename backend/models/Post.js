import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       String,
  category:    String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:   { type: Date, default: Date.now },
  approved:    { type: Boolean, default: false },
  status:      { type: String, default: 'pending' },
  likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

export default mongoose.model('Post', postSchema);
