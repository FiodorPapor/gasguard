import { http, createConfig } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

// Custom chain configuration for Polygon Amoy testnet
export const polygonAmoyTestnet = {
  ...polygonAmoy,
  id: 80002,
  name: 'Polygon Amoy Testnet',
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
  },
}

// Wagmi configuration
export const wagmiConfig = createConfig({
  chains: [polygonAmoyTestnet],
  connectors: [
    metaMask(),
  ],
  transports: {
    [polygonAmoyTestnet.id]: http('https://rpc-amoy.polygon.technology/'),
  },
})

// React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
