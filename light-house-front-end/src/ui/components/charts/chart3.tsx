import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import useIncomeStore from "../../../store/income_store";
import usePaymentStore from "../../../store/payment_store";

export const DisplayChart3 = () => {
    const income_store = useIncomeStore((state) => state.incomes);
    const payment_store = usePaymentStore((state) => state.payments);

    // State for selected month
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs("2025-05"));

    // Combine income and expense data
    const transactions = [
        ...(income_store?.data.map((income) => ({
            transaction_type_name: "income",
            amount: income.amount,
            created_at: income.created_at.split("T")[0], // Extract date
        })) || []),
        ...(payment_store?.data.map((payment) => ({
            transaction_type_name: "payment",
            amount: payment.amount,
            created_at: payment.created_at.split("T")[0], // Extract date
        })) || []),
    ];

    // Filter transactions by the selected month
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.created_at.startsWith(selectedMonth.format("YYYY-MM"))
    );

    // Group transactions by date and calculate total income and expenses
    const groupedData = filteredTransactions.reduce(
        (acc: Record<string, { income: number; expenses: number }>, transaction) => {
            const date = transaction.created_at; // Already extracted date
            if (!acc[date]) {
                acc[date] = { income: 0, expenses: 0 };
            }
            if (transaction.transaction_type_name === "income") {
                acc[date].income += transaction.amount;
            } else if (transaction.transaction_type_name === "payment") {
                acc[date].expenses += transaction.amount;
            }
            return acc;
        },
        {}
    );

    // Transform grouped data into an array suitable for the LineChart
    const chartData = Object.entries(groupedData).map(([date, { income, expenses }]) => ({
        date,
        income,
        expenses,
    }));

    // Calculate total income and total expenses for the selected month
    const totalIncome = filteredTransactions
        .filter((transaction) => transaction.transaction_type_name === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = filteredTransactions
        .filter((transaction) => transaction.transaction_type_name === "payment")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Income vs. Expenses Over Time</h2>
            <p className="text-gray-600 mb-8">
                This chart compares income and expenses for the selected month.
            </p>

            {/* Month Selector */}
            <FormControl fullWidth style={{ maxWidth: "300px", marginBottom: "20px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Month"
                        openTo="month"
                        views={["year", "month"]}
                        value={selectedMonth}
                        onChange={(newValue: Dayjs | null) => {
                            if (newValue) {
                                setSelectedMonth(newValue);
                            }
                        }}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
            </FormControl>

            {/* Summary Section */}
            <div className="w-full max-w-2xl mb-8">
                <div className="flex justify-between text-lg font-semibold">
                    <p>Total Income: <span className="text-green-600">${totalIncome.toFixed(2)}</span></p>
                    <p>Total Expenses: <span className="text-red-600">${totalExpenses.toFixed(2)}</span></p>
                </div>
            </div>

            {/* Line Chart */}
            <div className="w-full max-w-2xl h-[400px]">
                <ResponsiveContainer>
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#0088FE" name="Income" />
                        <Line type="monotone" dataKey="expenses" stroke="#FF8042" name="Expenses" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};