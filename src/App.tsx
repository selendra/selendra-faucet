import { useState, useEffect } from 'react'
// Component imports
import Faucet from './components/Faucet.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

interface FaucetInfo {
  success: boolean;
  networks: Array<{
    name: string;
    displayName: string;
    chainId: number;
    faucetAddress: string;
    balance: string;
    faucetAmount: string;
    rateLimitHours: number;
    rpcEndpoint: string;
    explorer: string;
  }>;
}

function App() {
  const [faucetInfo, setFaucetInfo] = useState<FaucetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<'mainnet' | 'testnet'>('testnet');

  useEffect(() => {
    fetchFaucetInfo();
  }, []);

  const fetchFaucetInfo = async () => {
    try {
      const response = await fetch('/api/info');
      const data = await response.json();
      setFaucetInfo(data);
    } catch (error) {
      console.error('Failed to fetch faucet info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        {loading ? (
          <div className="text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs sm:text-sm text-black/60">Loading...</p>
          </div>
        ) : (
          <Faucet faucetInfo={faucetInfo} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        )}
      </main>
      <Footer faucetInfo={faucetInfo} selectedNetwork={selectedNetwork} />
    </div>
  )
}

export default App
