import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CurrentSheetTable from "../data_table/current_sheet_table";
import { CurrentSheetService } from "../../service/current_sheet_service";
import useCurrentSheetStore from "../../store/current_sheet_store";
import useTokenStore from "../../store/token_store";

const CurrentSheetPage: React.FC = () => {
    const token = useTokenStore((state) => state.token);
    const currentSheet = useCurrentSheetStore((state) => state.currentSheet);
    const setCurrentSheet = useCurrentSheetStore((state) => state.setCurrentSheet);

    useEffect(() => {
        const fetchCurrentSheet = async () => {
            if (token) { // Ensure the token is not null
                try {
                    const currentSheetService = CurrentSheetService.getInstance();
                    await currentSheetService.getCurrentSheet();
                } catch (error) {
                    console.error("Error fetching current sheet:", error);
                }
            }
        };

        fetchCurrentSheet();
    }, [token]); // Run this effect whenever the token changes

    if (!currentSheet || !currentSheet.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Current Sheet</h1>
                <p className="text-lg">No current sheet data available.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <h2 className="text-xl font-bold">Current Sheet</h2>
            </Box>
            <CurrentSheetTable data={currentSheet.data} />
        </div>
    );
};

export default CurrentSheetPage;