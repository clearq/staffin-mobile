import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import BottomSheetCustom from '@/components/UI/BottomSheetCustom'
import { sharePost } from '@/api/backend';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IPost, IUser } from '@/types';
import { yearMonthDate } from '@/utils/dateFormat';
import { ProfileAvatar } from '@/components/UI/ProfileAvatar';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/authContext';

interface Props {
  visible: boolean;
  setVisible: () => void;
  postId: number;
  post: IPost;
  postImages: string[]
}


const SharePostDialog: React.FC<Props> = ({ visible, setVisible, postId, post, postImages }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [content, setContent] = useState("")
  const [openNewModal, setOpenNewModal] = useState(false)
  const { isLoading, authState:{ userData, userId }} = useAuth();

  

  const handleSharePost = async () => {
    const value = {
      content: content
    }
    try {
      console.log('repost:', postId, value.content);
      
      const response = await sharePost(postId, value)
      setVisible()

      return response

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BottomSheetCustom 
      visible={visible}
      setVisible={setVisible}
      children={
        <View style={{...styles.container}}>

          {!openNewModal && 
            <>
              <TouchableOpacity 
                style={{...styles.row}}
                onPress={() => handleSharePost()}
              >
                <MaterialCommunityIcons name='share-outline' size={24} color={theme.colors.grey0} />
                <Text style={{...pageStyle.headline03, color: theme.colors.grey0}}>{t("post-without-content")}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{...styles.row }}
                onPress={() => setOpenNewModal(true)}
              >
                <MaterialCommunityIcons name='square-edit-outline' size={24} color={theme.colors.grey0} />
                <Text style={{...pageStyle.headline03}}>{t("post-with-content")}</Text>
              </TouchableOpacity>
            </>
          }


          {openNewModal && 
            <View>
              <View>             
                <ProfileAvatar
                  userId={Number(userId!)}
                  image={userData!.profileImage}
                  size={40}
                  handleUpdate={() => {}}
                />
              </View>

              <TextInput 
                editable
                multiline
                onChangeText={(text) => setContent(text)}
                value={content}
                placeholder={t("post-content-placeholder")}
                style={{marginBottom: theme.spacing.xl, ...pageStyle.inputText}}
              />

              <TouchableOpacity 
                style={{alignItems: 'flex-end', paddingVertical: theme.spacing.md}}
                onPress={() => handleSharePost()}
              >
                <MaterialCommunityIcons name='send' color={theme.colors.grey0} size={24} />
              </TouchableOpacity>
              <Divider />

              {/* Post View */}
              <View>
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
                </View>

                {/* Content */}
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

                  </View>          
                </View>
              </View>
            </View>
          }
        </View>
      }
    />
  )
}

export default SharePostDialog

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
  }
})