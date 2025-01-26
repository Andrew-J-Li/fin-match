const express = require('express');
const cors = require("cors");
const app = express();
const client = require('./db'); // Assuming you have a 'db' module for database interactions

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Define a route to test the database connection
app.get('/test', (req, res) => {
  res.send('Backend is running');
});

// Route to make a request to the AWS API
app.get('/fetch-news', async (req, res) => {
    const stockSymbol = req.query.symbol || 'GOOG'; // Default to 'GOOG' if no symbol is provided

    try {
        // Make the GET request using fetch
        const response = await fetch(`https://oc20sapa11.execute-api.us-west-2.amazonaws.com/v1/news?symbol=${stockSymbol}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response as JSON
        
        // Send the response data back to the client
        res.json(data);
    } catch (error) {
        // Handle error
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// login endpoint for registration/login
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

// get news articles for an advisor
app.get("/advisors/:advisorId/news", async (req, res) => {
  const advisorId = req.params.advisorId;

  try {
    const advisorTickersResult = await client.query(
      "SELECT DISTINCT stock_ticker FROM portfolios WHERE advisor_id = $1",
      [advisorId]
    );

    const advisorTickers = advisorTickersResult.rows.map((row) => row.stock_ticker);

    const newsPromises = advisorTickers.map(async (ticker) => {
      try {
        const response = await fetch(`https://oc20sapa11.execute-api.us-west-2.amazonaws.com/v1/news?symbol=${ticker}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch news for ${ticker}`);
        }
        const rawData = await response.json();
        console.log("Raw data from API:", rawData);

        // Process each news entry in the API response
        const formattedArticles = Object.values(rawData).map((entry) =>
          formatArticle(advisorId, entry)
        );

        // Delete entries without a title or image
        const filteredArticles = formattedArticles.filter((article) => {
          return article.title && article.image;
        });

        return filteredArticles;
      } catch (error) {
        console.error(`Error fetching or formatting news for ticker ${ticker}:`, error);
        return []; // Return an empty array for failed requests
      }
    });

    // Flatten the results from all tickers and remove empty arrays
    const newsResponses = (await Promise.all(newsPromises))
      .flat()
      .filter((response) => response !== null);

    if (newsResponses.length === 0) {
      return res.status(404).send("No news articles found for this advisor.");
    }

    res.json(newsResponses);
  } catch (err) {
    console.error("Error fetching news articles:", err);
    res.status(500).send("Error fetching news articles");
  }
});

// Helper function to format an article entry
function formatArticle(advisorId, entry) {
  const [url, title, image, time, tickers] = entry;

  // Convert the tickers object to an array of { symbol, performance } objects
  const tickersArray = Object.entries(tickers || {}).map(([symbol, performance]) => ({
    symbol,
    performance: `${performance > 0 ? "+" : ""}${performance.toFixed(2)}%`, // Ensure consistent format with two decimals
  }));

  // Update affected scores for each { symbol, performance } object
  updateAffectedScores(advisorId, tickers);

  return {
    title: title, // Fallback for missing title
    source: "Undefined",  // Replace with actual source if available
    tickers: tickersArray,
    summary: title, // Use title as summary if no separate summary is available
    image: image, // Fallback to default image if none provided
  };
}

async function updateAffectedScores(advisorId, tickers) {
  for (const [ticker, sentimentScore] of Object.entries(tickers)) {
    try {
      // Fetch clients who have this ticker in their portfolio under the given advisor
      const clientsQuery = `
        SELECT c.client_id, p.percentage_of_portfolio AS percentage
        FROM clients c
        JOIN portfolios p ON c.client_id = p.client_id
        WHERE p.advisor_id = $1 AND p.stock_ticker = $2
      `;
      const clientsResult = await client.query(clientsQuery, [advisorId, ticker]);
      
      // Update the affected score for each client
      for (const client of clientsResult.rows) {
        const affectedScore = Math.abs(sentimentScore * client.percentage); // Absolute value of multiplication

        // Update the affected score in the database
        const updateScoreQuery = `
          UPDATE portfolios
          SET affected_score = affected_score + $1
          WHERE client_id = $2 AND stock_ticker = $3
        `;
        await client.query(updateScoreQuery, [affectedScore, client.client_id, ticker]);
      }
    } catch (error) {
      console.error(`Error updating scores for ticker ${ticker}:`, error);
    }
  }
}

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
