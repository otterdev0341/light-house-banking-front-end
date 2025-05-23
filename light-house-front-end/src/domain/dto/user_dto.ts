export interface ReqSignInDto {
    email: string;     // validated as email
    password: string;  // min length 8
  }
  
  export interface ResSignInDto {
    token: string;
  }
  
  export interface ReqSignUpDto {
    username: string;     // min 6
    password: string;     // min 8
    email: string;        // validated as email
    first_name: string;   // min 1
    last_name: string;    // min 1
    gender: string;       // min 3
  }
  
  export interface Claims {
    sub: string;    // UUID as string
    role: string;
    exp: number;    // Unix timestamp
  }
  
  export interface ReqUpdateUserDto {
    username?: string;
    password?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
  }
  
  export interface ResMeDto {
    id: string;
    gender: string;
    user_role: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  