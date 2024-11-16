/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, User } from 'lucide-react';
import { BalanceDisplay } from './BalanceDisplay';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const [balance, setBalance] = useState<string>('Fetching...');
  // const location = useLocation();

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

  useEffect(() => {
    const address = walletAddress;
    fetchBalance(address);
  }, [walletAddress]);

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-nft-purple-light to-indigo-500 
                                  inline-block text-transparent bg-clip-text"
            >
              Artopia
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {/* <Link
                to="/"
                className={`text-gray-300 hover:text-white transition-colors ${
                  location.pathname === '/' ? 'text-white' : ''
                }`}
              >
                Generate
              </Link> */}
              {/* <Link
                to="/collection"
                className={`text-gray-300 hover:text-white transition-colors ${
                  location.pathname === '/collection' ? 'text-white' : ''
                }`}
              >
                My Collection
              </Link> */}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!walletAddress ? (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 bg-gradient-to-r from-nft-purple to-indigo-600 
                         text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            ) : (
              <>
                <BalanceDisplay balance={balance} />
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg 
                             hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {walletAddress && (
                      <span className="hidden sm:inline">{`${walletAddress.slice(
                        0,
                        6
                      )}...${walletAddress.slice(-4)}`}</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
