/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Download, Sparkles, Wand2 } from 'lucide-react';
import { mintNFT } from '../backend/integration';

export function HomePage({ walletAddress }: any) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return; // Ensure there's a prompt
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://open-ai21.p.rapidapi.com/texttoimage2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key':
              '48fdb1ce26msh4844406089f6956p1e0cfcjsn300a44b6459f',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
          },
          body: JSON.stringify({ text: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image. Please try again.');
      }

      const data = await response.json();
      setGeneratedImage(data.generated_image);
    } catch (error: any) {
      console.error('Error generating image:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-nft-purple" />
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-nft-purple-light to-indigo-500 
                       inline-block text-transparent bg-clip-text"
          >
            Artopia
          </h1>
        </div>
        <p className="text-gray-400 max-w-xl">
          Transform your imagination into unique NFT artwork. Simply describe
          what you want to create, and our AI will bring your vision to life.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl">
          <div className="gradient-border rounded-lg">
            <div className="bg-gray-800 p-2 rounded-lg">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your NFT... (e.g., 'A cosmic wolf howling at a purple moon')"
                className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg resize-none h-32 
                     focus:outline-none focus:ring-2 focus:ring-nft-purple input-glow"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="flex items-center gap-2 bg-gradient-to-r from-nft-purple to-indigo-600 
                       text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity
                       disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-5 h-5" />
                  {isLoading ? 'Generating...' : 'Generate NFT'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl mt-8">
          <div className="gradient-border rounded-lg">
            <div className="bg-gray-800 p-6 rounded-lg">
              {isLoading ? (
                <div
                  className="aspect-square w-full bg-gray-900 rounded-lg animate-pulse-slow 
                          flex items-center justify-center"
                >
                  <div className="text-nft-purple text-lg">
                    Generating your NFT...
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="space-y-4">
                  <img
                    src={generatedImage}
                    alt="Generated NFT"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 
                                 text-white px-4 py-2 rounded-lg transition-colors"
                      onClick={() => mintNFT(walletAddress, generatedImage)}
                    >
                      <Download className="w-4 h-4" />
                      Mint NFT
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="aspect-square w-full bg-gray-900 rounded-lg flex items-center 
                          justify-center text-gray-400"
                >
                  Your NFT will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
