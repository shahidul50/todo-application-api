import mongoose from 'mongoose'

const URL = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_DB : process.env.PRODUCTION_DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    //console.log('DB connection successfull')
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1)    //{confision line}
  }
}

export default connectDB