import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const news = [
  {
    title: "Canada tariffs would hurt automakers and consumers: Report",
    source: "Yahoo Finance",
    time: "34 minutes ago",
    tickers: [
      { symbol: "AA", performance: "+0.21%" },
      { symbol: "GM", performance: "-0.57%" },
    ],
    summary: "Canada tariffs would hurt automakers and consumers.",
    image: require("../assets/finadvisor.png"),
  },
  {
    title: "Canada tariffs would hurt automakers and consumers: Report",
    source: "Yahoo Finance",
    time: "34 minutes ago",
    tickers: [
      { symbol: "AA", performance: "+0.21%" },
      { symbol: "GM", performance: "-0.57%" },
    ],
    summary: "Canada tariffs would hurt automakers and consumers.",
    image: require("../assets/finadvisor.png"),
  },
  {
    title:
      "Report: White House in talks to have Oracle, investors control TikTok",
    source: "Reuters",
    time: "1 hour ago",
    tickers: [{ symbol: "ORCL", performance: "-1.54%" }],
    summary: "TikTok negotiations escalate with new investors.",
    image: require("../assets/finadvisor.png"),
  },
  {
    title:
      "Report: White House in talks to have Oracle, investors control TikTok",
    source: "Reuters",
    time: "1 hour ago",
    tickers: [{ symbol: "ORCL", performance: "-1.54%" }],
    summary: "TikTok negotiations escalate with new investors.",
    image: require("../assets/finadvisor.png"),
  },
  {
    title:
      "Report: White House in talks to have Oracle, investors control TikTok",
    source: "Reuters",
    time: "1 hour ago",
    tickers: [{ symbol: "ORCL", performance: "-1.54%" }],
    summary: "TikTok negotiations escalate with new investors.",
    image: require("../assets/finadvisor.png"),
  },
];

const alerts = [
  {
    portfolio: "High Risk",
    alert: "Significant loss this week",
    data: [40, 30, 30],
  },
  {
    portfolio: "High Risk",
    alert: "Significant loss this week",
    data: [40, 30, 30],
  },
  {
    portfolio: "High Risk",
    alert: "Significant loss this week",
    data: [40, 30, 30],
  },
  {
    portfolio: "High Risk",
    alert: "Significant loss this week",
    data: [40, 30, 30],
  },
  {
    portfolio: "Tech Growth",
    alert: "High volatility detected",
    data: [50, 25, 25],
  },
  {
    portfolio: "Dividend Income",
    alert: "Potential rebalancing needed",
    data: [20, 40, 40],
  },
];

const pieData = [
  { name: "Equities", value: 40, color: "#8884d8" },
  { name: "Bonds", value: 30, color: "#82ca9d" },
  { name: "Cash", value: 30, color: "#ffc658" },
];

export default function Dashboard() {
  const [selectedData, setSelectedData] = useState(alerts[0].data);

  const handleRowClick = (data) => {
    setSelectedData(data);
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      {/* Main Layout */}
      <Box display="flex" flexDirection="column" height="100vh" width="80%">
        {/* Top Section: Alerts and Pie Chart */}
        <Box
          display="flex"
          flex={1}
          gap={2}
          paddingX={2}
          paddingTop={10}
          paddingBottom={2}
        >
          {/* Alerts Table Section */}
          <Box
            sx={{
              width: "50%",
              border: "1px solid #e0e0e0",
              padding: 2,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Portfolios Needing Attention
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Portfolio</TableCell>
                    <TableCell>Alert</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alerts.map((alert, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(alert.data)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                    >
                      <TableCell>{alert.portfolio}</TableCell>
                      <TableCell>{alert.alert}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Pie Chart Section */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: "50%",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box
              sx={{
                height: "50%",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "white",
                padding: 2,
              }}
            >
              <Typography variant="h6">Additional Insights</Typography>
              <Typography variant="body2" color="textSecondary">
                Placeholder for additional information or charts.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Latest News Section */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            paddingX:2,
            overflowX: "auto",
            paddingBottom: 0.5,
            "&::-webkit-scrollbar": {
              height: "8px",
              backgroundColor: "#f7fafc",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c4c4c4",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a0a0a0",
            },
          }}
        >
          {news.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
              }}
              variant="outlined"
            >
              {/* Image with Overlay */}
              <Box
                sx={{
                  position: "relative",
                  height: 140,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: 1,
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.summary}
                </Box>
              </Box>

              {/* Content Below Image */}
              <Box sx={{ padding: 2 }}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {item.source} • {item.time}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                  {item.tickers.map((ticker, idx) => (
                    <Chip
                      key={idx}
                      label={`${ticker.symbol} ${ticker.performance}`}
                      size="small"
                      sx={{
                        backgroundColor: ticker.performance.startsWith("-")
                          ? "#ffe6e6"
                          : "#e6ffe6",
                        color: ticker.performance.startsWith("-")
                          ? "#d32f2f"
                          : "#2e7d32",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
