import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTokenStore from "../../store/token_store";
import SavingsIcon from "@mui/icons-material/Savings"; // Import the SavingsIcon

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setToken = useTokenStore((state) => state.setToken);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate API call for sign-in
        const mockToken = "mocked-jwt-token"; // Replace with actual API response
        setToken(mockToken); // Store token in Zustand store
        navigate("/dashboard"); // Redirect to dashboard after successful sign-in
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-6">
                <SavingsIcon className="text-blue-500" fontSize="large" />
                <h1 className="text-2xl font-bold text-blue-500">Light House</h1>
            </div>

            {/* Login Form */}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;