export interface ReqCreateAssetDto {
    name: string; // must not be empty
    asset_type_id: string; // must not be empty
  }
  
  export interface ReqUpdateAssetDto {
    name?: string;
    asset_type_id?: string;
  }
  
  export interface ResEntryAssetDto {
    id: string;
    name: string;
    asset_type: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListAssetDto {
    length: number;
    data: ResEntryAssetDto[];
  }
  