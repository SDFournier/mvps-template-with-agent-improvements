import { BadRequestException } from "@nestjs/common";

export type FieldErrors = Record<string, string>;

export function requireString(
  value: unknown,
  field: string,
  errors: FieldErrors
): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors[field] = "Required";
  }
}

export function requireEmail(
  value: unknown,
  field: string,
  errors: FieldErrors
): void {
  if (typeof value !== "string") {
    errors[field] = "Required";
    return;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    errors[field] = "Required";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    errors[field] = "Invalid email";
  }
}

export function requireMinLength(
  value: unknown,
  field: string,
  minLength: number,
  errors: FieldErrors
): void {
  if (typeof value !== "string") {
    errors[field] = "Required";
    return;
  }

  if (value.trim().length < minLength) {
    errors[field] = `Min length ${minLength}`;
  }
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function ensureValid(errors: FieldErrors): void {
  if (Object.keys(errors).length > 0) {
    throw new BadRequestException({
      message: "Validation failed",
      errors
    });
  }
}
