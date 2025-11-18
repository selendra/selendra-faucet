import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAccount, useSwitchChain, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface FaucetProps {
  faucetInfo: {
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
  } | null;
  selectedNetwork: 'mainnet' | 'testnet';
  setSelectedNetwork: (network: 'mainnet' | 'testnet') => void;
}

interface FaucetResponse {
  success: boolean;
  message?: string;
  txHash?: string;
  amount?: string;
  explorer?: string;
  error?: string;
}

function Faucet({ faucetInfo, selectedNetwork, setSelectedNetwork }: FaucetProps) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<FaucetResponse | null>(null)
  const [useManualAddress, setUseManualAddress] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [showSwitchDialog, setShowSwitchDialog] = useState(false)
  const [pendingNetwork, setPendingNetwork] = useState<'mainnet' | 'testnet'>('testnet')

  // Wallet connection hooks
  const { address: connectedAddress, isConnected, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect()

  // Auto-fill address when wallet connects
  useEffect(() => {
    if (isConnected && connectedAddress && !useManualAddress) {
      setAddress(connectedAddress)
    }
  }, [isConnected, connectedAddress, useManualAddress])

  // Sync selectedNetwork with wallet chain
  useEffect(() => {
    if (isConnected && chain) {
      const currentChainNetwork = chain.id === 1961 ? 'mainnet' : chain.id === 1953 ? 'testnet' : null
      
      if (currentChainNetwork && currentChainNetwork !== selectedNetwork) {
        // Update selected network to match chain
        setSelectedNetwork(currentChainNetwork)
      }
    }
  }, [chain, isConnected, selectedNetwork, setSelectedNetwork])

  const handleSwitchNetwork = () => {
    if (switchChain && pendingNetwork) {
      const targetChainId = pendingNetwork === 'mainnet' ? 1961 : 1953
      switchChain({ chainId: targetChainId })
      setShowSwitchDialog(false)
    }
  }

  const currentNetwork = faucetInfo?.networks.find(n => n.name === selectedNetwork)

  const copyFaucetAddress = async () => {
    if (currentNetwork?.faucetAddress) {
      try {
        await navigator.clipboard.writeText(currentNetwork.faucetAddress)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const result = await axios.post<FaucetResponse>('/api/faucet', { 
        address,
        network: selectedNetwork
      })
      setResponse(result.data)
      if (result.data.success) {
        setAddress('')
      }
    } catch (error: any) {
      setResponse({
        success: false,
        error: error.response?.data?.error || 'Failed to send tokens. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Toast notification for copied address */}
      {showCopied && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 text-sm font-medium z-50">
          Address copied
        </div>
      )}

      {/* Network switch dialog */}
      {showSwitchDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSwitchDialog(false)}>
          <div className="bg-white border-2 border-black max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b-2 border-black text-center">
              <h3 className="text-xl font-bold text-black">Switch Network</h3>
            </div>
            <div className="p-6">
              <p className="text-black/60 text-sm mb-4 text-center">Select a network to switch to:</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPendingNetwork('testnet')
                    handleSwitchNetwork()
                  }}
                  className={`w-full p-4 border-2 text-left font-medium transition-colors ${
                    selectedNetwork === 'testnet'
                      ? 'border-testnet bg-testnet text-white'
                      : 'border-black/20 bg-white text-black hover:border-testnet hover:bg-testnet/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">Selendra Testnet</div>
                      <div className={`text-sm ${selectedNetwork === 'testnet' ? 'text-white/80' : 'text-black/60'}`}>
                        Chain ID: 1953 • 10 tSEL / 24hrs
                      </div>
                    </div>
                    {selectedNetwork === 'testnet' && (
                      <div className="text-sm font-medium">Connected</div>
                    )}
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setPendingNetwork('mainnet')
                    handleSwitchNetwork()
                  }}
                  className={`w-full p-4 border-2 text-left font-medium transition-colors ${
                    selectedNetwork === 'mainnet'
                      ? 'border-mainnet bg-mainnet text-white'
                      : 'border-black/20 bg-white text-black hover:border-mainnet hover:bg-mainnet/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">Selendra Mainnet</div>
                      <div className={`text-sm ${selectedNetwork === 'mainnet' ? 'text-white/80' : 'text-black/60'}`}>
                        Chain ID: 1961 • 0.01 SEL / 1hr
                      </div>
                    </div>
                    {selectedNetwork === 'mainnet' && (
                      <div className="text-sm font-medium">Connected</div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 tracking-tight leading-tight">Get Selendra Tokens</h2>
        <p className="text-base sm:text-lg text-black/60">
          Request tokens for development and testing on the Selendra EVM blockchain
        </p>
      </div>

      {/* Wallet Connection */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
          <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">Wallet Connection</h3>
          {isConnected && (
            <button
              onClick={() => setUseManualAddress(!useManualAddress)}
              className="text-xs font-medium text-yellow-600 hover:text-yellow-700 bg-yellow-50 px-3 py-1.5 transition-colors self-start sm:self-auto"
            >
              {useManualAddress ? 'Use Connected Wallet' : 'Enter Address Manually'}
            </button>
          )}
        </div>
        <div className="flex gap-3 sm:gap-4 items-center">
          <div className="flex-1 min-w-0">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted
                const connected = ready && account && chain

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full px-6 py-3 bg-mainnet border-2 border-mainnet text-white text-sm font-medium hover:bg-mainnet-dark transition-all"
                          >
                            Connect Wallet
                          </button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            type="button"
                            className="w-full px-6 py-3 bg-warning border-2 border-warning text-white text-sm font-medium hover:bg-warning-dark transition-all"
                          >
                            Wrong network
                          </button>
                        )
                      }

                      return (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => {
                              setPendingNetwork(selectedNetwork === 'mainnet' ? 'testnet' : 'mainnet')
                              setShowSwitchDialog(true)
                            }}
                            type="button"
                            className="px-4 py-3 bg-white border-2 border-black/20 text-xs sm:text-sm font-medium hover:border-black transition-all whitespace-nowrap"
                          >
                            {chain.name}
                          </button>

                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="flex-1 px-4 py-3 bg-white border-2 border-black/20 text-xs sm:text-sm font-medium hover:border-mainnet transition-all font-mono truncate"
                          >
                            {account.displayName}
                          </button>

                          <button
                            onClick={() => disconnect()}
                            type="button"
                            className="px-4 py-3 bg-white border-2 border-black/20 text-xs sm:text-sm font-medium hover:border-warning hover:text-warning transition-all"
                            title="Disconnect wallet"
                          >
                            Disconnect
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>

      {/* Network Info */}
      {currentNetwork && (
        <div className="border border-black/20 p-4 sm:p-6 mb-8 bg-black/[0.02]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Network</div>
              <div className="text-sm font-medium text-black">{currentNetwork.displayName}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Balance</div>
              <div className="text-sm font-medium text-black">
                {currentNetwork.balance} {selectedNetwork === 'testnet' ? 'tSEL' : 'SEL'}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Amount</div>
              <div className={`text-sm font-medium ${
                selectedNetwork === 'testnet' ? 'text-testnet' : 'text-mainnet'
              }`}>
                {currentNetwork.faucetAmount} {selectedNetwork === 'testnet' ? 'tSEL' : 'SEL'}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-black/10">
            <div className="text-xs uppercase tracking-wider text-black/50 mb-2">Faucet Address (Click to copy)</div>
            <button
              onClick={copyFaucetAddress}
              className="w-full text-left font-mono text-xs sm:text-sm text-black/70 hover:text-mainnet transition-colors bg-white border border-black/10 px-3 py-2 hover:border-mainnet group flex items-center justify-between"
              title="Click to copy full address"
            >
              <span className="truncate break-all">{currentNetwork.faucetAddress}</span>
              <span className="ml-2 text-base opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">📋</span>
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-black mb-2 uppercase tracking-wider">
            Wallet Address {isConnected && !useManualAddress && <span className="text-mainnet">(from wallet)</span>}
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            disabled={loading || (isConnected && !useManualAddress)}
            required
            className="w-full bg-white border-2 border-black/20 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-black/30 disabled:opacity-50 disabled:cursor-not-allowed font-mono break-all"
          />
        </div>

        <button 
          type="submit" 
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedNetwork === 'testnet'
              ? 'bg-testnet text-white border-testnet hover:bg-testnet-dark'
              : 'bg-mainnet text-white border-mainnet hover:bg-mainnet-dark'
          }`}
          disabled={loading || !address}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            'Request Tokens'
          )}
        </button>
      </form>

      {/* Response */}
      {response && (
        <div className={`border-2 p-4 sm:p-6 mb-8 ${
          response.success 
            ? selectedNetwork === 'testnet' 
              ? 'border-testnet bg-testnet/5' 
              : 'border-mainnet bg-mainnet/5'
            : 'border-warning bg-warning/5'
        }`}>
          <h3 className="text-base sm:text-lg font-bold text-black mb-2">
            {response.success ? 'Success' : (response.error?.includes('already received') ? 'Rate Limited' : 'Error')}
          </h3>
          <p className="text-xs sm:text-sm text-black/70 mb-3">
            {response.success ? response.message : response.error}
          </p>
          {response.success && response.txHash && (
            <div className="mt-4 pt-4 border-t border-black/10">
              <p className="font-mono text-xs text-black/60 mb-3 break-all">
                {response.txHash}
              </p>
              {response.explorer && (
                <a 
                  href={response.explorer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-block text-xs sm:text-sm font-medium underline hover:no-underline ${
                    selectedNetwork === 'testnet' ? 'text-testnet hover:text-testnet-dark' : 'text-mainnet hover:text-mainnet-dark'
                  }`}
                >
                  View Transaction →
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-black/10">
        <h3 className="text-xs sm:text-sm font-bold text-black mb-3 sm:mb-4 uppercase tracking-wider">How it Works</h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-black/60 leading-relaxed">
          <p>1. Connect your wallet (MetaMask, Brave, SubWallet, Coinbase, Phantom, or WalletConnect)</p>
          <p>2. Your address will be automatically filled from your connected wallet</p>
          <p>3. Select the network (Mainnet or Testnet) and request tokens</p>
          <p>4. Wait for the transaction to be confirmed</p>
          <p className="pt-2 text-xs">Note: You can also enter an address manually if you prefer</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Faucet
