import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { addblog, getblogs } from '../helpers/blogs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { format } from 'date-fns';
import Timestamp from 'react-timestamp';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { userId, getToken } = useAuth();
  const [loadingblogs, setLoadingblogs] = useState(false);
  const [blogs, setblogs] = useState([]);
  console.log(blogs);

  useEffect(() => {
    const loadblogs = async () => {
      const token = await getToken({ template: 'supabase' });
      const blogs = await getblogs({ userId, token });
      setblogs(blogs);
    };
    loadblogs();
  }, []);
  const handleSubmit = async (event: any) => {
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
      <main className=''>
        <div className='container flex flex-col my-10 gap-10 '>
          <form
            onSubmit={handleSubmit}
            className='flex w-full gap-6 items-center'
          >
            <UserButton />
            <Input placeholder='type in a blog...' />
            <Button type='submit' className='max-w-full w-28'>
              Add blog
            </Button>
          </form>
          <div className='flex flex-col gap-2.5'>
            {blogs?.map((blog) => (
              <div
                className='flex flex-col border border-slate-200 rounded-lg py-4 px-8 gap-1'
                key={blog.id}
              >
                <div>{blog.content}</div>
                <Timestamp
                  className='text-slate-400 text-sm'
                  relative
                  date={blog.created_at}
                  autoUpdate
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
