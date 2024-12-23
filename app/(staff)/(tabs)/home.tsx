import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFeed, Post } from '@/api/community';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/constants/Colors';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.authUser?.token);

  useEffect(() => {

    let isMounted = true; 
    // console.log('fetch feed/token;', token);

    const fetchFeed = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const feed = await getFeed(token);
        if (isMounted) setPosts(feed);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to fetch feed.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (token) fetchFeed();

    return () => {
      isMounted = false;
    };
  }, []);

  
  return (
    <View>
      {loading && <ActivityIndicator size="large" color={colors.primaryLight} /> }
      {posts && posts.map(post => (
        <Text key={post.postId}>{post.content}</Text>
      ))}
    </View>
  )
}

export default Home