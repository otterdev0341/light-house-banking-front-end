import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../store/token_store";

const PublicRoute = () => {
    const token = useTokenStore((state) => state.token);

    // If token exists, redirect to home page
    return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;