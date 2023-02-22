import { uuid as uiuidV4 } from "aws-sdk/clients/customerprofiles";

export interface IWallet {
  id: string;
  name: string;
  currency: "ETH";
  balance: number;
  todayBalanceChange?: number[];
  createdAt?: string;
  updatedAt?: string;
}
