
const express = require("express");


const mongoose = require("mongoose");
const server = '127.0.0.1:27017'; 
const database = 'testdb'; 
const mongodb = `mongodb://${server}/${database}`;


mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  const db = mongoose.connection;

  db.on("error", (error) => console.error("MongoDB connection error:", error));
  db.once("open", () => console.log("Connected to MongoDB"));
  
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    console.log("kkk");
  });
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});

