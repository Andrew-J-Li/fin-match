import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const Portfolio = () => {
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
                            Roshan Mehta's Portfolio
                        </Typography>
                        <Typography>
                            roshan.mehta@utexas.edu - 936-224-2564
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* Summary Cards */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2, // Spacing between cards
                    flexWrap: "wrap",
                    paddingTop: 2,
                }}
            >
                {[
                    {
                        title: "Total Invested Amount",
                        value: "$79,155,000,000",
                        color: "primary",
                    },
                    {
                        title: "Number of Investments",
                        value: "2216",
                        color: "secondary",
                    },
                    {
                        title: "Rate of Return",
                        value: "-4.16%",
                        color: "error",
                    },
                ].map((card, index) => (
                    <Card
                        key={index}
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
                            <Typography color={card.color} sx={{ fontWeight: "bold" }}>
                                {card.title}
                            </Typography>
                            <Typography variant="h5" sx={{ marginTop: 1 }}>
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
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
