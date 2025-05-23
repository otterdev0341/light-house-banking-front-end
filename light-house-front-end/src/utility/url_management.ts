export type AUTH = "SignIn" | "SignUp" | "Me";
export type BASECRUD = "Create" | "GetById" | "GetAll" | "Update" | "Delete";

export class UrlManagement {
  static getBaseUrl(): string {
    return "http://127.0.0.1:8000";
  }

  static getAuthUrl(auth: AUTH): string {
    switch (auth) {
      case "SignIn":
        return this.getBaseUrl() + "/v1/sign-in";
      case "SignUp":
        return this.getBaseUrl() + "/v1/sign-up";
      case "Me":
        return this.getBaseUrl() + "/v1/me";
      default:
        throw new Error("Invalid AUTH value");
    }
  }

  static getUpdateUserUrl(): string {
    return this.getBaseUrl() + "/v1/user";
  }

  static getBaseAssetTypeUrl(): string {
    return this.getBaseUrl() + "/v1/asset-type";
  }

  static getBaseAssetUrl(): string {
    return this.getBaseUrl() + "/v1/asset";
  }

  static getBaseContactType(): string {
    return this.getBaseUrl() + "/v1/contact-type";
  }

  static getBaseExpenseType(): string {
    return this.getBaseUrl() + "/v1/expense-type";
  }

  static getBaseContact(): string {
    return this.getBaseUrl() + "/v1/contact";
  }

  static getBaseExpense(): string {
    return this.getBaseUrl() + "/v1/expense";
  }

  static getIncomeRecord(): string {
    return this.getBaseUrl() + "/v1/income";
  }

  static getPaymentRecord(): string {
    return this.getBaseUrl() + "/v1/payment";
  }

  static getTransferRecord(): string {
    return this.getBaseUrl() + "/v1/transfer";
  }

  static getTransactionType(): string {
    return this.getBaseUrl() + "/v1/transaction-type";
  }

  static getCurrentSheet(): string {
    return this.getBaseUrl() + "/v1/current-sheet";
  }

  static getAssetTypeUrl(crud: BASECRUD, assetTypeId: string): string {
    switch (crud) {
      case "Create":
        return this.getBaseUrl() + "/asset-type";
      case "GetById":
        return `${this.getBaseUrl()}/asset-type/${assetTypeId}`;
      case "GetAll":
        return this.getBaseUrl() + "/asset-type";
      case "Update":
        return `${this.getBaseUrl()}/asset-type/${assetTypeId}`;
      case "Delete":
        return `${this.getBaseUrl()}/asset-type/${assetTypeId}`;
      default:
        throw new Error("Invalid BASECRUD value");
    }
  }
}
