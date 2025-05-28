import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import useContactStore from "../../../store/contact_store";
import usePaymentStore from "../../../store/payment_store";
import useTransferStore from "../../../store/transfer_store";

export const DisplayChart5 = () => {
    const contact_store = useContactStore((state) => state.contacts);
    const payment_store = usePaymentStore((state) => state.payments);
    const transfer_store = useTransferStore((state) => state.transfers);

    // Combine payments and transfers by contact_name
    const transactions = [
        ...(payment_store?.data.map((payment) => ({
            contact_name: payment.contact_name,
            amount: payment.amount,
        })) || []),
        ...(transfer_store?.data.map((transfer) => ({
            contact_name: transfer.contact_name,
            amount: transfer.amount,
        })) || []),
    ];

    // Aggregate transactions by contact_name
    const aggregatedData = transactions.reduce((acc: Record<string, number>, transaction) => {
        if (transaction.contact_name) {
            acc[transaction.contact_name] = (acc[transaction.contact_name] || 0) + transaction.amount;
        }
        return acc;
    }, {});

    // Transform aggregated data into an array suitable for the chart
    const chartData = Object.entries(aggregatedData)
        .map(([contact_name, totalAmount]) => ({ contact_name, totalAmount }))
        .sort((a, b) => b.totalAmount - a.totalAmount) // Sort by total amount in descending order
        .slice(0, 10); // Limit to top 10 contacts

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Top Contacts by Transactions</h2>
            <p className="text-gray-600 mb-8">
                This chart highlights the top contacts based on the total value of transactions.
            </p>
            <div className="w-full max-w-2xl h-[400px]">
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="contact_name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalAmount" fill="#8884d8" name="Total Transaction Value">
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index % 2 === 0 ? "#4CAF50" : "#FF5722"} // Alternate colors for bars
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};