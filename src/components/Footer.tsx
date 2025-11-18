import { useState } from 'react'

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

interface FooterProps {
  faucetInfo: FaucetInfo | null;
  selectedNetwork?: 'mainnet' | 'testnet';
}

function Footer({ faucetInfo, selectedNetwork = 'mainnet' }: FooterProps) {
  const mainnetInfo = faucetInfo?.networks.find(n => n.name === 'mainnet')
  const [showCopied, setShowCopied] = useState(false)
  
  const copyAddress = async () => {
    if (mainnetInfo?.faucetAddress) {
      try {
        await navigator.clipboard.writeText(mainnetInfo.faucetAddress)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }
  
  return (
    <>
      {/* Toast notification for copied address */}
      {showCopied && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 text-sm font-medium z-50 animate-fade-in">
          Address copied
        </div>
      )}
      
      <footer className="border-t border-black/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          <div>
            <h4 className="text-xs font-bold mb-3 sm:mb-4 text-black uppercase tracking-wider">About</h4>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
              Selendra Faucet provides test tokens for EVM blockchain development.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold mb-3 sm:mb-4 text-black uppercase tracking-wider">Resources</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="https://selendra.org/docs" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity">Documentation</a>
              <a href="https://explorer.selendra.org" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity">Block Explorer</a>
              <a href="https://github.com/selendra" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-black hover:opacity-60 transition-opacity">GitHub</a>
            </div>
          </div>

          {mainnetInfo && (
            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold mb-3 sm:mb-4 text-black uppercase tracking-wider">Faucet Address</h4>
              <div
                onClick={copyAddress}
                className={`text-xs sm:text-sm text-black/60 font-mono break-all transition-colors cursor-pointer text-left group w-full ${
                  selectedNetwork === 'testnet' ? 'hover:text-testnet' : 'hover:text-mainnet'
                }`}
                title="Click to copy full address"
              >
                <span className="hidden sm:inline">
                  {mainnetInfo.faucetAddress.slice(0, 10)}...{mainnetInfo.faucetAddress.slice(-10)}
                </span>
                <span className="sm:hidden break-all">
                  {mainnetInfo.faucetAddress}
                </span>
                <span className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">📋</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-6 sm:pt-8">
          <p className="text-xs text-black/40 uppercase tracking-wider">© 2025 Selendra</p>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
