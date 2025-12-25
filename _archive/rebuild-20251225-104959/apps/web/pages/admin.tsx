import { useEffect, useState } from "react";
import type { AdminOverviewDto } from "@repo/shared";
import { getAdminOverview } from "../lib/api";
import { useAuthToken } from "../hooks/use-auth";
import { useMe } from "../hooks/use-me";

export default function AdminPage() {
  const { ready, isAuthenticated } = useAuthToken();
  const { user, loading: userLoading, error: userError } = useMe(
    ready && isAuthenticated
  );
  const [overview, setOverview] = useState<AdminOverviewDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return;
    }
    getAdminOverview()
      .then((response) => setOverview(response))
      .catch((err: Error) => setError(err.message));
  }, [user]);

  if (!ready) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Admin</h1>
        <p>Validando sesion...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Admin</h1>
        <p>Necesitas iniciar sesion primero.</p>
        <a href="/login">Ir a login</a>
      </main>
    );
  }

  if (userLoading) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Admin</h1>
        <p>Cargando perfil...</p>
      </main>
    );
  }

  if (userError) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Admin</h1>
        <p style={{ color: "crimson" }}>{userError}</p>
      </main>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Admin</h1>
        <p>No tenes permisos para ver esta seccion.</p>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Admin</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {!overview ? (
        <p>Cargando overview...</p>
      ) : (
        <pre>{JSON.stringify(overview, null, 2)}</pre>
      )}
    </main>
  );
}
