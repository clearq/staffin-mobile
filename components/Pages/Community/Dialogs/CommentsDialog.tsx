import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Modal, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheetCustom from '@/components/UI/BottomSheetCustom'
import { likePost, sharePost, unlikePost } from '@/api/backend';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IComment, IPost, IUser } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import { ProfileAvatar } from '@/components/UI/ProfileAvatar';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/authContext';
import PostTemplate from '@/components/UI/PostTemplate';
import { useQuery } from '@tanstack/react-query';
import { ref } from 'yup';
import ModalHeader from '../../TabsComponents/ModalHeader';
import HeaderTemplate from '../../TabsComponents/headerTemplate';
import SharePostDialog from './SharePostDialog';
import CommentInput from './CommentInput';

interface Props {
  visible: boolean;
  setVisible: () => void;
  postId: number;
  post: IPost;
  followed: boolean;
  refetch: () => void;
  isLoading: boolean;
  postImages: string[];
  showInput: boolean;
  setShowInput: () => void
}


const CommentsDialog: React.FC<Props> = ({ 
  visible, 
  setVisible, 
  post,
  followed, 
  refetch, 
  isLoading, 
  postImages, 
  showInput,
  setShowInput,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [content, setContent] = useState("")
  const [openNewModal, setOpenNewModal] = useState(false)
  const {authState:{ userData, userId }} = useAuth();
  const [liked, setLiked] = useState(false)
  const [openSharePostDialog, setOpenSharePostDialog] = useState(false)

  const handleSendComment = async () => {
    try {
      // 🚧Add comment action
    } catch (error) {
      console.error(error);
      
    }
  }

  const handleFollowAction = async (id: number) => {

  }

  useEffect(() => {
      const likedByUser = post.likes?.some(item => item.userId === Number(userId)) || false;
      setLiked(likedByUser);
      
  }, [post.likes, userId]);

  useEffect(() => {

    const isLiked = async () => {
      post.likes?.some((item) => {
        if (item.userId === Number(userId)){
          return setLiked(true)
        }
        return setLiked(false)
      })
    }

    // const isFollowed = async () => {
      
    // }
    isLiked()
    // isFollowed()
  },[post.likes, userId])

  const handleLikeAction = async (id: number) => {
    if (liked === true) {
      await unlikePost(id)
      setLiked(false)
      refetch()
    } else {
      await likePost(id)
      setLiked(true)
      refetch()
    }
  }
  
  
  return (

    <HeaderTemplate 
      title={post.authorName}
      visible={visible}
      onClose={() => {
        setVisible()
        setShowInput()
      }}
      children={
        <>
          {/* 🚧Post Detail here🚧 */}
          <View 
            style={{
              ...styles.postContainer,
              backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black
            }}
          >
            {isLoading && <Text>Loading...</Text>}
              
            {/* Header */}
            <View style={{...styles.headerContainer}}>

              <View style={{...styles.userContainer}}>
              
                <ProfileAvatar
                  userId={post.userId}
                  image={""} // 🚧
                  size={40}
                  handleUpdate={() => {}}
                />
                
                <View style={{...styles.headerTextGroup}}>
                  <Text 
                    style={{
                      ...pageStyle.headline03, 
                      color: theme.colors.grey0
                    }}
                  >
                    {post?.authorName ?  post?.authorName : ""}
                  </Text>

                  <Text
                    style={{
                      ...pageStyle.xsText, 
                      color: theme.colors.grey0,
                    }}
                  >
                    {post?.createdAt ? yearMonthDate(post?.createdAt) : ""}
                  </Text>
                </View>
              </View>

                <View style={{...styles.headerButtonGroup}}>
                  <TouchableOpacity
                    style={{
                      ...styles.followButton,
                      borderColor: theme.colors.primary,
                      backgroundColor: followed ? theme.colors.primary : "transparent"
                    }}
                    onPress={() => handleFollowAction(post.userId)}
                  >
                    <Text
                      style={{
                        ...pageStyle.button16,
                        color: followed ? theme.colors.white : theme.colors.primary,
                      }}
                    >
                      {followed ? t("unfollow") : t("follow")}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>

              <Divider />

              {/* Body */}
              <View style={{...styles.bodyContainer}}>  

                <View style={{...styles.contentContainer}}>
                  
                  {/* Text content */}
                  <Text
                    style={{color: theme.colors.grey0}}
                  >
                    {post?.content ? post?.content : ""}
                  </Text>

                  {/* Image content */}
                  {postImages.length > 0 && postImages.map((uri, index) => (
                    <View key={index}>
                      <Image source={{ uri: uri }} style={{height: 250, resizeMode: 'contain'}} />
                    </View>
                  ))}
                  
                  {/* Reactions */}
                  <View style={{...styles.reactionGroup}}>
                    <View style={{...styles.countsGrop}}>
                      <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{post?.likeCount ? post?.likeCount : 0}</Text>
                      <MaterialCommunityIcons name='heart' size={16} color={"rgb(255, 45, 85)"} />
                    </View>
                    
                    <View style={{flexDirection: 'row', gap: theme.spacing.xs, alignItems: 'center'}}>
                      <Text>
                        <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>
                          {`${post?.commentCount ? post?.commentCount : 0 } comments`}
                        </Text>
                      </Text>

                      <Text>{` • `}</Text>

                      <TouchableOpacity>
                        <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>
                          {`${post?.sharedCount ? post?.sharedCount : 0 } shares`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>          
              </View>

              <Divider />

              {/* Footer */}
              <View style={{...styles.footerContainer}}>
                {/* Like */}
                <TouchableOpacity 
                  style={{...styles.footerButtonItem}}
                  onPress={() => handleLikeAction(post.postId)}
                >
                  <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? "rgb(255, 45, 85)" : theme.colors.grey3} />
                  <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("like")}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{...styles.footerButtonItem}}
                  onPress={setShowInput}
                >
                  <MaterialCommunityIcons name='comment-text-outline' size={24} color={theme.colors.grey3} />
                  <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("comment")}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{...styles.footerButtonItem}}
                  onPress={() => setOpenSharePostDialog(true)}
                >
                  <MaterialCommunityIcons name='share-outline' size={24} color={theme.colors.grey3} />
                  <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("share")}</Text>
                </TouchableOpacity>
                
            </View> 
          </View>  

          {showInput && 
            <CommentInput />
          }

          {/* Comments */}
          {post.commentCount === 0 && 
            <View >
              <Text>Be the first to comment</Text>
            </View>
          }

          {post.commentCount !== 0 && post.comments.map((comment:IComment) => (
            <View 
              key={comment.commentId}
              style={{
                ...styles.contentContainer, 
                ...styles.commentContainer, 
                backgroundColor: theme.mode === 'light' ? theme.colors.white : theme.colors.black,
              }}
            >
              <View 
                style={{
                  flexDirection:'row', 
                  gap: theme.spacing.sm, 
                  alignItems: 'flex-start', 
                  paddingHorizontal: theme.spacing.md
                }}
              >
                <CommentUserAvatar userId={comment.userId} image={""}/>
                <View style={{...styles.headerTextGroup}}>
                  <Text style={{...pageStyle.headline03, color: theme.colors.grey0}}>{comment.authorName}</Text>
                  <Text style={{...pageStyle.xsText, color: theme.colors.grey0}}>{yearMonthDate(comment.createdAt)}</Text>
                </View>
              </View>
              
              <View style={{paddingHorizontal: theme.spacing.md}}>
                <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{comment.content}</Text>
              </View>
            </View>
          ))}

          <SharePostDialog 
            visible={openSharePostDialog}
            setVisible={() => setOpenSharePostDialog(!openSharePostDialog)}
            postId={post.postId}
            post={post}
            //user={user}
            postImages={postImages}
          />
        </>
      }
    />
      
  )
}

export default CommentsDialog

const CommentUserAvatar = ({userId, image}:{userId: number, image: string}) => {


  return(
    <ProfileAvatar
      userId={userId}
      image={image}
      size={40}
      handleUpdate={() => {}}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing?.xl,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    alignItems: 'center',
    paddingVertical: theme.spacing?.sm,
  },
  postContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing?.sm,
  },
  bodyContainer: {
    paddingVertical: theme.spacing?.sm
  },
  contentContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing?.sm
  },
  headerTextGroup: {
    flexDirection: 'column',
  },
  userContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerButtonGroup: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  reactionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  followButton: {
    paddingHorizontal: theme.spacing?.lg,
    height: 36,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10
  },
  countsGrop: {
    flexDirection: 'row', 
    gap: theme.spacing?.xs,
    alignItems: 'center'
  },
  commentContainer: {
    padding: theme.spacing?.md,
    marginTop: theme.spacing?.sm,
  }
})