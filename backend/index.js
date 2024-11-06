const app = require("express")();
const mongoose = require("mongoose");
const Report = require("./models/Report");
const cors = require("cors");

app.use(cors());
app.use(require("express").json());

app.post("/report", async (req, res) => {
  const { type } = req.body;
  const { id } = req.body;
  const { story } = req.body;
  const report = new Report({
    type,
    id,
    story,
    date: new Date().toISOString(),
  });
  await report.save();
  res.json({ success: true });
});

app.get("/reports", async (req, res) => {
  const { type } = req.query;
  const { id } = req.query;
  const results = await Report.find({ type, id });
  return res.json({ results: results });
});

app.listen(process.env.PORT || 5000, () => {
  mongoose
    .connect(
      "mongodb+srv://pratham:pratham@cluster0.6b0ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to db "));
  console.log("SERVER LISTENING ON 5000");
});
