// server.js
const express = require('express');
const cors = require("cors");
const app = express();
const client = require('./db');

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Define a route to test the database connection
app.get('/test', (req, res) => {
  res.send('Backend is running');
});

// login
app.post("/login", async (req, res) => {
  const { name, email } = req.body;

  try {
    if (name) {
      // If name is provided, it's a registration
      // Insert the new advisor into the database
      const result = await client.query(
        "INSERT INTO advisors (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
      );

      const advisor = result.rows[0];

      // Respond with the newly registered advisor's details
      return res.status(201).json({ advisor });
    } else {
      // If name is not provided, it's a login
      // Query the database to check if the advisor exists by email
      const result = await client.query(
        "SELECT * FROM advisors WHERE email = $1",
        [email]
      );

      const advisor = result.rows[0];

      if (!advisor) {
        return res.status(400).send("Advisor not found");
      }

      // Respond with the advisor's details
      return res.json({ advisor });
    }
  } catch (err) {
    res.status(500).send("Error during login/registration: " + err);
  }
});

// get portfolios
app.get("/advisors/:advisorId/portfolios", async (req, res) => {
  const advisorId = req.params.advisorId;

  // Step 1: Query the database for portfolios
  const portfoliosQuery = "SELECT * FROM portfolios WHERE advisor_id = $1";
  try {
    const portfoliosResult = await client.query(portfoliosQuery, [advisorId]);
    const portfolios = portfoliosResult.rows;

    // Step 2: Fetch sentiment analysis (using AWS Lambda)
    const sentimentPromises = portfolios.map(async (portfolio) => {
      const sentimentScore = await getSentimentScore(portfolio); // Call Lambda function
      portfolio.sentiment_score = sentimentScore;
      return portfolio;
    });

    const portfoliosWithSentiment = await Promise.all(sentimentPromises);

    // Step 3: Sort portfolios based on sentiment (or other criteria)
    portfoliosWithSentiment.sort(
      (a, b) => b.sentiment_score - a.sentiment_score
    );

    res.json(portfoliosWithSentiment);
  } catch (err) {
    res.status(500).send("Error fetching portfolios");
  }
});

// get portfolio details
app.get("/advisors/:advisorId/portfolios/:portfolioId", async (req, res) => {
  const { advisorId, portfolioId } = req.params;
  const query = `
    SELECT p.*, c.client_name, c.contact_info
    FROM portfolios p
    JOIN clients c ON p.client_id = c.client_id
    WHERE p.advisor_id = $1 AND p.portfolio_id = $2
  `;

  try {
    const result = await client.query(query, [advisorId, portfolioId]);
    const portfolio = result.rows[0];
    res.json(portfolio);
  } catch (err) {
    res.status(500).send("Error fetching portfolio details");
  }
});

// const AWS = require("aws-sdk");
// const lambda = new AWS.Lambda();

// // In-memory cache for storing sentiment scores
// const sentimentCache = {};

// /**
//  * Get the sentiment score for a portfolio, using the cache if available.
//  * @param {Object} portfolio - The portfolio object.
//  * @returns {Promise<number>} - The sentiment score.
//  */
// async function getSentimentScore(portfolio) {
//   const cacheKey = portfolio.stock_ticker; // Use stock ticker as the unique key

//   // Check if the sentiment score is already in the cache
//   if (sentimentCache[cacheKey]) {
//     console.log(`Cache hit for ${cacheKey}`);
//     return sentimentCache[cacheKey];
//   }

//   console.log(`Cache miss for ${cacheKey}, invoking Lambda...`);

//   const payload = JSON.stringify({ 
//     stock_name: portfolio.stock_name, 
//     stock_ticker: portfolio.stock_ticker 
//   });

//   const params = {
//     FunctionName: 'SentimentAnalysisFunction', // Your Lambda function name
//     InvocationType: 'RequestResponse',
//     Payload: payload
//   };

//   try {
//     // Invoke AWS Lambda
//     const data = await lambda.invoke(params).promise();
//     const result = JSON.parse(data.Payload);

//     // Store the result in the cache
//     sentimentCache[cacheKey] = result.sentiment_score;

//     return result.sentiment_score;
//   } catch (error) {
//     console.error(`Error invoking Lambda for ${cacheKey}:`, error);
//     throw error;
//   }
// }

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
