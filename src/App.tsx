import { useEffect, useState } from 'react';
import { get } from './util/http.ts';
import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage.tsx';

type RawBlogPostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Array<BlogPost>>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await get('https://jsonplaceholder.typicode.com/posts') as Array<RawBlogPostData>;

        if (data?.length) {

          const formattedData: Array<BlogPost> = data.map((post) => ({
            id: post.id,
            title: post.title,
            text: post.body,
          }));

          setPosts(formattedData);
          setIsLoading(false);
        }
      };

      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image depicting a data fetching process " />
      {error && <ErrorMessage text={error} />}
      {!!isLoading && <p id="loading-fallback">Loading...</p>}
      {!!posts?.length && <BlogPosts posts={posts} />}
    </main>
  );
}

export default App;
