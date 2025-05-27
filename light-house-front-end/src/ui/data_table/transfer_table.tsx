import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAssetStore from "../../store/asset_store";
import useContactStore from "../../store/contact_store";

interface TransferTableProps {
    data: any[];
    onEdit: (transfer: any) => void;
    onDelete: (transferId: string) => void;
}

const TransferTable: React.FC<TransferTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
    const asset_store = useAssetStore((state) => state.assets);
    const contact_store = useContactStore((state) => state.contacts);

    const handleEditClick = (transfer: any) => {
        setSelectedTransfer(transfer);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (transfer: any) => {
        setSelectedTransfer(transfer);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTransfer(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedTransfer(null);
    };

    const handleConfirmDelete = () => {
        if (selectedTransfer) {
            onDelete(selectedTransfer.id);
        }
        handleCloseDeleteModal();
    };

    const handleFieldChange = (field: string, value: any) => {
        setSelectedTransfer((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const transferColumns: GridColDef[] = [
        { field: "transaction_type_name", headerName: "Transaction Type", flex: 1, headerAlign: "center" },
        { field: "amount", headerName: "Amount", flex: 1, headerAlign: "center" },
        { field: "asset_name", headerName: "Source Asset", flex: 1, headerAlign: "center" },
        { field: "destination_asset_name", headerName: "Destination Asset", flex: 1, headerAlign: "center" },
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
                <div className="flex items-center gap-2" style={{ justifyContent: "center", width: "100%" }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditClick(params.row)} className="text-blue-500 hover:text-blue-700">
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteClick(params.row)} className="text-red-500 hover:text-red-700">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={transferColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Transfer</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Transaction Type"
                        fullWidth
                        margin="normal"
                        value={selectedTransfer?.transaction_type_name || ""}
                        disabled={true}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(selectedTransfer?.created_at)}
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
                        value={selectedTransfer?.amount || ""}
                        onChange={(e) => handleFieldChange("amount", parseFloat(e.target.value) || 0)}
                    />
                    <Autocomplete
                        options={asset_store?.data || []}
                        getOptionLabel={(option) => option.name || ""}
                        value={asset_store?.data?.find((item) => item.id === selectedTransfer?.asset_id) || null}
                        onChange={(event, value) => handleFieldChange("asset_id", value?.id || "")}
                        renderInput={(params) => <TextField {...params} label="Source Asset" fullWidth margin="normal" />}
                    />
                    <Autocomplete
                        options={asset_store?.data || []}
                        getOptionLabel={(option) => option.name || ""}
                        value={asset_store?.data.find((item) => item.id === selectedTransfer?.destination_asset_id) || null}
                        onChange={(event, value) => handleFieldChange("destination_asset_id", value?.id || "")}
                        renderInput={(params) => <TextField {...params} label="Destination Asset" fullWidth margin="normal" />}
                    />
                    <Autocomplete
                        options={contact_store?.data || []}
                        getOptionLabel={(option) => option.name || ""}
                        value={contact_store?.data.find((item) => item.id === selectedTransfer?.contact_id) || null}
                        onChange={(event, value) => handleFieldChange("contact_id", value?.id || "")}
                        renderInput={(params) => <TextField {...params} label="Contact" fullWidth margin="normal" />}
                    />
                    <TextField
                        label="Note"
                        fullWidth
                        margin="normal"
                        value={selectedTransfer?.note || ""}
                        onChange={(e) => handleFieldChange("note", e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onEdit(selectedTransfer);
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
                    Are you sure you want to delete <strong>{selectedTransfer?.transaction_type_name}</strong>?
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

export default TransferTable;