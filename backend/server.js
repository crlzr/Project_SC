require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require(__dirname + '/db.config.js');
const cloudinary = require('cloudinary').v2;
const { auth } = require('express-oauth2-jwt-bearer');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.json());
const PORT = process.env.PORT || 5005;

// Define allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://sharecircle.netlify.app/', // Your frontend URL
//   // Add more origins as needed
// ];

app.use(cors({
  // origin: 'https://sharecircle.netlify.app',
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods allowed
  credentials: true, // Allow credentials if needed
}));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});


// JWT check middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256',
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dbsawv974',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload images on Cloudinary, transform them and get URL on command line
// (async function() {
//   try {
//     const results = await cloudinary.uploader.upload('./images/profile_pics/KarenCompli2.jpg'); // Specify the correct image file
//     console.log('Upload successful:', results);

//     const url = cloudinary.url(results.public_id, {
//       transformation: [
//         {
//           quality: 'auto',
//           fetch_format: 'auto'
//         },
//         {
//           width: 400,
//           height: 340,
//           crop: 'fill',
//           gravity: 'auto'
//         }
//       ]
//     });

//     console.log('Transformed Image URL:', url); // Log the transformed URL
//   } catch (error) {
//     console.error('Upload failed:', error); // Log any errors that occur during the upload
//   }
// })();




// Signup Route

// Login Route

// ALL CATEGORIES - HOMEPAGE
// Function to handle health check (fetch Categories)
const getCategories = (req, res) => {
  pool.query('SELECT * FROM "Categories"', (error, categories) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(categories.rows);
  });
};
// Route to get Categories data
app.get('/', getCategories);

// STRIPE CHECKOUT SESSION
app.post('/create-checkout-session', async (req, res) => {
  console.log('Incoming request body:', req.body);
  const { amount, category, itemName, renterFirstName, renterLastName, imageUrl, previousPageUrl} = req.body; // Extract amount and category

  // Validate the inputs
  if (!amount || !category || !itemName || !imageUrl || !renterFirstName || !renterLastName) {
      return res.status(400).json({ error: 'Amount and category are required' });
  }

  try {
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'], // Specify the payment methods
          line_items: [{
              price_data: {
                  currency: 'aud', // Currency for the transaction
                  product_data: {
                      name: itemName,
                      description: `Rented from: ${renterFirstName} ${renterLastName}`,
                      images: [imageUrl],  // Replace with the actual product name
                  },
                  unit_amount: amount, // Amount in cents
              },
              quantity: 1, // Adjust quantity as needed
          }],
          mode: 'payment', // Payment mode
          success_url: 'http://localhost:3000/success', // Redirect on success
          cancel_url: previousPageUrl, // Redirect to previous item page
      });

      res.json({ id: session.id }); // Send the session ID back to the client
  } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send({ error: error.message });
  }
});



// get items within a certain (e.g., 5km) radius (protected)
app.get('/items/nearby', jwtCheck, async (req, res) => {
  const { latitude, longitude, radius_km } = req.query;

  if (!latitude || !longitude || !radius_km) {
    return res.status(400).json({ error: 'Latitude, longitude, and radius_km are required.' });
  }

  try {
    const query = `
      SELECT
      "Item_id",
      "Item_name",
      "Description",
      "Price_per_day",
      "Image_url",
      "Availability",
      ST_X(ST_AsText("Renters"."location"::geometry)) AS "renter_longitude",
      ST_Y(ST_AsText("Renters"."location"::geometry)) AS "renter_latitude",
      "Items"."Renter_name",
      "Categories"."Name" AS "category",
      "Renters"."Rating" AS "Rating"
  FROM "Items"
  INNER JOIN "Renters" ON "Items"."Renter_id" = "Renters"."Renter_id"
  INNER JOIN "Categories" ON "Items"."Category_id" = "Categories"."ID"
  WHERE ST_DWithin("Renters"."location", ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3 * 1000);
    `;
    // Correct order of parameters: [longitude, latitude, radius_km]
    const result = await pool.query(query, [longitude, latitude, radius_km]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching nearby items:', error);
    res.status(500).json({ error: 'Failed to fetch nearby items' });
  }
});




// GET SPECIFIC CATEGORY
// Should show all items according to category name
app.get('/:category_name', async (req, res) => {
  const categoryName = req.params.category_name;
  console.log('Fetching items with Category_name:', categoryName);
  const query = `
    SELECT "Items".*, "Categories"."Name" AS "CategoryName", "Renters"."Rating"
    FROM "Items"
    INNER JOIN "Categories" ON "Items"."Category_id" = "Categories"."ID"
    INNER JOIN "Renters" ON "Items"."Renter_id" = "Renters"."Renter_id"
    WHERE "Categories"."Name" = $1
    ORDER BY "Price_per_day" ASC
  `;
  // add sort by option in query

  try {
    const result = await pool.query(query, [categoryName]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// GET SPECIFIC ITEM - item listing
// one item according to specified category_name and item_id
app.get('/:category_name/:itemId', async (req, res) => {
  const categoryName = req.params.category_name;
  const itemId = req.params.itemId;
  console.log('Fetching item with Item_id:', itemId);

  // Query to fetch an item by Category_id and Item_id
  const query = `
    SELECT *,
    "Categories"."Name" AS "CategoryName",
    "Renters"."Rating",
    ST_X(ST_AsText("Renters"."location"::geometry)) AS "renter_longitude",
    ST_Y(ST_AsText("Renters"."location"::geometry)) AS "renter_latitude"
    FROM "Items"
    INNER JOIN "Categories" ON "Items"."Category_id" = "Categories"."ID"
    INNER JOIN "Renters" ON "Items"."Renter_id" = "Renters"."Renter_id"
    WHERE "Categories"."Name" = $1 AND "Items"."Item_id" = $2
  `;
  try {
    const result = await pool.query(query, [categoryName, itemId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});




// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));