# API Login Documentation

## Overview

This document provides comprehensive documentation for the login authentication API endpoint. The API handles user authentication through WhatsApp number and password verification.

## Table of Contents

- [Authentication Endpoint](#authentication-endpoint)
- [Request Specification](#request-specification)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Response Codes](#response-codes)
- [Examples](#examples)
- [Notes](#notes)

## Authentication Endpoint

### Base URL
```
POST /api/v2/login
```

### Description
This endpoint handles authentication for users attempting to log in using their registered WhatsApp number and password. The `/login` refers to the slug or page-specific route within the API structure.

### Supported HTTP Methods
- **POST** *(Primary method for authentication)*
- **GET** *(Alternative method)*
- **PUT** *(Alternative method)*
- **BATCH** *(Batch processing support)*

> **Note**: Although multiple HTTP methods are accepted, authentication is typically performed via POST method for security best practices.

## Request Specification

### Content Type
```
Content-Type: application/json
```

### Request Body Structure
```json
{
  "no_whatsapp": "string",
  "password": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `no_whatsapp` | string | ✅ Yes | Registered WhatsApp number associated with the user account |
| `password` | string | ✅ Yes | Password associated with the WhatsApp number |

### Example Request
```bash
curl -X POST /api/v2/login \
  -H "Content-Type: application/json" \
  -d '{
    "no_whatsapp": "+6281234567890",
    "password": "mySecurePassword123"
  }'
```

## Response Format

### Success Response Structure
```json
{
  "data": {
    "message": "Login successful"
  },
  "error_code": null
}
```

### Success Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.message` | string | Confirmation message indicating successful authentication |
| `error_code` | null | Always `null` when login is successful |

### Error Response Structure
```json
{
  "error_code": 1001,
  "message": "Invalid WhatsApp number or password"
}
```

### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `error_code` | integer | Specific error code indicating the type of error (see Error Codes section) |
| `message` | string | Human-readable description of the error |

## Error Handling

### Authentication Status Check
To determine if authentication was successful, check if `error_code === null`:

```javascript
if (response.error_code === null) {
  // Authentication successful
  console.log(response.data.message);
} else {
  // Authentication failed
  console.error(`Error ${response.error_code}: ${response.message}`);
}
```

### Common Error Scenarios

| Scenario | Error Code | Message |
|----------|------------|---------|
| Invalid credentials | 1001 | "Invalid WhatsApp number or password" |
| Account not found | 1002 | "WhatsApp number not registered" |
| Account suspended | 1003 | "Account has been suspended" |
| Too many attempts | 1004 | "Too many login attempts. Please try again later" |
| Invalid request format | 1005 | "Invalid request format" |

## Response Codes

### Error Code Ranges by API Slug

| Error Code Range | Slug | Description |
|------------------|------|-------------|
| 1001 - 1200 | `/login` | Authentication related errors |
| 1201 - 1400 | `/dashboard` | Dashboard access errors |
| 1401 - 1600 | `/profile` | Profile management errors |
| 1601 - 1800 | `/product` | Product related errors |
| 1801 - 2000 | `/user` | User management errors |

### HTTP Status Codes

| HTTP Status | Condition | Description |
|-------------|-----------|-------------|
| 200 | Success | Authentication successful |
| 400 | Bad Request | Invalid request format or missing parameters |
| 401 | Unauthorized | Invalid credentials |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

## Examples

### Successful Login Example

**Request:**
```json
{
  "no_whatsapp": "+6281234567890",
  "password": "myPassword123"
}
```

**Response:**
```json
{
  "data": {
    "message": "Login successful"
  },
  "error_code": null
}
```

### Failed Login Example

**Request:**
```json
{
  "no_whatsapp": "+6281234567890",
  "password": "wrongPassword"
}
```

**Response:**
```json
{
  "error_code": 1001,
  "message": "Invalid WhatsApp number or password"
}
```

### Invalid Request Format Example

**Request:**
```json
{
  "phone": "+6281234567890",
  "pass": "myPassword123"
}
```

**Response:**
```json
{
  "error_code": 1005,
  "message": "Invalid request format"
}
```

## Notes

### Important Considerations

1. **Success Validation**: Always check if `error_code === null` to determine successful authentication
2. **Error Handling**: For any non-null value of `error_code`, the request has failed
3. **Security**: Use HTTPS in production environments
4. **Rate Limiting**: Implement proper rate limiting to prevent brute force attacks
5. **Input Validation**: Validate WhatsApp number format before sending requests

### Best Practices

- Store authentication tokens securely if provided
- Implement proper error handling for all possible error codes
- Use environment variables for API endpoints
- Implement retry logic with exponential backoff for network errors
- Log authentication attempts for security monitoring

### Additional Method Support

While POST is the primary method for authentication, the API also supports:
- **GET**: For checking authentication status
- **PUT**: For updating authentication credentials
- **BATCH**: For processing multiple authentication requests

> **Contact**: For additional examples using GET, PUT, or BATCH methods, please refer to the extended API documentation or contact the development team.

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2025-07-01 | Initial API v2 release |
| 2.1 | 2025-07-15 | Added batch processing support |

---

*This documentation is maintained by the API Development Team. Last updated: July 2025*