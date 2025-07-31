'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import { Button } from './ui/button';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.action';

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1.form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2.submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setisLoading(true);
    try {
      console.log('data is ==> ', data);
      // Sign up with Appwrite & create plaid token

      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          address1: data.address1 ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          postalCode: data.postalCode ?? '',
          dateOfBirth: data.dateOfBirth ?? '',
          ssn: data.ssn ?? '',
          email: data.email ?? '',
          password: data.password ?? '',
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      } else if (type === 'sign-in') {
        const respone = await signIn({
          email: data.email,
          password: data.password,
        });

        if (respone) {
          router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8 mb-4">
        <Link
          href={'/'}
          className="cursor-pointer flex items-center gap-1 px-4"
        >
          <Image
            src={'/icons/logo.svg'}
            width={34}
            height={34}
            alt="Horizon Logo"
          />
          <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl lg:text-4xl font-semibold text-gray-900">
            {user ? 'LinkAccount' : type == 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-base font-normal text-gray-600">
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type == 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    {/* First Name */}
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="ex:John"
                      type="text"
                    />
                    {/* Last Name */}
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="ex:Doe"
                      type="text"
                    />
                  </div>
                  {/* Address */}
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Ener your specific address"
                    type="text"
                  />

                  {/* City */}
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Ener your specific city"
                    type="text"
                  />

                  <div className="flex gap-4">
                    {/* State */}
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex:NY"
                      type="text"
                    />
                    {/* Postal Code */}
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex:10001"
                      type="text"
                    />
                  </div>

                  <div className="flex gap-4">
                    {/* Date of birth */}
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      type="text"
                    />
                    {/* SSN */}
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="ex:123-45-6789"
                      type="text"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Ener your Email"
                type="email"
              />

              {/* Password */}
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Ener your Password"
                type="password"
              />
              {form.formState.errors && (
                <div className="text-red-500">
                  {Object.values(form.formState.errors).map((error) => (
                    <p key={error.message}>{error.message}</p>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="text-base rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form cursor-pointer hover:bg-amber-500"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Loading</span>
                    </>
                  ) : type == 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1 mt-5">
            <p className="text-base font-normal text-gray-600">
              {type == 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              href={type == 'sign-in' ? '/sign-up' : '/sign-in'}
              className="flex items-center text-sm cursor-pointer font-medium text-bankGradient"
            >
              {type == 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
