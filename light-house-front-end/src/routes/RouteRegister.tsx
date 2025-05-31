import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "../ui/page/Sign_In";
import NotFoundPage from "../ui/page/NotFound";
import PublicRoute from "./PublicRoute";
import ProtectRoute from "./ProtectRoute";
import SignUpPage from "../ui/page/sign_up";
import Dashboard from "../ui/page/Dashboard";
import IncomePage from "../ui/page/transaction/Income";
import PaymentPage from "../ui/page/transaction/Payment";
import TransferPage from "../ui/page/transaction/Transfer";
import ContactPage from "../ui/page/Contact";
import AssetPage from "../ui/page/Asset";
import ExpensePage from "../ui/page/Expense";
import CurrentSheetPage from "../ui/page/CurrentSheet";
import LandingPage from "../ui/page/LandingPage";
import { ProfilePage } from "../ui/page/Profile";
import { McpPage } from "../ui/page/Mcp";

function RouteRegister(): React.ReactElement {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="income" element={<IncomePage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="transfer" element={<TransferPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="asset" element={<AssetPage />}/>
        <Route path="expense" element={<ExpensePage />} />
        <Route path="current-sheet" element={<CurrentSheetPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="mcp" element={<McpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default RouteRegister;