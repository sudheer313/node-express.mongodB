const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

let items = JSON.parse(fs.readFileSync("items.json", "utf8"));

//MiddleWare for parsing JSON Data
app.use(express.json());

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

//POST new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  fs.writeFileSync("items.json", JSON.stringify(items));
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
