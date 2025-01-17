import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
  ChainId,
  Config,
  DAppProvider,
  MULTICALL_ADDRESSES,
} from '@usedapp/core'
// import { extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import React from 'react'
import { MulticallContract } from '../artifacts/contracts/contractAddress'
import { MoralisProvider } from 'react-moralis'
import { useApollo } from '../lib/apolloClient'
import { AuthProvider} from '../services/context/users'

// scaffold-eth's INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const API_KEY = process.env.ALCHEMY_API_KEY;
export const INFURA_ID = process.env.INFURA_ID;

const config: Config = {
  readOnlyUrls: {
    [ChainId.Mumbai]: `https://polygon-mumbai.g.alchemy.com/v2/${API_KEY}`,
    [ChainId.Kovan]: `https://kovan.infura.io/v3/${INFURA_ID}`,
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
  },
  supportedChains: [
    ChainId.Mumbai,
    ChainId.Kovan,
    ChainId.Localhost,
    ChainId.Hardhat,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    [ChainId.Hardhat]: MulticallContract,
    [ChainId.Localhost]: MulticallContract,
  },
}

const MORALIS_SERVER_URL="https://mhuq3oogbqkc.usemoralis.com:2053/server";
const MORALIS_API_KEY="PHlSfKMAm45Y8HaNDsOImY3GI7Hst5AORiClsht6";


// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps)
  return (
    <MoralisProvider serverUrl={MORALIS_SERVER_URL} appId={MORALIS_API_KEY}>
      <ApolloProvider client={apolloClient}>
        <DAppProvider config={config}>
          <ChakraProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </ChakraProvider>
        </DAppProvider>
      </ApolloProvider>
      </MoralisProvider>
  )
}

export default MyApp
