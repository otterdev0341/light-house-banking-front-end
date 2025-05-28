import React from "react";
import useIncomeStore from "../../../store/income_store";
import usePaymentStore from "../../../store/payment_store";
import useTransferStore from "../../../store/transfer_store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const DisplayChart6 = () => {
    const income_service = useIncomeStore((state) => state.incomes);
    const payment_service = usePaymentStore((state) => state.payments);
    const transfer_service = useTransferStore((state) => state.transfers);

    // Combine income, payments, and transfers into a single transaction list
    const transactions = [
        ...(income_service?.data.map((income) => ({
            id: income.id,
            type: "Income",
            amount: income.amount,
            asset: income.asset_name,
            contact: income.contact_name,
            date: income.created_at,
        })) || []),
        ...(payment_service?.data.map((payment) => ({
            id: payment.id,
            type: "Payment",
            amount: payment.amount,
            asset: payment.asset_name,
            contact: payment.contact_name,
            date: payment.created_at,
        })) || []),
        ...(transfer_service?.data.map((transfer) => ({
            id: transfer.id,
            type: "Transfer",
            amount: transfer.amount,
            asset: transfer.asset_name,
            contact: transfer.contact_name,
            date: transfer.created_at,
        })) || []),
    ];

    // Sort transactions by date (most recent first)
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit to the 5 most recent transactions
    const recentTransactions = sortedTransactions.slice(0, 6);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Asset</TableCell>
                                <TableCell>Contact</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentTransactions.map((transaction) => (
                                <TableRow key={transaction.id} hover>
                                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {transaction.asset || "N/A"}
                                    </TableCell>
                                    <TableCell>{transaction.contact || "N/A"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};