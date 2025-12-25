import { useEffect, useState } from "react";

type HealthResponse = {
  ok: boolean;
  mysql: boolean;
  redis: boolean;
  timestamp: string;
};

export default function Home() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

    fetch(`${baseUrl}/health`)
      .then((response) => response.json())
      .then((payload: HealthResponse) => setData(payload))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Base MVP</h1>
      <p>Skeleton template ready.</p>
      <h2>Health</h2>
      {error ? (
        <pre>{error}</pre>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
      )}
    </main>
  );
}
