"use client";
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn :User = {$id:'1',userId:'JSM1',address1:'',city:'',dateOfBirth:'',dwollaCustomerId:'',dwollaCustomerUrl:'',email:'',firstName:'mg',lastName:'mg',postalCode:'',ssn:'',state:''};

  return (
   <main className="flex h-screen w-full font-inter">
    <SideBar user={loggedIn} />
    <div className="flex size-full flex-col">
      <div className="flex h-16 items-center justify-between p-5 shadow-credit-card sm:p-8 md:hidden">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <div>
          <MobileNav user={loggedIn} />
        </div>
      </div>
      {children}
    </div>
   </main>
  );
}
