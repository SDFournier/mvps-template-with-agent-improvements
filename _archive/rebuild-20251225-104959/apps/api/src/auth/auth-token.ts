export function extractBearerToken(header?: string): string | null {
  if (!header) {
    return null;
  }

  const [type, value] = header.split(" ");
  if (type?.toLowerCase() !== "bearer" || !value) {
    return null;
  }

  return value.trim();
}
