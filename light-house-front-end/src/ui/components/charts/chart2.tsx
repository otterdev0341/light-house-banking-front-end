import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useExpenseStore from "../../../store/expense_store";
import useExpenseTypeStore from "../../../store/expense_type_store";

export const DisplayChart2 = () => {
    const expense_store = useExpenseStore((state) => state.expenses);
    const expense_type_store = useExpenseTypeStore((state) => state.expenseTypes);

    // Group expenses by expense type and calculate the count for each type
    const expenseDistribution = expense_store?.data.reduce((acc: Record<string, number>, expense) => {
        acc[expense.expense_type_name] = (acc[expense.expense_type_name] || 0) + 1;
        return acc;
    }, {});

    // Transform the data into a format suitable for the BarChart
    const chartData = Object.entries(expenseDistribution || {}).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Expense Breakdown</h2>
            <p className="text-gray-600 mb-8">
                This chart shows the distribution of expenses grouped by expense types.
            </p>
            <div className="w-full max-w-2xl h-[400px]">
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};