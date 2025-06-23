import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostTemplate from '../UI/PostTemplate'
import { IPost } from '@/types'

interface props {
  post: IPost
}

const PostCpmponent = ({post}: props) => {
  return (
    <PostTemplate 
      post={post}
    />
  )
}

export default PostCpmponent

const styles = StyleSheet.create({})