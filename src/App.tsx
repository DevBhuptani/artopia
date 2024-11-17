/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { useCallback, useState } from 'react';
import '@coinbase/onchainkit/styles.css'; 

export default function App() {
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const [balance, setBalance] = useState<string>('Fetching...');

  const connectWallet = async () => {
    // @ts-ignore
    if (window?.ethereum) {
      try {
        // Request wallet connection
        // @ts-ignore
        const accounts = await window?.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Store the first account
        setWalletAddress(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const fetchBalance = useCallback(async (address: string) => {
    if (!address) {
      console.error('No wallet address connected');
      setBalance('No address connected');
      return;
    }

    const apiUrl = `https://optimism-sepolia.blockscout.com/api/v2/addresses/${address}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      const rawBalance = data?.coin_balance || 0;
      const balanceInEther = rawBalance / 1e18;
      const formattedBalance = balanceInEther.toFixed(2);

      setBalance(`${formattedBalance} ETH`);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('Error fetching balance');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-nft-dark">
        <Header
          walletAddress={walletAddress}
          balance={balance}
          connectWallet={connectWallet}
          fetchBalance={fetchBalance}
        />
        <Routes>
          <Route path="/" element={<HomePage walletAddress={walletAddress}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
