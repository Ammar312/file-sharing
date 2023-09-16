import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  const connection = mongoose.connection;
  connection
    .once("open", () => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Connection close");
    });
};
