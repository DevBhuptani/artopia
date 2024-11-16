import { Wallet } from 'lucide-react';

interface BalanceDisplayProps {
  balance: string;
}

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  return (
    <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2">
        <Wallet className="w-4 h-4 text-nft-purple" />
        <span className="text-white font-medium">{balance}</span>
      </div>
    </div>
  );
}