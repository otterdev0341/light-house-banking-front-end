import type { ResListAssetDto } from "../domain/dto/asset_dto";
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
}