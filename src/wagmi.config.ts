import { http, createConfig } from "wagmi";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";

// Define Selendra chains
export const selendraMainnet = {
  id: 1961,
  name: "Selendra Network",
  nativeCurrency: {
    name: "Selendra",
    symbol: "SEL",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.selendra.org"] },
    public: { http: ["https://rpc.selendra.org"] },
  },
  blockExplorers: {
    default: {
      name: "Selendra Explorer",
      url: "https://explorer.selendra.org",
    },
  },
  testnet: false,
} as const;

export const selendraTestnet = {
  id: 1953,
  name: "Selendra Testnet",
  nativeCurrency: {
    name: "Selendra",
    symbol: "SEL",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.selendra.org"] },
    public: { http: ["https://rpc-testnet.selendra.org"] },
  },
  blockExplorers: {
    default: {
      name: "Selendra Testnet Explorer",
      url: "https://testnet-explorer.selendra.org",
    },
  },
  testnet: true,
} as const;

// WalletConnect project ID from https://dashboard.reown.com/
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn(
    "WalletConnect project ID not set. WalletConnect will not work."
  );
}

export const config = createConfig({
  chains: [selendraMainnet, selendraTestnet],
  connectors: [
    injected({
      target: {
        id: "metaMask",
        name: "MetaMask",
        provider: (window: any) =>
          window.ethereum?.isMetaMask ? window.ethereum : undefined,
      },
    }),
    injected({
      target: {
        id: "brave",
        name: "Brave Wallet",
        provider: (window: any) =>
          window.ethereum?.isBraveWallet ? window.ethereum : undefined,
      },
    }),
    injected({
      target: {
        id: "subwallet",
        name: "SubWallet",
        provider: (window: any) =>
          window.SubWallet ? window.SubWallet : undefined,
      },
    }),
    injected({
      target: {
        id: "phantom",
        name: "Phantom",
        provider: (window: any) =>
          window.phantom?.ethereum ? window.phantom.ethereum : undefined,
      },
    }),
    coinbaseWallet({
      appName: "Selendra Faucet",
      appLogoUrl: "https://selendra.org/logo.png",
    }),
    walletConnect({
      projectId,
      metadata: {
        name: "Selendra Faucet",
        description: "Get Selendra tokens for development and testing",
        url: "https://faucet.selendra.org",
        icons: ["https://selendra.org/logo.png"],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [selendraMainnet.id]: http(),
    [selendraTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
