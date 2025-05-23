import "dotenv-defaults/config"





export class HostConfig{
    baseUrl: string;
    constructor(){
        this.baseUrl = process.env.HOST_ADDRESS || "http://localhost:8080/api/v1";
    }
    getBaseUrl(){
        return this.baseUrl;
    }
}