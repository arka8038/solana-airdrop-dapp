import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { Airdrop } from "./Airdrop";
import { Card } from "./components/ui/card";
import { Toaster } from "@/components/ui/toaster";

const endpoint = import.meta.env.VITE_SOLANA_ENDPOINT;

function App() {
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
              <header className="text-center mb-8">
                <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg animate-pulse">
                  SOL Splash
                </h1>
                <p className="text-lg text-gray-300 mt-2 tracking-wide">
                  Connect your wallet and receive SOL airdrop in seconds.
                </p>
              </header>

              <div className="flex gap-6 mb-8">
                <WalletMultiButton className="relative bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-3 rounded-full shadow-neon transition duration-300 transform hover:scale-110 hover:shadow-purple-500/60" />
                <WalletDisconnectButton className="relative bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full shadow-neon transition duration-300 transform hover:scale-110 hover:shadow-red-500/60" />
              </div>

              <Card className="bg-gray-800 bg-opacity-30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-gray-700 text-center">
                <Airdrop />
              </Card>

              <footer className="absolute bottom-6 text-gray-500 text-sm tracking-wider">
                Crafted by Arkaprovo Ghosh
              </footer>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <Toaster />
    </>
  );
}

export default App;
