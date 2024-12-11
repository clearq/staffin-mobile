import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFeed, Post } from '@/api/community';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.authUser?.token);

  useEffect(() => {

    console.log('fetch feed/token;', token);
    
    const fetchFeed = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const feed = await getFeed(token);
        setPosts(feed);
      } catch (err: any) {
        setError(err.message || "Failed to fetch feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [token]);

  
  return (
    <View>
      {posts && posts.map(post => (
        <Text key={post.postId}>{post.content}</Text>
      ))}
    </View>
  )
}

export default Home