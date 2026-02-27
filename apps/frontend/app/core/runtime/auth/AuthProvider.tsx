// auth/AuthProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/core/supabase/client";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient(); // ❗不能 await

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ userId, loading }}>{children}</AuthContext.Provider>;
}
