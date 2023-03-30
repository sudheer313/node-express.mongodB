const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Reviews array to store reviews
let reviews = [];

// Middleware for parsing application/json data
app.use(bodyParser.json());

// GET request for all reviews
app.get('/api/reviews', (req, res) => {
  console.info(`${req.method} request received to get reviews`);
  res.json(reviews);
});

// POST request to add a review
app.post('/api/reviews', (req, res) => {
  console.info(`${req.method} request received to add a review`);

  // Extract review data from the request body
  const { product, rating, comment } = req.body;

  // Check if all required fields are present
  if (!product || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create a new review object
  const newReview = { product, rating, comment };

  // Add the new review to the reviews array
  reviews.push(newReview);

  // Return a success message and the new review object
  res.json({ message: 'Review added successfully', review: newReview });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
