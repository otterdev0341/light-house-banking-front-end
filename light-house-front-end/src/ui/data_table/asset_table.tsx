import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete } from "@mui/material";
import useAssetTypeStore from "../../store/asset_type_store";

interface AssetTableProps {
  data: any[];
  onEdit: (asset: any) => void;
  onDelete: (assetId: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ data, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const assetTypes = useAssetTypeStore((state) => state.assetTypes?.data || []);

  const handleEditClick = (asset: any) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (asset: any) => {
    setSelectedAsset(asset);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAsset(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAsset(null);
  };

  const handleConfirmDelete = () => {
    if (selectedAsset) {
      onDelete(selectedAsset.id);
    }
    handleCloseDeleteModal();
  };

  const handleSaveEdit = () => {
    if (selectedAsset) {
      onEdit({
        id: selectedAsset.id,
        name: selectedAsset.name,
        asset_type_id: selectedAsset.asset_type_id,
      });
    }
    handleCloseEditModal();
  };

  const assetColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, headerAlign: "center" },
    {
      field: "asset_type",
      headerName: "Asset Type",
      flex: 1,
      headerAlign: "center",
    },
    { field: "created_at", headerName: "Created At", flex: 1, headerAlign: "center" },
    { field: "updated_at", headerName: "Updated At", flex: 1, headerAlign: "center" },
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={assetColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 30,40,50]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Asset</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={selectedAsset?.name || ""}
            onChange={(e) =>
              setSelectedAsset((prev: any) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Autocomplete
            options={assetTypes} // Use asset types from the store
            getOptionLabel={(option) => option.name} // Display the name of the asset type
            value={assetTypes.find(
                (type) => type.id === selectedAsset?.asset_type_id
              ) || null} // Set the current value
            onChange={(event, value) =>
              setSelectedAsset((prev: any) => ({
                ...prev,
                asset_type_name: value?.name || "",
                asset_type_id: value?.id || null, // Store the ID for updates
              }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Asset Type" fullWidth margin="normal" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedAsset?.name}</strong>?
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

export default AssetTable;