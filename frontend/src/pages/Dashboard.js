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
      client_name: "John Smith",
      contact_info: "john.smith@example.com",
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

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const handleAddNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };

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
                    <TableCell>Attention Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alerts.map((alert, index) => {
                    // Determine the priority level based on the total_affected_score
                    let backgroundColor;
                    if (alert.total_affected_score >= 100) {
                      backgroundColor = "#ffe6e6"; // High priority - light red
                    } else if (alert.total_affected_score >= 75) {
                      backgroundColor = "#fff5e6"; // Medium priority - light orange
                    } else {
                      backgroundColor = "#e6ffe6"; // Low priority - light green
                    }

                    return (
                      <TableRow
                        key={index}
                        onClick={() => handleRowClick(alert.client_name)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: backgroundColor, // Apply the background color
                          "&:hover": { backgroundColor: "#f0f0f0" }, // Lighter shade on hover
                        }}
                      >
                        <TableCell>{alert.client_name}</TableCell>
                        <TableCell>{alert.contact_info}</TableCell>
                        <TableCell>{alert.total_affected_score}</TableCell>
                      </TableRow>
                    );
                  })}
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
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  marginBottom: "16px",
                  overflowY: "auto",
                  maxHeight: "120px",
                }}
              >
                {notes.map((note, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "0.9rem",
                      color: "#333",
                      marginBottom: "8px",
                      textAlign: "left",
                    }}
                  >
                    {note}
                  </li>
                ))}
              </ul>
              <Box
                sx={{
                  position: "absolute", // Places the input and button section at the bottom
                  bottom: 16, // Adjust distance from the bottom edge
                  left: 16,
                  right: 16, // Ensures the width respects the padding of the white box
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  type="text"
                  value={noteInput}
                  placeholder="Type a Note..."
                  onChange={(e) => setNoteInput(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: "10px 14px",
                    border: "1px solid #cccccc",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9rem",
                  }}
                />
                <button
                  onClick={handleAddNote}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#2A9D8F",
                    color: "#ffffff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9rem",
                  }}
                >
                  Submit
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "8px 0",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
  };
}
