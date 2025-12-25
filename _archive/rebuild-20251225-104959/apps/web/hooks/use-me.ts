import { useEffect, useState } from "react";
import type { AuthUserDto } from "@repo/shared";
import { getMe } from "../lib/api";

export function useMe(enabled: boolean) {
  const [user, setUser] = useState<AuthUserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    getMe()
      .then((response) => setUser(response.user))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [enabled]);

  return { user, loading, error };
}
