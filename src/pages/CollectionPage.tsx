import React from 'react';
import { Grid, ExternalLink } from 'lucide-react';

interface NFTCard {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

const mockNFTs: NFTCard[] = [
  {
    id: '1',
    name: 'Cosmic Wolf',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop',
    description: 'A mystical wolf howling at the purple moon',
    price: '0.5 ETH'
  },
  {
    id: '2',
    name: 'Digital Dreams',
    image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&h=400&fit=crop',
    description: 'Abstract digital landscape',
    price: '0.8 ETH'
  },
  {
    id: '3',
    name: 'Neon Warrior',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    description: 'Cyberpunk warrior in neon city',
    price: '1.2 ETH'
  }
];

export function CollectionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My NFT Collection</h1>
          <p className="text-gray-400">Discover and manage your generated NFTs</p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Grid className="w-5 h-5" />
          <span>{mockNFTs.length} items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div key={nft.id} className="gradient-border rounded-lg">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="relative group">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                              transition-opacity flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-nft-purple text-white px-4 py-2 
                                   rounded-lg hover:bg-nft-purple-dark transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-white">{nft.name}</h3>
                <p className="text-gray-400 mt-1">{nft.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-nft-purple font-medium">{nft.price}</span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    List for Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}