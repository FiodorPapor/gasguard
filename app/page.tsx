export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            ⛽ GasGuard
          </h1>
          <p className="text-xl text-purple-200">
            Never run out of gas on Polygon
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Empty container for future components */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-8 min-h-[400px]">
            <p className="text-gray-400 text-center">
              Dashboard components will be added here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
