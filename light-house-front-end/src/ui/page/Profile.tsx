import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    Box,
    Chip
} from "@mui/material";
import useUserStore from "../../store/user_store";
import useTokenStore from "../../store/token_store";
import { UserService } from "../../service/user_service";

export const ProfilePage = () => {
    const user = useUserStore((state) => state.user);
    const token = useTokenStore((state) => state.token);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (token) { // Ensure the token is not null
                try {
                    const userService = UserService.getInstance();
                    await userService.getUserInfo(); // Fetch user info and store it in user_store
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            }
        };

        fetchUserInfo();
    }, [token]); // Run this effect whenever the token changes

    if (!user) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    p: 3
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile Page
                </Typography>
                <Typography variant="body1">
                    No user information available.
                </Typography>
            </Box>
        );
    }

    // Define the user data for the table
    const userProfileData = [
        { label: "Username", value: user.username },
        { label: "Email", value: user.email },
        { label: "First Name", value: user.first_name },
        { label: "Last Name", value: user.last_name },
        { label: "Gender", value: user.gender },
        { label: "User Role", value: user.user_role },
    ];

    return (
        <Box 
            sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                p: { xs: 2, md: 4 } // Responsive padding
            }}
        >
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                    textAlign: 'center', 
                    mb: 4,
                    fontSize: { xs: '1.5rem', md: '2rem' } // Responsive font size
                }}
            >
                Profile Information
            </Typography>

            <TableContainer 
                component={Paper} 
                sx={{ 
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Table>
                    <TableBody>
                        {userProfileData.map((row, index) => (
                            <TableRow 
                                key={row.label}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: 'grey.50' }
                                }}
                            >
                                <TableCell 
                                    component="th" 
                                    scope="row"
                                    sx={{ 
                                        fontWeight: 'bold',
                                        minWidth: { xs: 100, sm: 150 }, // Responsive min width
                                        fontSize: { xs: '0.875rem', md: '1rem' }
                                    }}
                                >
                                    {row.label}
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        wordBreak: 'break-word' // Handle long text
                                    }}
                                >
                                    {row.label === "User Role" ? (
                                        <Chip 
                                            label={row.value} 
                                            color="primary" 
                                            variant="outlined"
                                            size="small"
                                        />
                                    ) : (
                                        row.value || "N/A"
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};