export interface ReqCreateAssetTypeDto {
    name: string; // must not be empty (validated on backend)
  }
  
  export interface ReqUpdateAssestTypeDto {
    name?: string;
  }
  
  export interface ResEntryAssetTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListAssetTypeDto {
    length: number;
    data: ResEntryAssetTypeDto[];
  }
  