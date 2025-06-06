import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AssetTable from "../data_table/asset_table";
import AssetTypeTable from "../data_table/asset_type_table";
import useTokenStore from "../../store/token_store";
import useAssetStore from "../../store/asset_store";
import useAssetTypeStore from "../../store/asset_type_store";
import { AssetService } from "../../service/asset_service";
import { AssetTypeService } from "../../service/asset_type_service";
import { Autocomplete } from "@mui/material";
import type { ReqUpdateAssestTypeDto } from "../../domain/dto/asset_type_dto";




const AssetPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
    const [isAssetTypeModalOpen, setIsAssetTypeModalOpen] = useState<boolean>(false);
    const [newAsset, setNewAsset] = useState<{ name: string; asset_type_id: string | null }>({
        name: "",
        asset_type_id: null,
    });
    const [newAssetType, setNewAssetType] = useState<string>("");
    const [selectedAssetType, setSelectedAssetType] = useState<{ id: string; name: string } | null>(null);
    const token = useTokenStore((state) => state.token);
    const asset_store = useAssetStore((state) => state.assets);
    const asset_type_store = useAssetTypeStore((state) => state.assetTypes);


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleCreateAsset = () => {
        setIsAssetModalOpen(true);
    };

    const handleCreateAssetType = () => {
        setIsAssetTypeModalOpen(true);
    };

    const handleCloseAssetModal = () => {
        setIsAssetModalOpen(false);
    };

    const handleCloseAssetTypeModal = () => {
        setIsAssetTypeModalOpen(false);
    };

    const handle_create_asset = async (assetDto: { name: string; asset_type_id: string | null }) => {
        const asset_service = AssetService.getInstance();

        if (!assetDto.name.trim() || !assetDto.asset_type_id) {
            alert("Name and Asset Type are required.");
            return;
        }

        try {
            const response = await asset_service.createAsset({
                ...assetDto,
                asset_type_id: assetDto.asset_type_id || "", // Ensure asset_type_id is a string
            });
            console.log("Asset Created:", response);

            // Refresh the asset list
            await asset_service.getAssetList();

            // Clear the input fields
            setNewAsset({
                name: "",
                asset_type_id: null,
            });
            setIsAssetModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error creating asset:", error);
            alert("An error occurred while creating the asset. Please try again.");
        }
    };

    const handle_create_asset_type = async (name: string) => {
        const asset_type_service = AssetTypeService.getInstance();

        if (!name.trim()) {
            alert("Name is required.");
            return;
        }

        try {
            const response = await asset_type_service.createAssetType({ name });
            console.log("Asset Type Created:", response);

            // Refresh the asset type list
            await asset_type_service.getAssetTypeList();

            // Clear the input field
            setNewAssetType(""); // Clear the input field
            setIsAssetTypeModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error creating asset type:", error);
            alert("An error occurred while creating the asset type. Please try again.");
        }
    };

    const handle_update_asset = async (assetId: string, updateDto: { name?: string; asset_type_id?: string }) => {
        const asset_service = AssetService.getInstance();

        try {
            const response = await asset_service.update_asset(assetId, updateDto);
            console.log("Asset Updated:", response);

            // Refresh the asset list
            await asset_service.getAssetList();

        } catch (error) {
            console.error("Error updating asset:", error);
            alert("An error occurred while updating the asset. Please try again.");
        }
    };

    const handle_update_asset_type = async (assetTypeId: string, updateDto: ReqUpdateAssestTypeDto) => {
        const asset_type_service = AssetTypeService.getInstance();
        const asset_service = AssetService.getInstance();
        try {
            const response = await asset_type_service.updateAssetType(assetTypeId, updateDto);
            console.log("Asset Type Updated:", response);

            // Refresh the asset type list
            await asset_type_service.getAssetTypeList();
            await asset_service.getAssetList(); // Refresh the asset list as well
        } catch (error) {
            console.error("Error updating asset type:", error);
            alert("An error occurred while updating the asset type. Please try again.");
        }
    }

    const handle_delete_asset = async (assetId: string) => {
        const asset_service = AssetService.getInstance();

        try {
            await asset_service.delete_asset(assetId);
            console.log("Asset Deleted:", assetId);

            // Refresh the asset list
            await asset_service.getAssetList();
        } catch (error) {
            console.error("Error deleting asset:", error);
            alert("An error occurred while deleting the asset. Please try again.");
        }
    };

    const handle_delete_asset_type = async (assetTypeId: string) => {
        const asset_type_service = AssetTypeService.getInstance();
        
        try {
            await asset_type_service.deleteAssetType(assetTypeId);
            console.log("Asset Type Deleted:", assetTypeId);

            // Refresh the asset type list
            await asset_type_service.getAssetTypeList();
        } catch (error) {
            console.error("Error deleting asset type:", error);
            alert("An error occurred while deleting the asset type. Please try again.");
        }
    }

    // asset store fetch
    useEffect(() => {
        const fetchAssets = async () => {
            if (token) {
                try {
                    // Simulate fetching assets
                    const asset_service = AssetService.getInstance();
                    await asset_service.getAssetList();
                    
                } catch (error) {
                    console.error("Error fetching assets:", error);
                }
            }
        };

        fetchAssets();
    },[token]);
    if (!asset_store || !asset_store.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Expense Type</h1>
                <p className="text-lg">No expense type data available.</p>
            </div>
        );
    }
    // asset type fetch
    useEffect(() => {
        const fetchAssetType = async () => {
            if (token) {
                try {
                    // Simulate fetching assets
                    const asset_type_service = AssetTypeService.getInstance();
                    await asset_type_service.getAssetTypeList();
                    
                } catch (error) {
                    console.error("Error fetching assets:", error);
                }
            }
        };

        fetchAssetType();
    },[token]);
    if (!asset_type_store || !asset_type_store.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Expense Type</h1>
                <p className="text-lg">No expense type data available.</p>
            </div>
        );
    }



    return (
        <div className="container mx-auto p-4" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Assets" />
                    <Tab label="Asset Types" />
                </Tabs>
            </Box>

            {/* Assets Section */}
            <Box hidden={tabIndex !== 0} sx={{ mt: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Assets</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateAsset}>
                        Create New Asset
                    </Button>
                </div>
                <div style={{ flex: 1 }}>
                <AssetTable
                    data={asset_store.data}
                    onEdit={(updatedAsset) =>
                        handle_update_asset(updatedAsset.id, {
                            name: updatedAsset.name,
                            asset_type_id: updatedAsset.asset_type_id,
                        })
                    }
                    onDelete={handle_delete_asset}
                />
                </div>
            </Box>

            {/* Asset Types Section */}
            <Box hidden={tabIndex !== 1} sx={{ mt: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Asset Types</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateAssetType}>
                        Create New Asset Type
                    </Button>
                </div>
                <div style={{ flex: 1 }}>
                <AssetTypeTable
                    data={asset_type_store.data}
                    onEdit={(updatedAssetType) => {
                        handle_update_asset_type(updatedAssetType.id, { name: updatedAssetType.name });
                        setIsAssetTypeModalOpen(false); // Close the modal after saving
                    }}
                    onDelete={handle_delete_asset_type}
                />
                </div>
            </Box>

            {/* Modal for Creating Asset */}
            <Dialog open={isAssetModalOpen} onClose={handleCloseAssetModal}>
                <DialogTitle>Create New Asset</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newAsset.name}
                        onChange={(e) =>
                            setNewAsset((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <Autocomplete
                        options={asset_type_store?.data || []} // Use asset types from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset type
                        value={
                            asset_type_store?.data.find(
                                (type) => type.id === newAsset.asset_type_id
                            ) || null
                        } // Set the current value
                        onChange={(event, value) =>
                            setNewAsset((prev) => ({
                                ...prev,
                                asset_type_id: value?.id || null,
                            }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Asset Type" fullWidth margin="normal" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAssetModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_asset(newAsset)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Asset Type */}
            <Dialog open={isAssetTypeModalOpen} onClose={handleCloseAssetTypeModal}>
                <DialogTitle>Create New Asset Type</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newAssetType}
                        onChange={(e) => setNewAssetType(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAssetTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_asset_type(newAssetType)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AssetPage;