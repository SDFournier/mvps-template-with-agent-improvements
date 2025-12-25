import { useState } from "react";
import type { UploadResponseDto } from "@repo/shared";
import { uploadFile } from "../lib/api";
import { useAuthToken } from "../hooks/use-auth";

export default function UploadPage() {
  const { ready, isAuthenticated } = useAuthToken();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponseDto | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Selecciona un archivo");
      return;
    }
    if (file.size > maxUploadBytes) {
      setError("El archivo supera el limite permitido");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const base64 = await readFileAsBase64(file);
      const response = await uploadFile({
        filename: file.name,
        mimeType: file.type,
        contentBase64: base64
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Uploads</h1>
        <p>Validando sesion...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Uploads</h1>
        <p>Necesitas iniciar sesion primero.</p>
        <a href="/login">Ir a login</a>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Uploads</h1>
      <p>Subi un archivo y guarda metadata en el backend.</p>
      <p>Limite aproximado: 2 MB.</p>
      <input
        type="file"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <button type="button" onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir"}
      </button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {result && (
        <div>
          <h2>Resultado</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}

const maxUploadBytes = 2 * 1024 * 1024;

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Invalid file data"));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Invalid file encoding"));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}
