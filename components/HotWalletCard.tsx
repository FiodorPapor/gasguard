'use client'

import { useState } from 'react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { formatUnits } from 'viem'
import { polygon, polygonAmoy } from 'wagmi/chains'

export function HotWalletCard() {
  const [address, setAddress] = useState('')
  const { address: connectedAddress, isConnected } = useAccount()
  const chainId = useChainId()
  
  // Prioritize input address if filled, otherwise use connected address
  const targetAddress = (address && address.startsWith('0x') && address.length === 42) 
    ? address as `0x${string}`
    : connectedAddress

  // Fetch real MATIC balance from current connected chain
  const { data: balanceData, isLoading } = useBalance({
    address: targetAddress,
    chainId: chainId,
  })

  // Get network name
  const getNetworkName = () => {
    if (chainId === polygon.id) return 'Polygon'
    if (chainId === polygonAmoy.id) return 'Amoy Testnet'
    return 'Unknown Network'
  }

  const threshold = '0.01'
  const balance = balanceData ? formatUnits(balanceData.value, 18) : '0'
  const balanceNumber = parseFloat(balance)
  const thresholdNumber = parseFloat(threshold)
  const isBalanceOk = balanceNumber > thresholdNumber * 2

  // Determine status color
  const getStatusBadge = () => {
    if (!targetAddress) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-400/10 text-gray-400 text-sm font-medium">
          ℹ️ Not Monitored
        </span>
      )
    }
    if (isBalanceOk) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm font-medium">
          ✅ Balance OK
        </span>
      )
    }
    if (balanceNumber > thresholdNumber) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium">
          ⚠️ Low Gas
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-400/10 text-red-400 text-sm font-medium">
        🚨 Critical
      </span>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600/50 transition-all space-y-4">
      <h2 className="text-xl font-bold text-gray-100">
        🔥 Hot Wallet Status
      </h2>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">
          Address {isConnected && !address && <span className="text-purple-400">(using connected wallet)</span>}
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={connectedAddress || "0x..."}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
        />
      </div>

      <div className="py-4">
        {!targetAddress ? (
          <div className="text-lg text-gray-400">
            Connect wallet or enter address to see balance
          </div>
        ) : isLoading ? (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <span className="text-lg text-gray-400">Loading balance...</span>
          </div>
        ) : (
          <div>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {parseFloat(balance).toFixed(4)} MATIC
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Balance on {getNetworkName()}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {getStatusBadge()}
      </div>

      <div className="pt-2 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          Threshold: {threshold} MATIC
        </p>
      </div>
    </div>
  )
}
