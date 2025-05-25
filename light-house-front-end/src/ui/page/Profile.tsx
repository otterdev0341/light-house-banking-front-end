import React, { useEffect } from "react";
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
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                <p className="text-lg">No user information available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <div className="text-lg">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>User Role:</strong> {user.user_role}</p>
            </div>
        </div>
    );
};