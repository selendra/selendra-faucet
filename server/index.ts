import express, { Request, Response } from "express";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Network configurations
const NETWORKS = {
  mainnet: {
    rpc: process.env.MAINNET_RPC_ENDPOINT || "https://rpc.selendra.org",
    chainId: 1961,
    name: "Selendra Mainnet",
    amount: process.env.MAINNET_FAUCET_AMOUNT || "0.01",
    rateLimitWindow: 60 * 60 * 1000, // 1 hour
    explorer: "https://explorer.selendra.org",
  },
  testnet: {
    rpc: process.env.TESTNET_RPC_ENDPOINT || "https://rpc-testnet.selendra.org",
    chainId: 1953,
    name: "Selendra Testnet",
    amount: process.env.TESTNET_FAUCET_AMOUNT || "10",
    rateLimitWindow: 24 * 60 * 60 * 1000, // 24 hours
    explorer: "https://testnet-explorer.selendra.org",
  },
};

// Rate limiting storage per network (in production, use Redis or database)
const requestHistory = {
  mainnet: new Map<string, number>(),
  testnet: new Map<string, number>(),
};

// Providers and wallets for both networks
let providers: {
  mainnet: ethers.JsonRpcProvider;
  testnet: ethers.JsonRpcProvider;
} = {} as any;
let wallets: {
  mainnet: ethers.Wallet | ethers.HDNodeWallet;
  testnet: ethers.Wallet | ethers.HDNodeWallet;
} = {} as any;
let isReady = false;

interface FaucetRequest {
  address: string;
  network: "mainnet" | "testnet";
}

interface FaucetResponse {
  success: boolean;
  message?: string;
  txHash?: string;
  amount?: string;
  explorer?: string;
  error?: string;
}

interface HealthResponse {
  status: string;
  faucetAddress?: string;
  balance?: string;
  network?: string;
  rpcEndpoint?: string;
  message?: string;
}

async function initializeSDK(): Promise<void> {
  try {
    console.log("Connecting to Selendra Networks...");

    if (!process.env.FAUCET_PRIVATE_KEY) {
      throw new Error("FAUCET_PRIVATE_KEY environment variable is required");
    }

    const privateKeyOrMnemonic = process.env.FAUCET_PRIVATE_KEY.trim();

    // Initialize both networks
    for (const [networkName, config] of Object.entries(NETWORKS)) {
      const networkKey = networkName as "mainnet" | "testnet";

      // Initialize provider
      const provider = new ethers.JsonRpcProvider(config.rpc);
      providers[networkKey] = provider;

      // Test connection
      const network = await provider.getNetwork();
      console.log(
        `✅ Connected to ${config.name} (Chain ID: ${network.chainId})`
      );

      // Create wallet
      let wallet: ethers.Wallet | ethers.HDNodeWallet;
      if (privateKeyOrMnemonic.split(" ").length >= 12) {
        // It's a mnemonic (seed phrase)
        wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonic, provider);
      } else {
        // It's a private key
        wallet = new ethers.Wallet(privateKeyOrMnemonic, provider);
      }

      wallets[networkKey] = wallet;
      console.log(`🔑 ${config.name} wallet address: ${wallet.address}`);

      // Check faucet balance
      const balance = await provider.getBalance(wallet.address);
      const balanceInSEL = ethers.formatEther(balance);
      console.log(`💰 ${config.name} balance: ${balanceInSEL} SEL`);

      if (balance === 0n) {
        console.warn(`⚠️  WARNING: ${config.name} wallet has 0 balance!`);
      }
    }

    isReady = true;
  } catch (error) {
    console.error("❌ Failed to initialize:", error);
    throw error;
  }
}

// Check if address has requested recently
function checkRateLimit(
  address: string,
  network: "mainnet" | "testnet"
): {
  allowed: boolean;
  message?: string;
} {
  const now = Date.now();
  const lastRequest = requestHistory[network].get(address.toLowerCase());
  const rateLimitWindow = NETWORKS[network].rateLimitWindow;

  if (lastRequest && now - lastRequest < rateLimitWindow) {
    const timeLeft = rateLimitWindow - (now - lastRequest);
    const hoursLeft = Math.ceil(timeLeft / (60 * 60 * 1000));
    return {
      allowed: false,
      message: `You've already received tokens recently! Please come back in ${hoursLeft} ${
        hoursLeft === 1 ? "hour" : "hours"
      } ⏰`,
    };
  }

  return { allowed: true };
}

