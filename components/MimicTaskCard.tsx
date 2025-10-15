'use client'

export function MimicTaskCard() {
  // Placeholder values
  const isActive = true
  const lastCheck = '2 minutes ago'
  const nextCheck = 'in 8 minutes'
  const totalRefills = 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600/50 transition-all space-y-4 col-span-1 md:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-100">
          🤖 Mimic Automation
        </h2>
        <div className="flex items-center gap-2">
          {isActive ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/10 text-red-400 text-sm font-medium">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              Inactive
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Left side - Status info */}
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Last Check</span>
            <span className="text-base text-gray-100 font-medium">{lastCheck}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Next Check</span>
            <span className="text-base text-gray-100 font-medium">{nextCheck}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total Refills</span>
            <span className="text-base text-gray-100 font-medium">{totalRefills}</span>
          </div>
        </div>

        {/* Right side - Links */}
        <div className="space-y-3 flex flex-col justify-center">
          <a
            href="https://protocol.mimic.fi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center gap-1"
          >
            View on Mimic Protocol →
          </a>
          <a
            href="https://amoy.polygonscan.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors font-medium flex items-center gap-1"
          >
            View Contract →
          </a>
        </div>
      </div>
    </div>
  )
}
