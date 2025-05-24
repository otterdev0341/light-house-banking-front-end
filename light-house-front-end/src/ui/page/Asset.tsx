import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AssetTable from "../data_table/asset_table";
import AssetTypeTable from "../data_table/asset_type_table";


const mockAssetData = {
    data: [
        {
            id: "1",
            name: "Building",
            asset_type: "Real Estate",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            name: "Vehicle",
            asset_type: "Transport",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const mockAssetTypeData = {
    data: [
        {
            id: "1",
            name: "Real Estate",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            name: "Transport",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const AssetPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
    const [isAssetTypeModalOpen, setIsAssetTypeModalOpen] = useState<boolean>(false);

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

    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Assets" />
                    <Tab label="Asset Types" />
                </Tabs>
            </Box>

            {/* Assets Section */}
            <Box hidden={tabIndex !== 0} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Assets</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateAsset}>
                        Create New Asset
                    </Button>
                </div>
                <AssetTable
                    data={mockAssetData.data}
                    onEdit={(asset) => console.log("Edit Asset:", asset)}
                    onDelete={(assetId) => console.log("Delete Asset:", assetId)}
                />
            </Box>

            {/* Asset Types Section */}
            <Box hidden={tabIndex !== 1} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Asset Types</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateAssetType}>
                        Create New Asset Type
                    </Button>
                </div>
                <AssetTypeTable
                    data={mockAssetTypeData.data}
                    onEdit={(assetType) => console.log("Edit Asset Type:", assetType)}
                    onDelete={(assetTypeId) => console.log("Delete Asset Type:", assetTypeId)}
                />
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