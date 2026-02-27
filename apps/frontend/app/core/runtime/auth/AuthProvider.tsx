// auth/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/core/supabase/client";

interface AuthContextType {
  userId?: string;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(true);

  const supabase = createClient(); // ❗不能 await

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id);
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ userId, loading }}>{children}</AuthContext.Provider>;
}
