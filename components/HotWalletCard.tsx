'use client'

import { useState } from 'react'

export function HotWalletCard() {
  const [address, setAddress] = useState('')
  
  // Placeholder values
  const balance = '0.032'
  const threshold = '0.01'
  const isBalanceOk = parseFloat(balance) > parseFloat(threshold) * 2

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600/50 transition-all space-y-4">
      <h2 className="text-xl font-bold text-gray-100">
        🔥 Hot Wallet Status
      </h2>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">
          Address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
        />
      </div>

      <div className="py-4">
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {balance} MATIC
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isBalanceOk ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm font-medium">
            ✅ Balance OK
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium">
            ⚠️ Low Gas
          </span>
        )}
      </div>

      <div className="pt-2 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          Threshold: {threshold} MATIC
        </p>
      </div>
    </div>
  )
}
