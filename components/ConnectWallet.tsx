'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [isConnecting, setIsConnecting] = useState(false)

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

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700">
          {shortenAddress(address)}
        </div>
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
