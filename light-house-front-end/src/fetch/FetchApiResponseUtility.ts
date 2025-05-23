export class FetchApiResponseUtility {

    static async fetchCreateWithCredential(
      url: string,
      body: unknown,
      jwtToken: string
    ): Promise<Response> {
      return fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });
    }
  
    static async fetchGetByIdWithCredential(
      url: string,
      targetId: string,
      jwtToken: string
    ): Promise<Response> {
      const preparedUrl = `${url}/${targetId}`;
      return fetch(preparedUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
      });
    }
  
    static async fetchGetAllWithCredential(
      url: string,
      jwtToken: string
    ): Promise<Response> {
      return fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
      });
    }
  
    static async fetchUpdateWithCredential(
      url: string,
      body: unknown,
      jwtToken: string,
      targetId: string
    ): Promise<Response> {
      const preparedUrl = `${url}/${targetId}`;
      return fetch(preparedUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });
    }
  
    static async fetchDeleteWithCredential(
      url: string,
      jwtToken: string,
      targetId: string
    ): Promise<Response> {
      const preparedUrl = `${url}/${targetId}`;
      return fetch(preparedUrl, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
      });
    }
  
    static async fetchUpdateUserWithCredential(
      url: string,
      body: unknown,
      jwtToken: string
    ): Promise<Response> {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });
    }
  }
  