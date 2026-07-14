export type Wallet = {
  id: "btc" | "eth" | "sol" | "usdt";
  name: string;
  network: string;
  address: string;
};

/**
 * Replace these with your real receiving addresses before deploying.
 * Keeping them in one place makes rotation (or adding a new chain) a
 * one-line change — nothing else in the page needs to know about it.
 */
export const wallets: Wallet[] = [
  {
    id: "btc",
    name: "Bitcoin",
    network: "BTC · on-chain",
    address: "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  {
    id: "eth",
    name: "Ethereum",
    network: "ETH · ERC-20",
    address: "0xAbCdEf0123456789AbCdEf0123456789AbCdEf01",
  },
  {
    id: "sol",
    name: "Solana",
    network: "SOL · mainnet",
    address: "3xJ4mK9pQvW2sT8rL1nH6dF5gY7cB0aZ4eR2uV9xW3qP",
  },
  {
    id: "usdt",
    name: "Tether",
    network: "USDT · TRC-20",
    address: "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
];
