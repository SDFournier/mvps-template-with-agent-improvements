# Contracts

These contracts define API shapes that must remain stable.
Any change requires updating this document and the tests.

## Purpose
Define canonical request/response shapes and error formats.

## Use when
- You are adding or changing API inputs/outputs.
- You need to verify error or pagination response formats.

## Error contract
All failed requests must return the same shape.

Example:
```
{
  "ok": false,
  "statusCode": 400,
  "error": "BadRequestException",
  "message": "Validation failed",
  "details": { "field": "Required" },
  "path": "/resource",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

Rules:
- ok is always false.
- details is optional and only present when useful.
- path and timestamp are always included.

## Pagination contract
Any list response must include pagination.

Example:
```
{
  "items": [ { "...": "..." } ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

Rules:
- page and pageSize are integers >= 1.
- totalPages is at least 1.

## Auth contracts
Auth uses bearer tokens in the Authorization header.

Header:
```
Authorization: Bearer <token>
```

Register request:
```
{ "email": "user@example.com", "password": "password" }
```

Register response:
```
{ "user": { "id": 1, "email": "user@example.com", "role": "user" } }
```

Login response:
```
{ "token": "token-string", "user": { "id": 1, "email": "user@example.com", "role": "user" } }
```

Me response:
```
{ "user": { "id": 1, "email": "user@example.com", "role": "user" } }
```

Logout response:
```
{ "ok": true }
```

Rules:
- Never return passwords or password hashes.
- Role is always present on user responses.

## Roles contract
Roles are a closed set of values:
- user
- admin

Admin overview response:
```
{ "userCount": 10, "message": "Admin overview" }
```

Rules:
- Non-admin users must receive forbidden errors.

## Upload contracts
Upload request:
```
{
  "filename": "demo.txt",
  "contentBase64": "<base64>",
  "mimeType": "text/plain"
}
```

Upload response:
```
{
  "id": 1,
  "filename": "demo.txt",
  "mimeType": "text/plain",
  "size": 1234,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

Rules:
- Uploads require authentication.
- File download returns the original filename.

## Coupon book contracts
Create request:
```
{
  "name": "Summer Deals",
  "description": "VIP coupons",
  "reusablePerUser": false,
  "maxCodesPerUser": 1,
  "maxRedemptionsPerUser": null
}
```

Create response:
```
{
  "couponBook": {
    "id": "uuid",
    "businessId": "biz-123",
    "name": "Summer Deals",
    "description": "VIP coupons",
    "status": "ACTIVE",
    "reusablePerUser": false,
    "maxCodesPerUser": 1,
    "maxRedemptionsPerUser": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

Assignment request:
```
{ "userId": "user-123", "quantity": 1 }
```

Assignment response:
```
{
  "assigned": [ { "codeId": "uuid", "code": "MT-ABC12345" } ],
  "remainingAssignable": 0
}
```

Lock request:
```
{ "userId": "user-123", "ttlSeconds": 120, "idempotencyKey": "uuid" }
```

Lock response:
```
{ "lockToken": "uuid", "lockExpiresAt": "2025-01-01T00:02:00.000Z" }
```

Redeem request:
```
{
  "userId": "user-123",
  "lockToken": "uuid",
  "idempotencyKey": "uuid",
  "orderRef": "order-789",
  "metadata": { "channel": "web" }
}
```

Redeem response:
```
{ "redemptionId": "uuid", "status": "SUCCEEDED" }
```

Rules:
- `Idempotency-Key` header is required for lock and redeem requests.
- `lockToken` must match the latest lock for the code.
- Coupon book status values: ACTIVE | PAUSED | ARCHIVED.
- Coupon code state values: AVAILABLE | ASSIGNED | LOCKED | DISABLED.

## Contract tests
Every new or modified endpoint must have tests that assert:
- The response shape matches the contract.
- Errors follow the error contract.

## OpenAPI
Swagger UI is available at `/docs` when enabled, and the OpenAPI JSON is served
at `/docs-json` for client generation.

## API access contract (frontend)
Rules:
- All HTTP calls go through a single client layer.
- Auth token handling is centralized.
- Errors are normalized to the error contract before UI handling.
- Client uses OpenAPI types (openapi-fetch) and should be regenerated with
  `pnpm --filter @repo/web api:types` when contracts change.

## Events contract (queues)
Rules:
- Every event has a stable name, version, and correlation id.
- Payloads are JSON and must validate against a documented schema.
- Consumers must handle unknown versions safely.

Example event:
```
{
  "name": "entity.created",
  "version": 1,
  "correlationId": "uuid",
  "payload": { "...": "..." }
}
```
