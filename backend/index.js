const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyparser.json());

let highlights = [
  { id: 1, highlight: "first highlight" },
  { id: 2, highlight: "second highlight" },
  { id: 3, highlight: "third highlight" },
  { id: 4, highlight: "fourth highlight" },
];
console.log("TEST");

app.get("/api/highlights", (req, res) => res.json(highlights));

app.post("/api/highlights", (req, res) => {
  const newHighlight = { id: Date.now(), highlight: req.body.highlight };
  highlights.push(newHighlight);
  res.json({ status: "Success", ...newHighlight });
});

app.delete("/api/highlights/:id", (req, res) => {
  const id = req.params.id;
  highlights = highlights.filter((highlight) => highlight.id != id);
  res.json({ status: "Success", message: "highlight deleted" });
});

app.put("/api/highlights/:id", (req, res) => {
  const id = req.params.id;
  const requestedHighlight = req.body.highlight;
  const updateHighlight = highlights.find((highlight) => highlight.id == id);
  if (updateHighlight) {
    updateHighlight.highlight = requestedHighlight;
    res.json({ status: "Success", ...updateHighlight });
  } else {
    res.json({ status: "failure", message: "Could not find the highlight" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
