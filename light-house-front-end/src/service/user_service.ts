import type { ResMeDto } from "../domain/dto/user_dto";
import useTokenStore from "../store/token_store";
import useUserStore from "../store/user_store";
import { UrlManagement } from "../utility/url_management";





export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUserInfo(): Promise<void> {
    const base_url = UrlManagement.getAuthUrl("Me");
    const user_token = useTokenStore.getState().token;
    const user_store = useUserStore.getState();
    try {
      const response = await fetch(base_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
          // Add any other necessary headers here
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user info: ${response.statusText}`);
      } else if (response.status === 401) {
        throw new Error("Unauthorized access. Please log in again.");
      }
        const userInfo = await response.json();
        const user: ResMeDto = (userInfo.data as ResMeDto);
        user_store.setUser(user);
        console.log("User info fetched successfully:", user);

    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error; // Re-throw the error for further handling   
    }
    }// end getUserInfo
}// end class