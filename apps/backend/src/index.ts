import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend API Running");
});

app.listen(8096, () => {
  console.log("Backend running on http://localhost:8096");
});
