// index.js

const express = require("express");
const db = require("./src/db");

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

async function main() {
  await db.connect();

  // Define your routes and views here
  app.get("/", async (req, res) => {
    const data = { message: "Hello, world!" };
    res.render("index", data);
  });
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}

main();
