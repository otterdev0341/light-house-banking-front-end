import type { ReqSignInDto, ReqSignUpDto, ResMeDto, ResSignInDto } from "../domain/dto/user_dto";
import useTokenStore from "../store/token_store";
import useUserStore from "../store/user_store";
import { UrlManagement } from "../utility/url_management";
import { UserService } from "./user_service";


class AuthService {
    private static instance: AuthService;
    
    private constructor() {
        // Private constructor to prevent instantiation
    }
    
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
        AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    
    public async login(the_dto: ReqSignInDto): Promise<void> {
        const tokenStore = useTokenStore.getState();
        const sign_in_url: string = UrlManagement.getAuthUrl("SignIn");

        try {
            // 1: perform login
            const response = await fetch(sign_in_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(the_dto),
            });

            // Handle different status codes
            if (response.status === 200) {
                const responseData = await response.json();
                const token = responseData.data?.token; // Access the nested token
                if (!token) {
                    throw new Error("Token is missing in the server response.");
                }
                console.log("Login successful:", responseData);
                console.log("Token received from server:", token);
                tokenStore.setToken(token); // Store the token in the token store
                console.log("Token saved to store successfully.");

                
                

            } else if (response.status === 400) {
                const errorData = await response.json();
                console.error("Validation error:", errorData);
                throw new Error(errorData.message || "Validation error occurred.");
            } else if (response.status === 500) {
                console.error("Internal server error.");
                throw new Error("Internal server error. Please try again later.");
            } else {
                console.error("Unexpected error:", response.statusText);
                throw new Error(`Unexpected error: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            throw error; // Re-throw the error for further handling
        }

    }
    
    public async logout(): Promise<void> {
        // inject token store
        const tokenStore = useTokenStore.getState();
        tokenStore.clearToken(); // Clear the token from the store
        console.log('User logged out successfully');
    }
    
    public async register(the_dto: ReqSignUpDto): Promise<ResMeDto> {
        // Implement registration logic here
        const user_store = useUserStore.getState();
        const sign_up_url: string = UrlManagement.getAuthUrl("SignUp");
        try {
            const response = await fetch(sign_up_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(the_dto),
            });

            if (response.status === 201) {
                const data: ResMeDto = await response.json();
                user_store.setUser(data); // Store the user in the user store
                console.log('User registered successfully:', data);
                return data;
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.error('Validation error:', errorData);
                throw new Error(errorData.message || 'Validation error occurred.');
            } else if (response.status === 500) {
                console.error('Internal server error.');
                throw new Error('Internal server error. Please try again later.');
            } else {
                console.error('Unexpected error:', response.statusText);
                throw new Error(`Unexpected error: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error('Error during registration:', error);
            throw error; // Re-throw the error for further handling
        }
    }
}

export default AuthService;