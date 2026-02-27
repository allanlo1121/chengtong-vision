// user/UserProvider.tsx

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/core/supabase/client";
import { UserContext } from "./UserContext";
import type { RuntimeUser } from "./types";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<RuntimeUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("v_runtime_user")
      .select("*")
      .single<RuntimeUser>()
      .then(({ data }) => {
        if (data) setUser(data);
      });
  }, []);

  if (!user) return null;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
