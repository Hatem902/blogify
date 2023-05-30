import { db } from '../lib/db';

export const getblogs = async ({ userId, token }) => {
  const supabase = await db(token);
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    console.log(error.message, error.hint, error.details);
    return;
  }
  return blogs;
};

export const addblog = async ({ userId, token, event }) => {
  console.log(userId);
  const supabase = await db(token);
  const { data, error } = await supabase.from('blogs').insert({
    user_id: userId,
    content: event.target[1].value,
  });
  if (error) {
    console.log(error.message, error.hint, error.details);
    return;
  }
  return data;
};
