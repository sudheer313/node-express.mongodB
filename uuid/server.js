const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'reviews.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load reviews from the data file
let reviews = [];
fs.readFile(DATA_FILE, 'utf8', (err, data) => {
  if (!err) {
    reviews = JSON.parse(data);
  }
});

// Save reviews to the data file
function saveReviews() {
  fs.writeFile(DATA_FILE, JSON.stringify(reviews), (err) => {
    if (err) {
      console.error('Error saving reviews:', err);
    }
  });
}

// GET request for reviews
app.get('/api/reviews', (req, res) => {
  res.status(200).json(reviews);
});

// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Create a new review object
    const newReview = {
      product,
      review,
      username,
      review_id: uuid(),
    };

    // Add the new review to the array of reviews
    reviews.push(newReview);

    // Save the reviews to the data file
    saveReviews();

    // Send a response with the new review object
    res.status(201).json(newReview);
  } else {
    res.status(500).json('Error in posting review');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
