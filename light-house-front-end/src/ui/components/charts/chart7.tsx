import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useIncomeStore from "../../../store/income_store";
import usePaymentStore from "../../../store/payment_store";

export const DisplayChart7 = () => {
    const income_store = useIncomeStore((state) => state.incomes);
    const payment_store = usePaymentStore((state) => state.payments);

    // Combine income and payment data
    const transactions = [
        ...(income_store?.data.map((income) => ({
            type: "Income",
            amount: income.amount,
            date: income.created_at.split("T")[0], // Extract date
        })) || []),
        ...(payment_store?.data.map((payment) => ({
            type: "Payment",
            amount: payment.amount,
            date: payment.created_at.split("T")[0], // Extract date
        })) || []),
    ];

    // Group transactions by month and calculate total income and expenses
    const monthlyData = transactions.reduce((acc: Record<string, { income: number; expenses: number }>, transaction) => {
        const month = transaction.date.slice(0, 7); // Extract YYYY-MM
        if (!acc[month]) {
            acc[month] = { income: 0, expenses: 0 };
        }
        if (transaction.type === "Income") {
            acc[month].income += transaction.amount;
        } else if (transaction.type === "Payment") {
            acc[month].expenses += transaction.amount;
        }
        return acc;
    }, {});

    // Calculate savings rate and transform data for the chart
    const chartData = Object.entries(monthlyData).map(([month, { income, expenses }]) => ({
        month,
        savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0, // Savings rate as a percentage
    }));

    if (chartData.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Monthly Savings Rate</h2>
                <p className="text-gray-600 mb-8">
                    No data available to display the savings rate.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Monthly Savings Rate</h2>
            <div className="bg-white shadow-md rounded-lg p-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
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
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                        <Tooltip formatter={(value) => (typeof value === "number" ? `${value.toFixed(2)}%` : value)} />
                        <Legend />
                        <Line type="monotone" dataKey="savingsRate" stroke="#4CAF50" name="Savings Rate" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};