import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import { IPost } from '@/types'
import { PostBody, PostFooter, PostHeader } from '@/components/PostComponent/PostUi'
import { Card, Divider } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext'



interface Props {
  post: IPost;
  isCurrentUser: boolean
}

const index: React.FC<Props> = (props) => {


  return (
    <Card>

      <PostHeader post={props.post} isCurrentUser={props.isCurrentUser}/>

      <Divider />

      <PostBody post={props.post}/>

      <Divider />

      <PostFooter post={props.post} />
    </Card>
  )
}

export default index

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: theme.mode === 'light' ? theme.lightColors?.white : theme.darkColors?.black
  },
})