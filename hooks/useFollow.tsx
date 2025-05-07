import { useCallback, useEffect, useState } from "react";


export function useFollow() {
  const [followed, setFollowed] = useState(false)

  useEffect(() => {

  },[])

  const toggleFollow = useCallback(async () => {
    
    try {
      if(followed) {

      } else {

      }
      
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  },[])

  return {
    followed,
    toggleFollow,
  }
}