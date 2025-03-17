import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { IPost } from '@/types/PostTypes';
import { Fonts, theme } from '@/constants/Theme';
import { Divider, Image, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pageStyle from '@/constants/Styles';

interface props {
  post: IPost[];
}

const Activity = ({post}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    const router = useRouter()

    
  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >

      { post.length === 0 && (
        <View
          style={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
          }}
        >
          <Text
            style={{
              ...pageStyle.headline01,
              color:theme.colors.primary,
            }}
          >
            {t("no-activity-message")}
          </Text>
        </View>

      )}
      
      { post?.length !== 0 && post
        .sort((a, b) => (
          new Date (b.createdAt).getTime() - new Date(a.createdAt).getTime())
        ).slice(0, 2)
        .map((p, index, array) => (
          <View key={p.postId}>
            <TouchableOpacity>
              <View
                style={{
                  ...styles.postItemContainer
                }}
              >
                <View
                  style={{
                    flex: 2, 
                    flexDirection: 'column',
                    gap: theme.spacing.md
                  }}
                >

                  <Text
                    ellipsizeMode='clip'
                    numberOfLines={2}
                    style={{ 
                      ...pageStyle.smText,
                      color: theme.colors.grey0,
                    }}
                  >
                    {p.content}
                  </Text>

                  <TouchableOpacity>
                    <Text
                      style={{
                        ...pageStyle.button16,
                        color: theme.colors.secondary,
                      }}
                    >
                      {`${t("read-more")}...`}
                    </Text>
                  </TouchableOpacity>
                </View>


                {p.image 
                  ? <Image
                      source={{uri: p.image}} 
                      containerStyle={{ 
                        ...styles.imageSize,
                        backgroundColor: theme.colors.disabled
                      }}
                    />
                  : <View 
                      style={{
                        ...styles.imageSize,
                        backgroundColor: theme.colors.disabled,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }} 
                    />
                }
        
              </View>
            </TouchableOpacity>

            {index < array.length - 1 && 
              <Divider 
                style={{marginTop: theme.spacing.md}}
                color={theme.colors.greyOutline} 
              />
            }
          </View>
        ))
      }
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  imageSize: {
    width: 90,
    height: 90,
  }
})