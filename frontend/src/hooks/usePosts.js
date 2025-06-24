import { useState, useEffect } from 'react';
import API from '@services/api';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);
  return posts;
}
