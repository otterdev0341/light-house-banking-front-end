import type { ReqCreateAssetDto, ReqUpdateAssetDto, ResEntryAssetDto, ResListAssetDto } from "../domain/dto/asset_dto";
import useAssetStore from "../store/asset_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";





export class AssetService {
    private static instance: AssetService;
    
    private constructor() {}

    public static getInstance(): AssetService {
        if (!AssetService.instance) {
            AssetService.instance = new AssetService();
        }
        return AssetService.instance;
    } // end getInstance

    // Add methods for fetching assets, similar to the ExpenseService
    public async getAssetList(): Promise<void> {
        // Initial setup
        const base_url = UrlManagement.getBaseAssetUrl();
        const user_token = useTokenStore.getState().token;
        const asset_store = useAssetStore.getState();

        // Start fetch
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
                },
            });
            // handle response
            if (!response.ok) {
                throw new Error(`Error fetching asset list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            const data = await response.json();
            const assetListDto = data.data as ResListAssetDto; // Assuming the response structure matches your DTO
            asset_store.setAssets(assetListDto);
        } catch (error) {
            console.error("Error fetching asset list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end getAssetList

    public async createAsset(asset_dto: ReqCreateAssetDto): Promise<ResEntryAssetDto> {
        const base_url = UrlManagement.getBaseAssetUrl();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(asset_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 201) {
                throw new Error(`Error creating expense type: ${response.statusText}`);
            }

            // Optionally, you can handle the response data here
            const data = await response.json();
            // Assuming the response structure matches your DTO
            const createdAsset = data.data as ResEntryAssetDto; // Adjust based on your actual response structure
            console.log("Asset created successfully");
            return createdAsset; // Return the created asset if needed
        } catch (error) {
            console.error("Error creating asset:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end createAsset

    public async is_exist(description: String): Promise<boolean> {
        // Check if the expense types are already loaded in the store
        if (!description || description.trim() === "") {
            return false; // Invalid name
        }
        // Get the expense type store state
        const expense_type_store = useAssetStore.getState();
        if (!expense_type_store.assets || !expense_type_store.assets.data) {
            return false; // No expense types available
        }
        // Check if the name exists in the expense types
        return expense_type_store.assets.data.some((each) => each.name === description);
    } // end is_exist


    public async update_asset(asset_id: string, asset_dto: ReqUpdateAssetDto): Promise<ResEntryAssetDto> {
        const base_url = UrlManagement.getBaseAssetUrl() + `/${asset_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(asset_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating asset: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryAssetDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error updating asset:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end update_asset



    public async delete_asset(asset_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseAssetUrl() + `/${asset_id}`;
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
                throw new Error("Asset not found.");
            } else if (response.status !== 200) {
                throw new Error(`Error deleting asset: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error deleting asset:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end delete_asset


}// enc AssetService