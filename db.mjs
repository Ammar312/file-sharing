import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Successfully Connected to Database");
    });
    connection.on("error", (error) => {
      console.error("Database Connection Error:", error);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
connectDB();
export default connectDB;
