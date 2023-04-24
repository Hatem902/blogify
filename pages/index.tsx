import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { addblog, getblogs } from '../helpers/blogs';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { userId, getToken } = useAuth();
  const [loadingblogs, setLoadingblogs] = useState(false);
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    const loadblogs = async () => {
      const token = await getToken({ template: 'supabase' });
      const blogs = await getblogs({ userId, token });
      setblogs(blogs);
    };
    loadblogs();
  }, []);
  const handeSubmit = async (event: any) => {
    event.preventDefault();
    const token = await getToken({ template: 'supabase' });
    const createblog = await addblog({ event, userId, token });
    const blogs = await getblogs({ userId, token });
    setblogs(blogs);
  };
  return (
    <>
      <Head>
        <title>Blogify</title>
        <meta name='description' content='Create blogs with Blogify' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''>test</main>
    </>
  );
}
