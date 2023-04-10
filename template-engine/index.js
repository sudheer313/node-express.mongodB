// index.js

const express = require("express");
const db = require("./src/db");

const app = express();

async function main() {
  await db.connect();

  // Define the rest of your application routes and middleware here
  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

main();
