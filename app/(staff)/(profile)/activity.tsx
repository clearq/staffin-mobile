import { View, Text } from 'react-native'
import React from 'react'
import { Post } from '@/api/community'

type props = {
  posts?:Post[]
}

const StaffActivity = ({posts}:props) => {
  return (
    <View>
      <Text>StaffActivity</Text>
      {posts && posts.map(post => (
        <View key={post.postId}>
          <Text>{post.content}</Text>
        </View>
      ))}

    </View>
  )
}

export default StaffActivity