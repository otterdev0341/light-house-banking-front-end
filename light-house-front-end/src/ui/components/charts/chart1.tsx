// - **Graph Type**: Pie Chart  
// - **Description**: Show the distribution of assets across different asset types (e.g., Bank Account, Savings Account).  
// - **Data Source**: `Asset` and `AssetType`.

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAssetStore from "../../../store/asset_store";

export const DisplayChart1 = () => {
    const asset_store = useAssetStore((state) => state.assets);

    // Group assets by asset type and calculate the count for each type
    const assetDistribution = asset_store?.data.reduce((acc: Record<string, number>, asset) => {
        acc[asset.asset_type] = (acc[asset.asset_type] || 0) + 1;
        return acc;
    }, {});

    // Transform the data into a format suitable for the PieChart
    const chartData = Object.entries(assetDistribution || {}).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    // Define colors for the PieChart
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A28EFF",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Expense Type</h2>
            <p className="text-gray-600 mb-8">
                This chart shows the distribution of expense types.
            </p>
            <div className="w-full max-w-md h-[400px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};