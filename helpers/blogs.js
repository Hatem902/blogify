import { db } from '../lib/db';

export const getblogs = async ({ userId, token }) => {
  const supabase = await db(token);
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', userId);
  return blogs;
};

export const addblog = async ({ userId, token, event }) => {
  const supabase = await db(token);
  const { data, error } = await supabase.from('blogs').insert({
    user_id: userId,
    title: event.target[0].value,
    note: event.target[1].value,
  });
  if (error) {
    console.log('error');
    return;
  }
  return data;
};
