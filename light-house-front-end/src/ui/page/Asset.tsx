import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AssetTable from "../data_table/asset_table";
import AssetTypeTable from "../data_table/asset_type_table";
import useTokenStore from "../../store/token_store";
import useAssetStore from "../../store/asset_store";
import useAssetTypeStore from "../../store/asset_type_store";
import { AssetService } from "../../service/asset_service";
import { AssetTypeService } from "../../service/asset_type_service";




const AssetPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
    const [isAssetTypeModalOpen, setIsAssetTypeModalOpen] = useState<boolean>(false);
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
                        onEdit={(asset) => console.log('Edit Asset:', asset)}
                        onDelete={(assetId) => console.log('Delete Asset:', assetId)}
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
                        onEdit={(assetType) => console.log('Edit Asset Type:', assetType)}
                        onDelete={(assetTypeId) => console.log('Delete Asset Type:', assetTypeId)}
                    />
                </div>
            </Box>

            {/* Modal for Creating Asset */}
            <Dialog open={isAssetModalOpen} onClose={handleCloseAssetModal}>
                <DialogTitle>Create New Asset</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" />
                    <TextField label="Asset Type" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAssetModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Asset")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Asset Type */}
            <Dialog open={isAssetTypeModalOpen} onClose={handleCloseAssetTypeModal}>
                <DialogTitle>Create New Asset Type</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAssetTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Asset Type")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AssetPage;