import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useIncomeStore from "../../../store/income_store";
import usePaymentStore from "../../../store/payment_store";
import useTransferStore from "../../../store/transfer_store";

export const DisplayChart8 = () => {
    const income_store = useIncomeStore((state) => state.incomes);
    const payment_store = usePaymentStore((state) => state.payments);
    const transfer_store = useTransferStore((state) => state.transfers);

    // Aggregate transaction counts by type
    const data = [
        { name: "Income", value: income_store?.data.length || 0 },
        { name: "Payment", value: payment_store?.data.length || 0 },
        { name: "Transfer", value: transfer_store?.data.length || 0 },
    ];

    // Colors for the chart
    const COLORS = ["#4CAF50", "#FF5722", "#2196F3"]; // Green, Orange, Blue

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Transaction Type Distribution</h2>
            <p className="text-gray-600 mb-8">
                This chart shows the percentage of transactions by type (Income, Payment, Transfer).
            </p>
            <div className="w-full max-w-md">
                <PieChart width={350} height={350}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        fill="#8884d8"
                        label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};