import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ResListIncomeDto } from "../../store/income_store";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useContactStore from "../../store/contact_store";
import useAssetStore from "../../store/asset_store";

interface IncomeTableProps {
    data: ResListIncomeDto;
    onEdit: (income: any) => void;
    onDelete: (incomeId: string) => void;
}

const IncomeTable: React.FC<IncomeTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedIncome, setSelectedIncome] = useState<any>(null);
    const contact_store = useContactStore.getState();
    const asset_store = useAssetStore.getState();

    const handleEditClick = (income: any) => {
        setSelectedIncome(income);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (income: any) => {
        setSelectedIncome(income);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedIncome(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedIncome(null);
    };

    const handleConfirmDelete = () => {
        if (selectedIncome) {
            onDelete(selectedIncome.id);
        }
        handleCloseDeleteModal();
    };

    // Handle changes dynamically for all fields
    const handleFieldChange = (field: string, value: any) => {
        setSelectedIncome((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const incomeColumns: GridColDef[] = [
        { field: "transaction_type_name", headerName: "Transaction Type", flex: 1, headerAlign: "center" },
        { field: "amount", headerName: "Amount", flex: 1, headerAlign: "center" },
        { field: "asset_name", headerName: "Asset", flex: 1, headerAlign: "center" },
        { field: "contact_name", headerName: "Contact", flex: 1, headerAlign: "center" },
        { field: "note", headerName: "Note", flex: 2, headerAlign: "center" },
        { field: "created_at", headerName: "Created At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") },
        { field: "updated_at", headerName: "Updated At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            headerAlign: "center",
            renderCell: (params) => (
                <div
                    className="flex items-center gap-2"
                    style={{ justifyContent: "center", width: "100%" }}
                >
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEditClick(params.row)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDeleteClick(params.row)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data.data}
                    columns={incomeColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Income</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Transaction Type"
                        fullWidth
                        margin="normal"
                        value={selectedIncome?.transaction_type_name || ""}
                        disabled={true} // Assuming transaction type is not editable
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(selectedIncome?.created_at)} // Bind to `selectedIncome.created_at`
                            onChange={(newValue) => {
                                if (newValue) {
                                    handleFieldChange("created_at", newValue.toISOString());
                                }
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={selectedIncome?.amount || ""}
                        onChange={(e) => handleFieldChange("amount", parseFloat(e.target.value) || 0)}
                    />
                    <Autocomplete
                        options={asset_store.assets?.data || []} // Use assets from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset
                        
                        value={
                            asset_store.assets?.data.find(
                                (asset) => asset.id === selectedIncome?.asset_id
                            ) || null
                        } // Bind to `selectedIncome.asset_id`
                        onChange={(event, value) =>
                            handleFieldChange("asset_id", value?.id || "")
                        } // Update `asset_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Asset" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        options={contact_store.contacts?.data || []} // Use contacts from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact
                        value={
                            contact_store.contacts?.data.find(
                                (contact) => contact.id === selectedIncome?.contact_id
                            ) || null
                        } // Bind to `selectedIncome.contact_id`
                        onChange={(event, value) =>
                            handleFieldChange("contact_id", value?.id || "")
                        } // Update `contact_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Contact" fullWidth margin="normal" required />
                        )}
                    />
                    <TextField
                        label="Note"
                        fullWidth
                        margin="normal"
                        value={selectedIncome?.note || ""}
                        onChange={(e) => handleFieldChange("note", e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onEdit(selectedIncome); // Pass the updated income to the parent handler
                            handleCloseEditModal();
                        }}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete <strong>{selectedIncome?.transaction_type_name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default IncomeTable;