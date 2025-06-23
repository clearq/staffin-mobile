import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPostImageFromCDN } from '@/utils/CDN-action';

 interface props {
  userId: number;
  images: [];
 }

const PostImage = ({userId, images}: props) => {
  const [url, setUrl] = useState([""])

  useEffect(() => {
    const fetchUrl = async () =>{
      // console.log('staff image:', user.profileImage, user.id);

      const url = await fetchPostImageFromCDN({
        userId: userId,
        contentFolder: "posts_images",
        key: images
      })
      setUrl([url])

      console.log('url:', url );
    }
    if(images) {
      fetchUrl()
    }
  },  [Image, userId])

  

  return (
    <View>
      
    </View>
  )
}

export default PostImage

const styles = StyleSheet.create({})