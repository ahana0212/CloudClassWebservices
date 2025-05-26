const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDB = require("./config/databaseConfig");
const userRoutes = require("./routes/users")
const assignmentRoutes = require("./routes/assignment");
const uploadedAssignmentRoutes = require("./routes/uploadedAssignmentRoutes");
const videoLectureRoutes = require("./routes/videoLectureRoutes");

const dotenv = require("dotenv");

dotenv.config();

const PORT = 8000;

// app.set("view engine", "ejs"); // Set EJS as the templating engine
// app.set("views", "./views"); // Views folder

const app = express();


app.use(cors({
    origin: ["http://localhost:5173"],
  }));
app.use(bodyParser.json());


// api connectors

app.use("/api/users", userRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/uploaded-assignment", uploadedAssignmentRoutes);
app.use("/api/video-lecture", videoLectureRoutes);


app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Howdy appliation is working fine...");
  res.end("Howdy appliation is working fine...");
});

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      // Use httpServer instead of app
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
