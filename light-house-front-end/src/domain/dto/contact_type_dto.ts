export interface ReqCreateContactTypeDto {
    name: string; // must not be empty
  }
  
  export interface ReqUpdateContactTypeDto {
    name?: string; // optional, but if present, must not be empty
  }
  
  export interface ResEntryContactTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListContactTypeDto {
    length: number;
    data: ResEntryContactTypeDto[];
  }
  