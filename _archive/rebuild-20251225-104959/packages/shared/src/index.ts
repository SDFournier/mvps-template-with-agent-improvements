export type HealthResponseDto = {
  ok: boolean;
  mysql: boolean;
  redis: boolean;
  timestamp: string;
};

export type BookDto = {
  id: number;
  title: string;
  author: string | null;
};

export type BookCreateDto = {
  title: string;
  author?: string | null;
};

export type BookUpdateDto = {
  title?: string;
  author?: string | null;
};

export type PaginationDto = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type BookListResponseDto = {
  items: BookDto[];
  pagination: PaginationDto;
};

export type UserRole = "admin" | "user";

export type AuthCredentialsDto = {
  email: string;
  password: string;
};

export type AuthUserDto = {
  id: number;
  email: string;
  role: UserRole;
};

export type AuthRegisterRequestDto = AuthCredentialsDto;
export type AuthRegisterResponseDto = {
  user: AuthUserDto;
};

export type AuthLoginRequestDto = AuthCredentialsDto;
export type AuthLoginResponseDto = {
  token: string;
  user: AuthUserDto;
};

export type AuthMeResponseDto = {
  user: AuthUserDto;
};

export type OkResponseDto = {
  ok: true;
};

export type AuthLogoutResponseDto = OkResponseDto;

export type AdminOverviewDto = {
  userCount: number;
  message: string;
};

export type UploadCreateDto = {
  filename: string;
  contentBase64: string;
  mimeType?: string;
};

export type UploadResponseDto = {
  id: number;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export type ApiErrorDto = {
  ok: false;
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
  path: string;
  timestamp: string;
};
