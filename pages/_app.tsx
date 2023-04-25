import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <div className='flex w-full h-full justify-center items-center pt-28'>
          <SignIn />
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
