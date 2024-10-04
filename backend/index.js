const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyparser.json());

let highlights = [
  { id: 1, highlight: "first highlight" },
  { id: 2, highlight: "second highlight" },
  { id: 3, highlight: "third highlight" },
  { id: 4, highlight: "fourth highlight" },
];

app.get("/api/highlights", (req, res) => res.json(highlights));

app.post("/api/highlights", (req, res) => {
  const newHighlight = { id: Date.now(), highlight: req.body.highlight };
  highlights.push(newHighlight);
  res.status(200).json({ status: "Success", ...newHighlight });
});

app.delete("/api/highlights/:id", (req, res) => {
  const id = req.params.id;
  highlights = highlights.filter((highlight) => highlight.id != id);
  res.status(200).json({ status: "Success", message: "highlight deleted" });
});

app.post("/api/reorder", (req, res) => {
  const { updatedList } = req.body;
  if (Array.isArray(updatedList)) {
    highlights = updatedList;
    res
      .status(200)
      .json({ status: "Success", message: "Highlights updated successfully" });
  } else {
    return res
      .status(400)
      .send({ status: "failure", message: "Invalid data format" });
  }
});

app.put("/api/highlights/:id", (req, res) => {
  const id = req.params.id;
  const requestedHighlight = req.body.highlight;
  const updateHighlight = highlights.find((highlight) => highlight.id == id);
  if (updateHighlight) {
    updateHighlight.highlight = requestedHighlight;
    res.status(200).json({ status: "Success", ...updateHighlight });
  } else {
    res.json({ status: "failure", message: "Could not find the highlight" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
