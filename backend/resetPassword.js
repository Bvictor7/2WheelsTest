import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const newHash = await bcrypt.hash('ALCATELpopc7', 10);
    const result = await mongoose.connection
      .collection('users')
      .updateOne(
        { email: 'belahcene2@gmail.com' },
        { $set: { password: newHash } }
      );
    console.log('🛠️ Password updated:', result.modifiedCount);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

run();
