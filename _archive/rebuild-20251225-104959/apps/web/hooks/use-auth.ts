import { useEffect, useState } from "react";
import { getAuthToken, setAuthToken } from "../lib/api";

export function useAuthToken() {
  const [token, setTokenState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTokenState(getAuthToken());
    setReady(true);
  }, []);

  const saveToken = (value: string) => {
    setAuthToken(value);
    setTokenState(value);
  };

  const clearToken = () => {
    setAuthToken(null);
    setTokenState(null);
  };

  return {
    token,
    ready,
    isAuthenticated: Boolean(token),
    saveToken,
    clearToken
  };
}
