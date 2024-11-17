import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

export function IdentityComponents() {
  const { addresses } = useAccount();
  console.log('account', addresses);
  return (
    <div className="flex justify-end">
      <Identity
        address="0x3e7F7d46f3520a6e5C479D4BD25f846133640D2A"
        schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      >
        <Avatar />
        <Name>
          <Badge />
        </Name>
        <Address />
      </Identity>
    </div>
  );
}
