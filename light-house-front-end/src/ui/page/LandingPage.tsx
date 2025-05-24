import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid"; // Correct Grid import
import SavingsIcon from "@mui/icons-material/Savings";

const LandingPage: React.FC = () => {
    return (
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 6 }}>
            {/* Header Section */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <SavingsIcon sx={{ fontSize: 60, color: "blue" }} />
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Project Light House
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Your one-stop solution for managing assets, expenses, and financial transactions.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3 }}
                    href="/sign-in"
                >
                    Get Started
                </Button>
            </Box>

            {/* Features Section */}
            <Box sx={{ px: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Key Features
                </Typography>
                <Grid container spacing={4}>
                    {/* Feature 1 */}
                    <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Asset Distribution
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Visualize the distribution of your assets across different types like bank accounts and savings.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Expense Breakdown
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Analyze your expenses by categories such as travel, operational, and more.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Income vs. Expenses
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Compare your income and expenses over time to track your financial health.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Current Asset Balances
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Stay updated with the current balances of all your assets in one place.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature 5 */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Recent Transactions
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                View the most recent transactions with details like type, amount, and contact.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature 6 */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">
                                Net Worth Tracking
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Monitor your net worth over time by calculating assets minus liabilities.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Call to Action Section */}
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Ready to Take Control of Your Finances?
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    href="/sign-up"
                >
                    Sign Up Now
                </Button>
            </Box>
        </Box>
    );
};

export default LandingPage;