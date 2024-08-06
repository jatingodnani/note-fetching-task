import mongoose, { Connection } from 'mongoose';

const connectDB = async (): Promise<Connection | void> => {
    try {
      if (!process.env.URL) {
        throw new Error('MongoDB connection string is not defined in environment variables');
      }
  
      const conn = await mongoose.connect(process.env.URL);
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn.connection;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

export default connectDB;
