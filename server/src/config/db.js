import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gbp_post_manager');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`⚠️ Running with database connection warning. Ensure MongoDB is running on ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gbp_post_manager'}`);
  }
};
