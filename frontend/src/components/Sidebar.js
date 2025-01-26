import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const mostActive = [
  { name: "John Smith", value: "1000000", score: 25, },
  { name: "Jane Doe", value: "1000000", score: 142.62, },
  { name: "Michael Johnson", value: "1000000", score: 2.79, },
  { name: "Emily Davis", value: "1000000", score: 78.98, },
  { name: "David Brown", value: "1000000", score: 1.93, },
  { name: "Sarah Miller", value: "1000000", score: 13.20, },
  { name: "James Wilson", value: "1000000", score: 142.62, },
  { name: "Jessica Taylor", value: "1000000", score: 2.79, },
  { name: "Robert Anderson", value: "1000000", score: 78.98, },
  { name: "Laura Thompson", value: "1000000", score: 1.93, },
];

export default function Sidebar() {

  const [advisorId, setAdvisorId] = useState(null);
  const [portfolios, setPortfolios] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = location.search;
    const id = searchParams.replace('?', ''); // Get the value after the '?' character
    setAdvisorId(id);

    if (id) {
      const getInvestors = async () => {
        try {
          const response = await fetch(`http://localhost:5001/advisors/${id}/investors`);
          console.log("here");
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error("Failed to fetch news data");
          }
          const data = await response.json();
          console.log("News data fetched:", data);

          for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
              mostActive[i / 2]["value"] = data[i]["amount_invested"];
              mostActive[i / 2]["score"] = parseFloat(data[i]["affected_score"]);
              const res = await fetch(`http://localhost:5001/clientName/${data[i]["portfolio_id"]}`);
              const name = await res.json();
              mostActive[i / 2]["name"] = name[0]["client_name"];
            } else {
              mostActive[(i - 1) / 2]["value"] = data[i]["amount_invested"];
              mostActive[(i - 1) / 2]["score"] = (mostActive[(i - 1) / 2]["score"] + parseFloat(data[i]["affected_score"])) / 2;
            }
          }
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

      getInvestors();
    }
    setPortfolios(mostActive);
  })

  return (
    <Box
      sx={{
        width: "30%",
        padding: 2,
        paddingTop: 10,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {/* Most Active Section */}
      <Typography variant="h6" gutterBottom>
        Portfolios
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <List>
        {mostActive.map((item, index) => (
          <Link
            key={index}
            to={`/portfolio?${35}`} // Using query parameter format
            style={{ textDecoration: "none", color: "black" }} // Remove the underline from the link
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                "&:hover": {
                  backgroundColor: "#f4f6f8",
                  borderRadius: 1,
                },
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(parseFloat(item.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body1" color={item.score > 0 ? "green" : "red"}>
                  {item.score.toFixed(2)}
                </Typography>
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}
