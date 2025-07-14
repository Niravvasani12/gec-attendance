const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); //  Load variables from .env

const app = express();
app.use(cors());
app.use(express.json());

//  Use .env value for MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err.message));

//  Mongoose Schema
const attendanceSchema = new mongoose.Schema({
  studentNumber: String,
  standard: String,
  division: String,
  enrollment: String,
  time: String,
  role: String,
});
const Attendance = mongoose.model("Attendance", attendanceSchema);

//  POST: Add attendance
app.post("/api/attendance", async (req, res) => {
  try {
    const newRecord = new Attendance(req.body);
    await newRecord.save();
    res.status(201).json({ message: "Attendance saved" });
  } catch (err) {
    console.error("POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});
//  GET: All records
app.get("/api/attendance", async (req, res) => {
  try {
    const all = await Attendance.find({});
    res.status(200).json(all);
  } catch (err) {
    console.error("GET all error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Records by enrollment
app.get("/api/attendance/:enrollment", async (req, res) => {
  try {
    const records = await Attendance.find({
      enrollment: req.params.enrollment,
    });
    res.status(200).json(records);
  } catch (err) {
    console.error("GET by enrollment error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//  DELETE: By ID
app.delete("/api/attendance/:id", async (req, res) => {
  try {
    const result = await Attendance.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Record not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE by ID error:", error.message);
    res.status(500).json({ error: "Delete failed on server" });
  }
});

//  DELETE: All records
app.delete("/api/attendance", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.status(200).json({ message: "All records cleared" });
  } catch (err) {
    console.error("DELETE all error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server using .env PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

app.use(
  cors({
    origin: ["http://localhost:5000", "https://gec-attendance.vercel.app"],
  })
);
