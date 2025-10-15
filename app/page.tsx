import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-400">
            Never run out of gas on Polygon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Hot Wallet Status Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all hover:border-purple-600/50">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Hot Wallet Status
            </h2>
            <div className="space-y-3">
              <p className="text-gray-400">
                Monitor your hot wallet balance and activity
              </p>
            </div>
          </div>

          {/* GasGuard Reserve Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all hover:border-purple-600/50">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              GasGuard Reserve
            </h2>
            <div className="space-y-3">
              <p className="text-gray-400">
                Your automated gas refill configuration
              </p>
            </div>
          </div>

          {/* Mimic Task Status Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all hover:border-purple-600/50 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Mimic Task Status
            </h2>
            <div className="space-y-3">
              <p className="text-gray-400">
                Track your automated gas refill tasks
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
