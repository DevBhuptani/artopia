/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, User } from 'lucide-react';
import { BalanceDisplay } from './BalanceDisplay';
import useCreateCharge from '../backend/coinbase/useCreateCharge';
import { LifecycleStatus } from '@coinbase/onchainkit/checkout';

export function Header({
  walletAddress,
  balance,
  connectWallet,
  fetchBalance,
}: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    const address = walletAddress;
    fetchBalance(address);
  }, [walletAddress]);

  const key = 0.1;

  const handleStatusChange = useCallback((status: LifecycleStatus) => {
    console.log('onStatus', status);
  }, []);

  const { createCharge } = useCreateCharge();

  const chargeHandler = useCallback(() => {
    const chargeDetails = {
      name: 'Artopia',
      description: 'Artopia',
      pricing_type: 'fixed_price',
      local_price: {
        amount: key.toString(),
        currency: 'USD',
      },
    };
    return createCharge(chargeDetails);
  }, [createCharge]);

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
                    {/* <WalletComponents />
            <IdentityComponents />
            <Checkout
              key={key}
              onStatus={handleStatusChange}
              chargeHandler={chargeHandler}
            >
              <CheckoutButton
                coinbaseBranded={true}
                text="Pay with Crypto"
              />
            </Checkout> */}
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
