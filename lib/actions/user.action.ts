'use server';
import { createAdminClient, createSessionClient } from '../appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation / Database / Make fetch
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('appwrite-session', response.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(response);
  } catch (error) {
    console.log('Error', error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    // Create User Account
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    console.log('Account created successfully:', newUserAccount.$id);

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log('Error', error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.log('error =>', error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete('appwrite-session');
    await account.deleteSession('current');
  } catch (error) {
    console.log('error =>', error);
    return null;
  }
};
