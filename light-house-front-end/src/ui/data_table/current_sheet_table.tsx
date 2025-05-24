import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

interface CurrentSheetTableProps {
    data: any[];
}

const CurrentSheetTable: React.FC<CurrentSheetTableProps> = ({ data }) => {
    const currentSheetColumns: GridColDef[] = [
        { field: "asset_name", headerName: "Asset Name", flex: 1, headerAlign: "center" },
        { field: "balance", headerName: "Balance", flex: 1, headerAlign: "center", type: "number" },
        { field: "last_transaction_id", headerName: "Last Transaction ID", flex: 1, headerAlign: "center" },
        { field: "updated_at", headerName: "Last Updated", flex: 1, headerAlign: "center" },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={data}
                columns={currentSheetColumns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection={false}
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default CurrentSheetTable;