// Validate Ethereum/EVM address
function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

// Faucet endpoint
app.post(
  "/api/faucet",
  async (
    req: Request<{}, {}, FaucetRequest>,
    res: Response<FaucetResponse>
  ) => {
    try {
      const { address, network = "testnet" } = req.body;

      // Validate network
      if (network !== "mainnet" && network !== "testnet") {
        return res.status(400).json({
          success: false,
          error: "Invalid network. Must be 'mainnet' or 'testnet'",
        });
      }

      const networkConfig = NETWORKS[network];
      const wallet = wallets[network];

      // Validate input
      if (!address) {
        return res.status(400).json({
          success: false,
          error: "Address is required",
        });
      }

      // Validate address format
      if (!isValidAddress(address)) {
        return res.status(400).json({
          success: false,
          error: "Invalid EVM address",
        });
      }

      // Check rate limit
      const rateLimitCheck = checkRateLimit(address, network);
      if (!rateLimitCheck.allowed) {
        return res.status(429).json({
          success: false,
          error: rateLimitCheck.message,
        });
      }

      // Check if SDK is initialized
      if (!isReady || !wallet) {
        return res.status(503).json({
          success: false,
          error: "Faucet service is not ready. Please try again later.",
        });
      }

      // Check faucet balance
      const faucetBalance = await wallet.provider!.getBalance(wallet.address);
      const amountToSend = ethers.parseEther(networkConfig.amount);

      if (faucetBalance < amountToSend) {
        return res.status(503).json({
          success: false,
          error:
            "Faucet is currently out of funds. Please contact the administrator.",
        });
      }

      console.log(
        `📤 Processing ${network} faucet request for address: ${address}`
      );

      // Send transaction
      const tx = await wallet.sendTransaction({
        to: address,
        value: amountToSend,
      });

      console.log(
        `⏳ Transaction sent: ${tx.hash}, waiting for confirmation...`
      );

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      // Update rate limit
      requestHistory[network].set(address.toLowerCase(), Date.now());

      console.log(`✅ Transaction confirmed in block ${receipt?.blockNumber}`);

      res.json({
        success: true,
        message: "Tokens sent successfully!",
        txHash: tx.hash,
        amount: networkConfig.amount,
        explorer: `${networkConfig.explorer}/tx/${tx.hash}`,
      });
    } catch (error: any) {
      console.error("❌ Faucet error:", error);
      res.status(500).json({
        success: false,
        error:
          error.message || "Failed to send tokens. Please try again later.",
      });
    }
  }
);

// Get faucet info endpoint (returns info for both networks)
app.get("/api/info", async (req: Request, res: Response) => {
  try {
    if (!isReady) {
      return res.status(503).json({
        success: false,
        error: "Service is initializing",
      });
    }

    const networks = [];

    for (const [networkName, config] of Object.entries(NETWORKS)) {
      const networkKey = networkName as "mainnet" | "testnet";
      const wallet = wallets[networkKey];
      const balance = await wallet.provider!.getBalance(wallet.address);
      const balanceInSEL = ethers.formatEther(balance);

      networks.push({
        name: networkKey,
        displayName: config.name,
        chainId: config.chainId,
        faucetAddress: wallet.address,
        balance: balanceInSEL,
        faucetAmount: config.amount,
        rateLimitHours: config.rateLimitWindow / (60 * 60 * 1000),
        rpcEndpoint: config.rpc,
        explorer: config.explorer,
      });
    }

    res.json({
      success: true,
      networks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    if (!isReady) {
      return res.status(503).json({
        status: "unavailable",
        message: "Service is initializing",
      });
    }

    res.json({
      status: "healthy",
      networks: Object.keys(NETWORKS),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
async function start(): Promise<void> {
  try {
    await initializeSDK();

    app.listen(PORT, () => {
      console.log(`\n🚀 Faucet server running on port ${PORT}`);
      console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🌐 Networks: Mainnet & Testnet\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down faucet...");
  process.exit(0);
});

start();
