import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthLogoutResponseDto,
  AuthMeResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterResponseDto,
  AdminOverviewDto,
  BookCreateDto,
  BookDto,
  BookListResponseDto,
  BookUpdateDto,
  UploadCreateDto,
  UploadResponseDto
} from "@repo/shared";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const tokenKey = "auth_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(tokenKey);
}

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    window.localStorage.setItem(tokenKey, token);
  } else {
    window.localStorage.removeItem(tokenKey);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (withAuth) {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }

  return payload as T;
}

export function register(
  body: AuthRegisterRequestDto
): Promise<AuthRegisterResponseDto> {
  return request<AuthRegisterResponseDto>("/auth/register", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function login(
  body: AuthLoginRequestDto
): Promise<AuthLoginResponseDto> {
  return request<AuthLoginResponseDto>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function logout(): Promise<AuthLogoutResponseDto> {
  return request<AuthLogoutResponseDto>("/auth/logout", { method: "POST" }, true);
}

export function getMe(): Promise<AuthMeResponseDto> {
  return request<AuthMeResponseDto>("/auth/me", {}, true);
}

export function getAdminOverview(): Promise<AdminOverviewDto> {
  return request<AdminOverviewDto>("/admin/overview", {}, true);
}

export function listBooks(params: {
  page: number;
  pageSize: number;
  search?: string;
}): Promise<BookListResponseDto> {
  const query = new URLSearchParams();
  query.set("page", String(params.page));
  query.set("pageSize", String(params.pageSize));
  if (params.search) {
    query.set("search", params.search);
  }

  return request<BookListResponseDto>(
    `/books?${query.toString()}`,
    {},
    true
  );
}

export function createBook(body: BookCreateDto): Promise<BookDto> {
  return request<BookDto>("/books", {
    method: "POST",
    body: JSON.stringify(body)
  }, true);
}

export function updateBook(
  id: number,
  body: BookUpdateDto
): Promise<BookDto> {
  return request<BookDto>(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body)
  }, true);
}

export function deleteBook(id: number): Promise<{ ok: true }> {
  return request<{ ok: true }>(`/books/${id}`, { method: "DELETE" }, true);
}

export function uploadFile(body: UploadCreateDto): Promise<UploadResponseDto> {
  return request<UploadResponseDto>("/uploads", {
    method: "POST",
    body: JSON.stringify(body)
  }, true);
}
