import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const parseQuery = (queryString) => {
    const params = new URLSearchParams(queryString);
    const entries = Array.from(params.entries());
    const result = {};
    entries.forEach(([key, value]) => {
        result[key] = decodeURIComponent(value);
    });
    return result;
};

const Portfolio = () => {
    const queryParams = parseQuery(window.location.search); // Get query params from URL
    console.log("Query Params:", queryParams);
    const name = Object.keys(queryParams)[0] || "Unknown User"; // Gets the first key from the URL

    const pieChartData = [
        { name: "CMO", value: 27, color: "#8884d8" },
        { name: "CORPORATES", value: 60, color: "#82ca9d" },
        { name: "MBS", value: 5, color: "#ffbb28" },
        { name: "CASH", value: 8, color: "#8dd1e1" },
    ];

    const barChartData = [
        { rating: "AAA", amount: 30000 },
        { rating: "A", amount: 25000 },
        { rating: "AA", amount: 15000 },
        { rating: "B", amount: 5000 },
        { rating: "BB", amount: 2000 },
        { rating: "BBB", amount: 15000 },
        { rating: "CCC", amount: 1000 },
    ];

    const rows = [
        {
            id: 1,
            companyName: "Apple Inc.",
            stockTicker: "AAPL",
            buyDate: "2023-01-01",
            currentPrice: 145.67,
            shares: 100,
            buyPrice: 130.45,
            industry: "Technology",
        },
        {
            id: 2,
            companyName: "Microsoft Corp.",
            stockTicker: "MSFT",
            buyDate: "2022-05-15",
            currentPrice: 255.12,
            shares: 50,
            buyPrice: 245.67,
            industry: "Technology",
        },
        {
            id: 3,
            companyName: "Tesla Inc.",
            stockTicker: "TSLA",
            buyDate: "2021-11-10",
            currentPrice: 705.23,
            shares: 30,
            buyPrice: 600.00,
            industry: "Automotive",
        },
    ];

    // Add dynamic calculations for current value and return
    const computedRows = rows.map(row => ({
        ...row,
        totalCurrentValue: (row.shares * row.currentPrice).toFixed(2),
        totalReturn: (((row.currentPrice - row.buyPrice) / row.buyPrice) * 100).toFixed(2),
    }));

    const columns = [
        { field: "companyName", headerName: "Company Name", flex: 1 },
        { field: "stockTicker", headerName: "Stock Ticker", flex: 1 },
        { field: "industry", headerName: "Industry", flex: 1 },
        { field: "buyDate", headerName: "Buy Date", flex: 1 },
        { field: "currentPrice", headerName: "Current Price ($)", flex: 1 },
        { field: "totalCurrentValue", headerName: "Total Current Value ($)", flex: 1 },
        { field: "totalReturn", headerName: "Total Return (%)", flex: 1 },
    ];

    return (
        <Box
            sx={{
                backgroundColor: "#f9f9f9",
                padding: 3,
                width: "100hw",
                overflow: "hidden", // Prevent unwanted scrollbars
            }}
        >
            {/* Portfolio Introduction */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2, // Spacing between cards
                    flexWrap: "wrap",
                    paddingTop: 10,
                }}
            >
                <Card
                    sx={{
                        flex: "1 1 30%", // Cards take equal width and adjust to screen size
                        minWidth: "250px",
                        margin: "0 auto", // Center alignment
                        height: "fit-content",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 1 }}>
                            {name}'s Portfolio
                        </Typography>
                        <Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* Summary Cards */}
            <Box     sx={{
                border: "1px solid #e0e0e0", // Light gray border to match the theme
                borderRadius: "8px", // Rounded corners
                marginTop: "15px", // Spacing from the top
            }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px" }}>

                <div style={{ width: "33%", textAlign: "center" }}>
                    <h2 style={{ fontWeight: "bold", backgroundImage: "linear-gradient(to right, #2A9D8F, rgb(64, 101, 180))", WebkitBackgroundClip: "text", color: "transparent", fontSize: "25px" }}>
                    Total Investment Amount
                    </h2>
                    <h2>$79,375,138</h2>
                </div>

                <div style={{ width: "33%", textAlign: "center" }}>
                    <h2 style={{ fontWeight: "bold", backgroundImage: "linear-gradient(to right,rgb(18, 53, 116), rgb(71, 29, 108))", WebkitBackgroundClip: "text", color: "transparent", fontSize: "25px" }}>
                    Number of Investments
                    </h2>
                    <h2>213</h2>
                </div>

                <div style={{ width: "33%", textAlign: "center" }}>
                    <h2 style={{ fontWeight: "bold", backgroundImage: "linear-gradient(to right,rgb(57, 17, 95), rgb(122, 36, 130))", WebkitBackgroundClip: "text", color: "transparent", fontSize: "25px" }}>
                        Rate of Return
                    </h2>
                    <h2>5.34%</h2>
                </div>
            </div>
            </Box>

            {/* Charts */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2, // Spacing between chart cards
                    marginTop: 2,
                    flexWrap: "wrap",
                }}
            >
                {/* Pie Chart */}
                <Card
                    sx={{
                        flex: "1 1 calc(50% - 16px)", // Responsive size
                        minWidth: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
                            Total Investment by Assets Class
                        </Typography>
                        <Box sx={{ width: "100%", maxWidth: "400px" }}>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={({ name, value }) => `${name}, ${value}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                />
                            </PieChart>
                        </Box>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card
                    sx={{
                        flex: "1 1 calc(50% - 16px)", // Responsive size
                        minWidth: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
                            Total Investment by Rating Group
                        </Typography>
                        <Box sx={{ width: "100%", maxWidth: "500px" }}>
                            <BarChart
                                width={400}
                                height={300}
                                data={barChartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rating" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <div style={{ height: "fit-content", width: "100hw" }}>
                <h2>Investment Portfolio</h2>
                <DataGrid
                    rows={computedRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={false}
                />
            </div>
        </Box>
    );
};

export default Portfolio;
