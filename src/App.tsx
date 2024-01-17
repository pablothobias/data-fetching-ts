import { useEffect, useState } from 'react';
import { get } from './util/http.ts';
import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import fetchingImg from './assets/data-fetching.png';

type RawBlogPostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Array<BlogPost>>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await get('https://jsonplaceholder.typicode.com/posts') as Array<RawBlogPostData>;

        if (data?.length) {

          const formattedData: Array<BlogPost> = data.map((post) => ({
            id: post.id,
            title: post.title,
            text: post.body,
          }));

          setPosts(formattedData);
        }
      };

      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, []);

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image depicting a data fetching process " />
      {!!posts?.length && <BlogPosts posts={posts} />}
      {!!error && <p>{error}</p>}
    </main>
  );
}

export default App;
