export type Wallet = {
  id: "btc" | "eth" | "sol" | "usdt";
  name: string;
  network: string;
  address: string;
};

export const wallets: Wallet[] = [
  {
    id: "btc",
    name: "Bitcoin",
    network: "BTC · Native SegWit",
    address: "bc1q48xe6dq6tts5e6knxdtua3ytpy0mwmt97eu3pp",
  },
  {
    id: "eth",
    name: "Ethereum",
    network: "ETH · Mainnet",
    address: "0xC7D69a74747A41D496d28fb5A5DB104F918C246d",
  },
  {
    id: "usdt",
    name: "Tether",
    network: "USDT · ERC-20",
    address: "0xC7D69a74747A41D496d28fb5A5DB104F918C246d",
  },
  {
    id: "sol",
    name: "Solana",
    network: "SOL · Mainnet",
    address: "CMyBEw5Wtep9sREuGudZgeZzZNS5WMLLaoz3uNK2hXGY",
  },
];