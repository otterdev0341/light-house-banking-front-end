import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useExpenseStore from "../../../store/expense_store";
import usePaymentStore from "../../../store/payment_store";

export const DisplayChart9 = () => {
    const payment_store = usePaymentStore((state) => state.payments);

    // Group expenses by type and date
    const groupedData = payment_store?.data.reduce((acc: Record<string, Record<string, number>>, expense) => {
        const date = expense.created_at.split("T")[0]; // Extract date (YYYY-MM-DD)
        const type = expense.expense_name;

        if (!acc[date]) {
            acc[date] = {};
        }
        if (!acc[date][type]) {
            acc[date][type] = 0;
        }
        acc[date][type] += expense.amount;

        return acc;
    }, {});

    // Transform grouped data into an array suitable for the chart
    const chartData = Object.entries(groupedData || {}).map(([date, types]) => ({
        date,
        ...types,
    }));

    // Extract unique expense types for the stacked areas
    const expenseTypes = Array.from(
        new Set(payment_store?.data.map((payment) => payment.expense_name) || [])
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Expense Trends by Type</h2>
            <p className="text-gray-600 mb-8">
                This chart visualizes how expenses for different types change over time.
            </p>
            <div className="bg-white shadow-md rounded-lg p-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
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
                        {expenseTypes.map((type, index) => (
                            <Area
                                key={type}
                                type="monotone"
                                dataKey={type}
                                stackId="1"
                                stroke={getColor(index)}
                                fill={getColor(index)}
                                name={type}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Helper function to generate colors for each expense type
const getColor = (index: number) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
    return colors[index % colors.length];
};