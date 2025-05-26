import type { ReqCreateAssetTypeDto, ReqUpdateAssestTypeDto, ResEntryAssetTypeDto, ResListAssetTypeDto } from "../domain/dto/asset_type_dto";
import useAssetTypeStore from "../store/asset_type_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";





export class AssetTypeService {

    private static instance: AssetTypeService;
    private constructor() {}
    public static getInstance(): AssetTypeService {
        if (!AssetTypeService.instance) {
            AssetTypeService.instance = new AssetTypeService();
        }
        return AssetTypeService.instance;
    } // end getInstance

    public async getAssetTypeList(): Promise<void> {
        // Initial setup
        const base_url = UrlManagement.getBaseAssetTypeUrl();
        const user_token = useTokenStore.getState().token;
        const asset_type_store = useAssetTypeStore.getState();

        // start fetch
        
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
                },
            });
            // handle response
            // handle response
            if (!response.ok) {
                throw new Error(`Error fetching expense list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            const data = await response.json();
            const assetTypeListDto = data.data as ResListAssetTypeDto;
            asset_type_store.setAssetTypes(assetTypeListDto);
        } catch (error) {
            console.error("Error fetching asset type list:", error);
            throw error; // Re-throw the error for further handling
        }


    }// end getAssetTypeList

    public async createAssetType(asset_type_dto: ReqCreateAssetTypeDto): Promise<ResEntryAssetTypeDto> {
        const base_url = UrlManagement.getBaseAssetTypeUrl();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(asset_type_dto),
            });

            if (!response.ok) {
                throw new Error(`Error creating asset type: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            // Optionally, you can handle the response data here
            const data = await response.json();
            const createdAssetType: ResEntryAssetTypeDto = data.data as ResEntryAssetTypeDto; // Assuming the response structure matches your DTO
            console.log("Asset type created successfully");
            return createdAssetType;
        } catch (error) {
            console.error("Error creating asset type:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end createAssetType

    public async is_exist(name: String): Promise<boolean> {
        // Check if the asset types are already loaded in the store
        if (!name || name.trim() === "") {
            return false; // Invalid name
        }
        // Get the expense type store state
        const expense_type_store = useAssetTypeStore.getState();
        if (!expense_type_store.assetTypes || !expense_type_store.assetTypes.data) {
            return false; // No expense types available
        }
        // Check if the name exists in the expense types
        return expense_type_store.assetTypes.data.some((type) => type.name === name);
    } // end is_exist

    public async updateAssetType(target_asset_type_id: string,asset_type_dto: ReqUpdateAssestTypeDto): Promise<ResEntryAssetTypeDto> {
        const base_url = UrlManagement.getBaseAssetTypeUrl() + `/${target_asset_type_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(asset_type_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating expense type: ${response.statusText}`);
            }

            // Optionally, you can handle the response data here
            const data = await response.json();
            const updatedAssetType: ResEntryAssetTypeDto = data.data as ResEntryAssetTypeDto; // Assuming the response structure matches your DTO
            console.log("Asset type updated successfully");
            return updatedAssetType;
        } catch (error) {
            console.error("Error updating asset type:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end updateAssetType

    public async deleteAssetType(asset_type_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseAssetTypeUrl() + `/${asset_type_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 404) {
                throw new Error("Asset type not found.");
            } else if (response.status !== 200) {
                throw new Error(`Error deleting asset type: ${response.statusText}`);
            }

            console.log("Asset type deleted successfully");
        } catch (error) {
            console.error("Error deleting asset type:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end deleteAssetType

}// end class AssetTypeService