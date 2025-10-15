import { Header } from '@/components/Header'
import { HotWalletCard } from '@/components/HotWalletCard'
import { ReserveCard } from '@/components/ReserveCard'
import { MimicTaskCard } from '@/components/MimicTaskCard'

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
          <HotWalletCard />
          <ReserveCard />
          <MimicTaskCard />
        </div>
      </main>
    </div>
  )
}
