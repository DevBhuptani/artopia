/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { artopiaAbi } from './abi/artopia';

export async function mintNFT(recipient: string, uri: string): Promise<any> {
  try {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      '0x63de8d5546656a0E3dfDD5506b65eD9e9a99B25E',
      artopiaAbi,
      signer
    );

    const dev: any = await contract.mintNFT(recipient, uri);

    console.log('dev', dev);

  } catch (error) {
    console.error('Error in mintNFT:', error);
    throw error;
  }
}
