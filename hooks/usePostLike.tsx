import { useCallback, useEffect, useState } from "react";
import { likePost, unlikePost } from "@/api/backend"; // adjust path as needed

export function usePostLike(postLikes: { userId: number }[] = [], postId: number, userId?: number, refetchFn?: () => void) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const hasLiked = postLikes.some((like) => like.userId === Number(userId));
    setLiked(hasLiked);
  }, [postLikes, userId]);

  const toggleLike = useCallback(async () => {
    if (!userId) return;

    try {
      if (liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      setLiked((prev) => !prev);
      if (refetchFn) refetchFn();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }, [liked, postId, userId, refetchFn]);

  return {
    liked,
    toggleLike,
  };
}
