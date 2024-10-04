import React from 'react';
import type { AppProps } from 'next/app';
import '../globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio de Gerard Alex</title>
        <meta
          name="description"
          content="Gerard Alex, analyste développeur étudiant."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <main className="container lg:max-w-[50%] mx-auto px-1">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
