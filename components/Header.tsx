'use client'

import { ConnectWallet } from './ConnectWallet'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white">
              ⛽ GasGuard
            </h1>
          </div>
          <div className="flex items-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </header>
  )
}
