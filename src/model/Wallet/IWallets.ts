export interface IWallet {
  id: string;
  name: string;
  currency: 'ETH';
  balance: number;
  todayBalanceChange?: number[];
  createdAt?: string;
  updatedAt?: string;
}
