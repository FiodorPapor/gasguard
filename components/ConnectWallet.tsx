'use client'

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { polygon, polygonAmoy } from 'wagmi/chains'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [isConnecting, setIsConnecting] = useState(false)
  const [showNetworkMenu, setShowNetworkMenu] = useState(false)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      const connector = connectors[0] // MetaMask connector
      if (connector) {
        connect({ connector }, {
          onSuccess: () => {
            toast.success('Wallet connected successfully!')
          },
          onError: (error) => {
            toast.error(`Connection failed: ${error.message}`)
          },
        })
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success('Wallet disconnected')
  }

  const handleSwitchNetwork = (targetChainId: number) => {
    switchChain({ chainId: targetChainId }, {
      onSuccess: () => {
        toast.success(`Switched to ${targetChainId === polygon.id ? 'Polygon Mainnet' : 'Amoy Testnet'}`)
        setShowNetworkMenu(false)
      },
      onError: (error) => {
        toast.error(`Failed to switch network: ${error.message}`)
      },
    })
  }

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getNetworkBadge = () => {
    if (chainId === polygon.id) {
      return (
        <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium">
          Polygon
        </span>
      )
    }
    if (chainId === polygonAmoy.id) {
      return (
        <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">
          Amoy Testnet
        </span>
      )
    }
    return (
      <span className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium">
        Unknown Network
      </span>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        {/* Network Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowNetworkMenu(!showNetworkMenu)}
            className="hover:opacity-80 transition-opacity"
          >
            {getNetworkBadge()}
          </button>
          
          {showNetworkMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={() => handleSwitchNetwork(polygon.id)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                  chainId === polygon.id ? 'bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-white">Polygon Mainnet</span>
                </span>
              </button>
              <button
                onClick={() => handleSwitchNetwork(polygonAmoy.id)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors rounded-b-lg ${
                  chainId === polygonAmoy.id ? 'bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-white">Amoy Testnet</span>
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Address Display */}
        <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700">
          {shortenAddress(address)}
        </div>

        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isPending || isConnecting}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {isPending || isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
