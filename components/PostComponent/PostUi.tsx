import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html';
import React, { } from 'react'
import { Sizes, theme } from '@/constants/Theme'
import { Divider, useTheme } from '@rneui/themed'
import { IPost, IUser } from '@/types'
import { ProfileAvatar } from '../UI/ProfileAvatar'
import pageStyle from '@/constants/Styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import PostImage from './PostCard/PostImage'

interface Props {
  post: IPost;
  isCurrentUser?: boolean;
}

dayjs.extend(relativeTime)


const PostHeader: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <>
       {/* Header */}
      <View
        style={{
          ...styles.headerContainer,
          ...styles.containerPadding,
        }}
      >
        
        <View style={{flex: 0,}}>
          <ProfileAvatar 
            userId={props.post.userId}
            image={props.post.profileImage}
            size={40}
          />
        </View>

        <View
          style={{
            ...styles.headerTextGroup,
            flex: 1,
          }}
        >
          <Text 
            style={{
              ...pageStyle.headline03,
              color: theme.colors.grey0,
            }}
          >
            {props.post.authorName}
          </Text>

          <Text
            style={{
              ...pageStyle.xsText,
              color: theme.colors.disabled
            }}
          >
            {dayjs(props.post.createdAt).fromNow()}
          </Text>

        </View>

        <View style={{flex: 0}}>
          {props.isCurrentUser && (
            <MaterialCommunityIcons name='dots-horizontal' color={theme.colors.grey0} size={24} />
          )}

          {!props.isCurrentUser && (
            <TouchableOpacity>
              <Text>{`${t("follow")}`}</Text>
            </TouchableOpacity>
          )}
        </View>
        


      </View>
    </>
  )
}  

const PostBody: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <>
      {/* Body */}
      <View
        style={{
          ...styles.bodyContainer,
          ...styles.containerPadding,
        }}
      >
        <PostTextContent post={props.post}/>

        {props.post.images.length > 0 && (
          <PostImageContent post={props.post} />
        )}

        <PostReaction post={props.post} />
        
      </View>
    </>
  )
}  


const PostFooter: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <>
      {/* Footer */}
      <View
        style={{
          ...styles.footerContainer,
          ...styles.containerPadding,
        }}
      >
        <View 
          style={{
            ...styles.row,
            justifyContent: 'space-between',
          }}
        >
          <View style={{...styles.col,}}>
            <MaterialCommunityIcons name='cards-heart-outline' size={24} color={theme.colors.divider} />
            <Text style={{...pageStyle.xsText, color: theme.colors.divider}}>
              {`${t("like")}`}
            </Text>
          </View>
          <View style={{...styles.col,}}>
            <MaterialCommunityIcons name='comment-outline' size={24} color={theme.colors.divider} />
            <Text style={{...pageStyle.xsText, color: theme.colors.divider}}>
              {`${t("comment")}`}
            </Text>
          </View>
          <View style={{...styles.col,}}>
            <MaterialCommunityIcons name='repeat' size={24} color={theme.colors.divider} />
            <Text style={{...pageStyle.xsText, color: theme.colors.divider}}>
              {`${t("repost")}`}
            </Text>
          </View>
          <View style={{...styles.col,}}>
            <MaterialCommunityIcons name='share' size={24} color={theme.colors.divider} />
            <Text style={{...pageStyle.xsText, color: theme.colors.divider}}>
              {`${t("share")}`}
            </Text>
          </View>

        </View>
      </View>
    </>
  )
}  


const PostTextContent: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  return (
    <>
      {/* Text Content */}
      <View
        style={{
          ...styles.textContentContainer,
        }}
      >
        {/* <Text
          style={{
            ...pageStyle.paraText,
            color: theme.colors.grey0,
          }}
        >
          {props.post.content}
        </Text> */}
        <RenderHtml
          contentWidth={width}
          source={{html: props.post.content}}
          ignoredDomTags={['o:p', 'u5:p']}
        />

      </View>
    </>
  )
}  


const PostImageContent: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <>
      {/* Text Content */}
      <View
        style={{
          ...styles.imageContentContainer,
        }}
      >
        {props.post.images.length > 0 && 
          <View 
            style={{}} 
          >
            <PostImage userId={props.post.userId} images={props.post.images} />
          </View>
        }
      </View>
    </>
  )
}  


const PostReaction: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <>
      {/* Text Content */}
      <View
        style={{
          ...styles.reactionContainer,
          ...styles.row,
          justifyContent: 'space-between',
          marginTop: theme.spacing.sm,
        }}
      >
        <View style={{...styles.row, gap: theme.spacing.xs}}>
          <Text
            style={{
              ...pageStyle.smText,
              color: theme.colors.grey0,
            }}
          >
            {props.post.likeCount}
          </Text>
          <MaterialCommunityIcons name='cards-heart' color={"rgb(255, 45, 85)"} size={14} />
        </View>
       
       
        <View style={{...styles.row, gap: theme.spacing.xs}}>
          <Text
            style={{
              ...pageStyle.smText,
              color: theme.colors.grey0,
            }}
          >
            {props.post.commentCount}
          </Text>
          <MaterialCommunityIcons name='comment-text-outline' color={theme.colors.grey3} size={14} />
        </View>
      </View>
    </>
  )
}  


export { 
  PostHeader,
  PostBody,
  PostFooter,
  PostTextContent,
  PostImageContent,
  PostReaction,
}


const styles = StyleSheet.create({
  containerPadding: {
    padding: Sizes.fixPadding
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  col:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  bodyContainer: {
    flexDirection: 'column'
  },
  footerContainer: {
    flex: 1,
  },
  textContentContainer: {

  },
  imageContentContainer: {

  },
  reactionContainer: {

  },
  headerTextGroup: {
    flexDirection: 'column',
    gap: theme.spacing?.xs,
    justifyContent: 'flex-start',
    marginLeft: theme.spacing?.md
  }

})