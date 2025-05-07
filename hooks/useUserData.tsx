import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/backend"

export const useUserData = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user-data", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await getUserById(userId);
      return response;
    },
    enabled: !!userId, // only run if userId is truthy
  });
};