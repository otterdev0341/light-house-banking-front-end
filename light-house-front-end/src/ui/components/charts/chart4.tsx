import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useCurrentSheetStore from "../../../store/current_sheet_store";

export const DisplayChart4 = () => {
    // Sample data for current asset balances
    const current_sheet_store = useCurrentSheetStore((state) => state.currentSheet);

    // Filter data to include only assets with a balance greater than 0
    const filteredData = current_sheet_store?.data.filter((item) => item.balance !== 0) || [];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Current Asset Balances</h2>
            <p className="text-gray-600 mb-8">
                This chart shows the current balance of each asset.
            </p>
            <div className="w-full max-w-2xl h-[400px]">
                <ResponsiveContainer>
                    <BarChart
                        data={filteredData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="2 3" />
                        <XAxis dataKey="asset_name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="balance" fill="#8884d8" name="Balance" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};