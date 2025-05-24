import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../store/token_store";




export default function ProtectRoute() {
    const token = useTokenStore((state) => state.token);

    // If token is not present, redirect to sign-in page
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    // If token is present, render the child components
    return <Outlet />;
}