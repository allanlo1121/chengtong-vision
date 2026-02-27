// user/UserProvider.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { RuntimeUser } from "./types";
import { createClient } from "@/lib/core/supabase/client";

export const UserContext = createContext<RuntimeUser | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const [user, setUser] = useState<RuntimeUser | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!userId) return;

    async function load() {
      const { data } = await supabase.from("v_runtime_user").select("*").single();

      setUser(data);
    }

    load();
  }, [userId]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// export const useUser = () => {
//   const ctx = useContext(UserContext)
//   if (!ctx) throw new Error("UserProvider missing")
//   return ctx
// }
