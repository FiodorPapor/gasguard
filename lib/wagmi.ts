import { http, createConfig } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

// Wagmi configuration with both Polygon Mainnet and Amoy Testnet
export const wagmiConfig = createConfig({
  chains: [polygon, polygonAmoy],
  connectors: [
    metaMask(),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology/'),
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
