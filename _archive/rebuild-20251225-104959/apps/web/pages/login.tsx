import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { login, register } from "../lib/api";
import { useAuthToken } from "../hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { saveToken } = useAuthToken();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        await register({ email, password });
      }

      const response = await login({ email, password });
      saveToken(response.token);
      router.push("/books");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>
      <p>
        {mode === "login"
          ? "Usa tu cuenta para ingresar."
          : "Crea una cuenta y luego iniciá sesión."}
      </p>
      <form onSubmit={submit} style={{ display: "grid", gap: "0.75rem", maxWidth: 320 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Continuar"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Crear cuenta" : "Ya tengo cuenta"}
        </button>
      </form>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </main>
  );
}
