import type { ResListAssetTypeDto } from "../domain/dto/asset_type_dto";
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

}// end class AssetTypeService