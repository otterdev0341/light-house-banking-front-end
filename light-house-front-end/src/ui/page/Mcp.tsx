import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Button,
    InputAdornment,
    Snackbar,
    Alert,
    CircularProgress
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    ContentCopy,
    Refresh
} from "@mui/icons-material";
import { UserService } from "../../service/user_service";
import useTokenStore from "../../store/token_store";

export const McpPage = () => {
    const [mcpToken, setMcpToken] = useState<string | null>(null);
    const [showToken, setShowToken] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    
    const token = useTokenStore((state) => state.token);

    const fetchMcpToken = async () => {
        setLoading(true);
        try {
            const user_service = UserService.getInstance();
            const token = await user_service.getMcpToken();
            setMcpToken(token);
        } catch (error) {
            console.error("Error fetching MCP token:", error);
            setSnackbarMessage("Failed to fetch MCP token");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchMcpToken();
        }
    }, [token]);

    const handleToggleVisibility = () => {
        setShowToken(!showToken);
    };

    const handleCopyToClipboard = async () => {
        if (mcpToken) {
            try {
                await navigator.clipboard.writeText(mcpToken);
                setSnackbarMessage("MCP token copied to clipboard!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Failed to copy to clipboard:", error);
                setSnackbarMessage("Failed to copy to clipboard");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleRefreshToken = () => {
        fetchMcpToken();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const displayValue = showToken ? mcpToken : mcpToken ? "•".repeat(mcpToken.length) : "";

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: { xs: 2, md: 4 },
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center"
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        mb: 3,
                        fontWeight: "bold",
                        color: "primary.main"
                    }}
                >
                    MCP Token Management
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Your secure MCP token for API access. Keep this token confidential.
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="MCP Token"
                        value={loading ? "Loading..." : displayValue}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleVisibility}
                                        disabled={!mcpToken || loading}
                                        edge="end"
                                    >
                                        {showToken ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: loading && (
                                <InputAdornment position="start">
                                    <CircularProgress size={20} />
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        sx={{
                            "& .MuiInputBase-input": {
                                fontFamily: "monospace",
                                fontSize: "0.9rem"
                            }
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<ContentCopy />}
                        onClick={handleCopyToClipboard}
                        disabled={!mcpToken || loading}
                        sx={{ minWidth: 140 }}
                    >
                        Copy Token
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={handleRefreshToken}
                        disabled={loading}
                        sx={{ minWidth: 140 }}
                    >
                        Refresh
                    </Button>
                </Box>

                {mcpToken && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "block",
                            mt: 3,
                            p: 2,
                            backgroundColor: "grey.100",
                            borderRadius: 1
                        }}
                    >
                        <strong>Security Notice:</strong> Never share your MCP token with anyone. 
                        If you suspect it has been compromised, refresh it immediately.
                    </Typography>
                )}
            </Paper>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};