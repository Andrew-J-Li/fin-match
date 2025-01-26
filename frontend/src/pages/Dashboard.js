import React, { useState, useEffect } from "react";
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
import { LineChart } from "@mui/x-charts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook

export default function Dashboard() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    {
      client_id: 1,
      client_name: "John Doe",
      contact_info: "john.doe@example.com",
      total_affected_score: 120
    },
    {
      client_id: 2,
      client_name: "Jane Smith",
      contact_info: "jane.smith@example.com",
      total_affected_score: 95
    },
    {
      client_id: 3,
      client_name: "Alice Johnson",
      contact_info: "alice.johnson@example.com",
      total_affected_score: 85
    },
    {
      client_id: 4,
      client_name: "Bob Brown",
      contact_info: "bob.brown@example.com",
      total_affected_score: 70
    },
    {
      client_id: 5,
      client_name: "Charlie Davis",
      contact_info: "charlie.davis@example.com",
      total_affected_score: 65
    }
  ]);
  const [selectedData, setSelectedData] = useState(alerts[0].data);
  const [advisorId, setAdvisorId] = useState(null);

  const location = useLocation(); // Get the current location object
  
  useEffect(() => {
    // Extract advisorId from URL query params (handle format like ?10)
    const searchParams = location.search;
    const id = searchParams.replace('?', ''); // Get the value after the '?' character
    setAdvisorId(id);

    // Fetch news data if advisorId is present
    if (id) {
      const fetchNews = async () => {
        try {
          console.log("Fetching news data...");
          const response = await fetch(`http://localhost:5001/advisors/${id}/news`);
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error("Failed to fetch news data");
          }
          const data = await response.json();
          console.log("News data fetched:", data);
          setNews(data);
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

      fetchNews();
    }
  }, [location.search]); // Depend on location.search to rerun on URL change

  // update alerts based on highest affected score client when the page loads
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/advisors/${advisorId}/alerts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch alerts");
        }
        const data = await response.json();
        setAlerts(data);
        setSelectedData(data[0]);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    if (advisorId) {
      fetchAlerts();
    }
  }, [advisorId]);

  const handleRowClick = (data) => {
    setSelectedData(data);
    navigate(`/portfolio?${data}`);
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar />

      <Box display="flex" flexDirection="column" height="100vh" width="80%" backgroundColor="#f3f4f6">
        <Box
          sx={{
            display: "flex",
            gap: 2,
            paddingX: 2,
            overflowX: "auto",
            height: "40vh",
            paddingTop: 10,
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
            <a href={item.source} target="_blank" rel="noopener noreferrer" key={index}>
              <Card
                sx={{
                  width: 280,
                  height: "fit-content",
                  borderRadius: 2,
                  overflow: "hidden",
                  flexShrink: 0,
                  textDecoration: "none", // Remove underline
                  "&:hover": { cursor: "pointer" }, // Add pointer cursor on hover
                }}
                variant="outlined"
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "120px",
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
                <Box sx={{ padding: 1.5 }}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                    {item.tickers.map((ticker, idx) => (
                      <Chip
                        key={idx}
                        label={`${ticker.symbol}`}
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
            </a>
          ))}
        </Box>

        <Box
          display="flex"
          flex={0.6}
          gap={2}
          paddingX={2}
          paddingTop={1}
          paddingBottom={2}
        >
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
                    <TableCell>Client</TableCell>
                    <TableCell>Alert</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alerts.map((alert, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(alert.client_id)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                    >
                      <TableCell>{alert.client_name}</TableCell>
                      <TableCell>{alert.contact_info}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

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
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <LineChart
                xAxis={[{
                  data: [1, 2, 3, 5, 8, 10],
                  label: "Time"
                }]}
                yAxis={[{
                  label: "Performance"
                }]}
                series={[{
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  curve: "linear",
                  showMark: false
                }]}
                width={250}
                height={200}
              />
              <LineChart
                xAxis={[{
                  data: [1, 2, 3, 5, 8, 10],
                  label: "Time"
                }]}
                yAxis={[{
                  label: "Performance"
                }]}
                series={[{
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  curve: "linear",
                  showMark: false
                }]}
                width={250}
                height={200}
              />
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
      </Box>
    </Box>
  );
}
