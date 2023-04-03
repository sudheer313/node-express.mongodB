const e = require("express");
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

//update existting item using Put

app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const itemsToUpdate = items.find((item) => item.id === id);
  if (!itemsToUpdate) {
    res.status(404).json({ message: `Item with ID ${id} not found` });
  } else {
    const updatedItem = { ...itemsToUpdate, ...req.body };
    items.splice(items.indexOf(itemsToUpdate), 1, updatedItem);
    fs.writeFileSync("items.json", JSON.stringify(items, null, 2));
    res.json(updatedItem);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
