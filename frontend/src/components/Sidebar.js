import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const mostActive = [
  { ticker: "John's Portfolio", name: "$1,000,000", price: 25, change: "+1.58", percent: "+13.60%" },
  { ticker: "NVDA", name: "NVIDIA Corporation", price: 142.62, change: "-6.62", percent: "-4.44%" },
  { ticker: "LCID", name: "Lucid Group, Inc.", price: 2.79, change: "+0.07", percent: "+2.57%" },
  { ticker: "PLTR", name: "Palantir Technologies", price: 78.98, change: "+2.54", percent: "+3.32%" },
  { ticker: "BBD", name: "Banco Bradesco", price: 1.93, change: "-0.01", percent: "-0.52%" },
  { ticker: "RGTI", name: "Rigetti Computing", price: 13.20, change: "+1.58", percent: "+13.60%" },
  { ticker: "NVDA", name: "NVIDIA Corporation", price: 142.62, change: "-6.62", percent: "-4.44%" },
  { ticker: "LCID", name: "Lucid Group, Inc.", price: 2.79, change: "+0.07", percent: "+2.57%" },
  { ticker: "PLTR", name: "Palantir Technologies", price: 78.98, change: "+2.54", percent: "+3.32%" },
  { ticker: "BBD", name: "Banco Bradesco", price: 1.93, change: "-0.01", percent: "-0.52%" },
];

export default function Sidebar() {
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
                  {item.ticker}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.name}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body1">
                  ${item.price.toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  color={item.change.startsWith("+") ? "green" : "red"}
                >
                  {item.change} ({item.percent})
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
