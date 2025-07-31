import { logoutAccount } from '@/lib/actions/user.action';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = ({ user, type }: FooterProps) => {
  const route = useRouter();

  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) {
      route.replace('/sign-in');
    }
  };

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div
        className={
          type === 'desktop'
            ? 'flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden'
            : 'flex size-10 items-center justify-center rounded-full bg-gray-200'
        }
      >
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div
        className={
          type === 'desktop'
            ? 'flex flex-1 flex-col justify-center max-xl:hidden'
            : 'flex flex-1 flex-col justify-center'
        }
      >
        <h1 className="text-sm truncate font-semibold text-gray-500">
          {user.name}
        </h1>
        <p className="text-sm truncate font-normal text-gray-500">
          {user.email}
        </p>
      </div>
      <div
        className={
          type === 'desktop'
            ? 'relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center'
            : 'relative size-5'
        }
        onClick={handleLogout}
      >
        <Image src="/icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  );
};

export default Footer;
