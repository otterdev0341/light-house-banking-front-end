import React, { useState } from "react";
import { Box } from "@mui/material";
import CurrentSheetTable from "../data_table/current_sheet_table";


const mockCurrentSheetData = {
    data: [
        {
            id: "1",
            asset_name: "Bank Account",
            balance: 5000,
            last_transaction_id: "123",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            asset_name: "Savings Account",
            balance: 10000,
            last_transaction_id: "456",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const CurrentSheetPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <h2 className="text-xl font-bold">Current Sheet</h2>
            </Box>
            <CurrentSheetTable data={mockCurrentSheetData.data} />
        </div>
    );
};

export default CurrentSheetPage;