'use client'

export function ReserveCard() {
  // Placeholder values
  const balance = '0.50'
  const refillAmount = '0.05'
  const availableRefills = Math.floor(parseFloat(balance) / parseFloat(refillAmount))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600/50 transition-all space-y-4">
      <h2 className="text-xl font-bold text-gray-100">
        ⛽ GasGuard Reserve
      </h2>

      <div className="py-4">
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {balance} MATIC
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-green-400 text-sm font-medium">
          🟢 Ready to refill
        </span>
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Refill Amount:</span>
          <span className="text-sm text-gray-100 font-medium">{refillAmount} MATIC</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Available Refills:</span>
          <span className="text-sm text-gray-100 font-medium">{availableRefills}</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          disabled
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Deposit More MATIC
        </button>
      </div>
    </div>
  )
}
