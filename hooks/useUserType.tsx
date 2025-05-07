import { useMemo } from "react";
import { useAuth } from "@/contexts/authContext";

export const useUserType = () => {
  const {
    authState: { userData },
  } = useAuth();

  const userType = useMemo(() => {
    if (!userData) return null;
    if (userData.roleId === 1) return "admin";
    if (userData.roleId === 3) return "company";
    return null;
  }, [userData]);

  return userType;
};
