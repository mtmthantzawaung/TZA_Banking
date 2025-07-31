import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
      router.push('/');
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant == 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="text-base rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
        >
          Connect Bank
        </Button>
      ) : variant == 'ghost' ? (
        <Button className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start">
          Connect Bank
        </Button>
      ) : (
        <Button className="flex !justify-start cursor-pointer gap-3 rounded-lg !bg-transparent flex-row">
          Connect Bank
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
