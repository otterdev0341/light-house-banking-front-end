import type { ResListCurrentSheetDto } from "../domain/dto/current_sheet_dto";
import useCurrentSheetStore from "../store/current_sheet_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";





export class CurrentSheetService {
    private static instance: CurrentSheetService;
    private constructor() {}
    public static getInstance(): CurrentSheetService {
        if (!CurrentSheetService.instance) {
            CurrentSheetService.instance = new CurrentSheetService();
        }
        return CurrentSheetService.instance;
    }

    public async getCurrentSheet(): Promise<void> {
        const base_url = UrlManagement.getCurrentSheet();
        const user_token = useTokenStore.getState().token;
        const current_sheet_store = useCurrentSheetStore.getState();
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching current sheet: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            const data = await response.json();
            const currentSheetDto = data.data as ResListCurrentSheetDto;
            current_sheet_store.setCurrentSheet(currentSheetDto);
            console.log("Current sheet fetched successfully:", currentSheetDto);

        } catch (error) {
            console.error("Error fetching current sheet:", error);
            throw error; // Re-throw the error for further handling
        }
    }
}