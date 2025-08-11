h# User Management API Documentation

## Overview
This API provides endpoints to manage employees in a store, including:

- Listing all employees
- Creating and assigning new employees to a store
- Viewing employee details
- Updating employee data
- Managing employee permissions
- Resetting or changing employee passwords
- Resetting or changing employee PINs

## Endpoints

### 1. Get All Employees
**GET** `/api/employees`

#### Example Success Response
**Status Code:** `200 OK`
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "pagination": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 10,
    "total": 1
  },
  "data": [
    {
      "id": 28,
      "image": "https://images.app.goo.gl/XNW1RKrra92YJPLZ8",
      "name": "Kurt Bates",
      "email": "iva838@outlook.com",
      "phone": "88144139191",
      "store_count": 3,
      "is_active": true
    }
  ]
}
```

#### Example Error Response
```json
{
  "status": "error",
  "data": {
    "message": "User data not found"
  },
  "error_code": 1801
}
```

#### OpenAPI Schema Definition
```yaml
components:
  schemas:
    UserData:
      type: object
      required:
        - id
        - image
        - name
        - email
        - phone
        - store_count
        - is_active
      properties:
        id:
          type: string
          description: Unique identifier for the user
          example: "u1"
        image:
          type: string
          format: uri
          nullable: true
          description: URL to avatar image
          example: "https://images.app.goo.gl/XNW1RKrra92YJPLZ8"
        name:
          type: string
          description: Full name of the user
          example: "Kurt Bair"
        email:
          type: string
          format: email
          description: Email address
          example: "iva83@outlook.com"
        phone:
          type: string
          description: WhatsApp number
          example: "8209481722"
        store_count:
          type: number
          description: Number of associated stores
          example: 3
        is_active:
          type: boolean
          description: Account status
          example: true

    UserListResponse:
      type: object
      required:
        - users
      properties:
        users:
          type: array
          description: List of users
          items:
            $ref: '#/components/schemas/UserData'
```

### 2. Create New Employee
**POST** `/api/employees`

#### Example JSON Payload
```json
{
  "name": "John Doe",
  "phone": "089911223344",
  "email": "johndoe@mail.com",
  "identity_number": "34012233445566",
  "password": "password123",
  "password_confirmation": "password123",
  "is_active": true,
  "permissions": [
    {
      "store_id": "store-001",
      "position": "position-001",
      "sections": [
        {
          "section": "Kasir",
          "permission_ids": [1, 2, 3]
        },
        {
          "section": "Laporan Kasir",
          "permission_ids": [4, 5]
        }
      ]
    },
    {
      "store_id": "store-002",
      "position": "position-002",
      "sections": [
        {
          "section": "Produk",
          "permission_ids": [10, 11, 12]
        }
      ]
    }
  ]
}
```

**Status Code:** `200 OK`
```json
{
  "status": "success",
  "message": "Employee successfully created",
  "data": {
    "id": 28,
    "name": " udin saepudin",
    "phone": "085956289255",
    "identity_number": "3207170905230001",
    "email": "udinsaepudin@mail.com",
    "image": "http://xxx.com/storage/employee/1/168511e3ad223c17501466185a70b116a7.jpg",
    "is_active": true
  }
}
```

#### Example Error Response
```json
{
  "status": "error",
  "data": {
    "message": "Validation failed",
    "errors": {
        "name": ["The name field is required."],
        "phone": ["The phone number has already been taken."],
        "password": ["The password must be at least 6 characters."]
    },
  },
  "error_code": 1802
}

{
  "status": "error",
  "data": {
    "message": "Avatar file must be a valid image (jpg, jpeg, png) and less than 2MB.",
    "errors": {
        "avatar": ["Invalid file type or size exceeded."]
    },
  },
  "error_code": 1803
}
```

#### OpenAPI Schema Definition
```yaml
components:
  schemas:
    CreateEmployeeRequest:
      type: object
      required:
        - name
        - phone
        - password
        - password_confirmation
        - is_active
      properties:
        name:
          type: string
          description: Full name of the employee
          example: "John Doe"
        phone:
          type: string
          description: WhatsApp number
          example: "89911223344"
        email:
          type: string
          format: email
          nullable: true
          description: Email address
          example: "johndoe@mail.com"
        identity_number:
          type: string
          nullable: true
          description: National Identity Number
          example: "34012233445566"
        password:
          type: string
          format: password
          description: User password (min 6 characters)
          example: "password123"
        password_confirmation:
          type: string
          format: password
          description: Must match password
          example: "password123"
        is_active:
          type: boolean
          description: Whether the user is active
          example: true
        image:
          type: string
          format: binary
          nullable: true
          description: URL to avatar image
          example: "https://images.app.goo.gl/XNW1RKrra92YJPLZ8"
        permissions:
          type: array
          description: Permissions grouped by store and section
          items:
            type: object
            required:
              - store_id
              - position_id
              - sections
            properties:
              store_id:
                type: string
                example: "store-001"
              position_id:
                type: string
                example: "position-001"
              sections:
                type: array
                items:
                  type: object
                  required:
                    - section
                    - permission_ids
                  properties:
                    section:
                      type: string
                      example: "Kasir"
                    permission_ids:
                      type: array
                      items:
                        type: integer
                      example: [1, 2, 3]

paths:
  /api/employees:
    post:
      summary: Create a new employee with optional permissions
      tags:
        - Employees
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CreateEmployeeRequest'
      responses:
        '200':
          description: Employee successfully created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserData'
        '400':
          description: Validation error
        '500':
          description: Server error

```

### 3. Get Employee Detail
**GET** `/api/employees/{id}`

**Status Code:** `200 OK`
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": {
    "id": 28,
    "name": "Udin Saepudin",
    "email": "udinsaepudin@mail.com",
    "phone": "85956289255",
    "identity_number": "3207170905230001",
    "avatar": "https://example.com/storage/employees/28.jpg",
    "is_active": true,
    "organization": {
        "id": "organization-001",
        "name": "PT Mencari Cinta Sejati",
        "code": "1155230ASA5",
    },
    "permissions": [
      {
        "store": {
            "id": "store-001",
            "name": "Toko A",
        },
        "position": {
            "id": "position-001",
            "name": "Kasir",
        },
        "permission_count": 15,
        "sections": [
          {
            "section": "Kasir",
            "permission_items": [
              {
                "id": 1,
                "name": "Buka Transaksi",
                "key": "transaction.open"
              },
              {
                "id": 2,
                "name": "Retur Barang",
                "key": "transaction.return"
              }
            ]
          },
          {
            "section": "Laporan Kasir",
            "permission_items": [
              {
                "id": 3,
                "name": "Lihat Laporan Harian",
                "key": "report.daily"
              }
            ]
          }
        ]
      },
      {
        "store": {
            "id": "store-002",
            "name": "Toko B",
        },
        "position": {
            "id": "position-002",
            "name": "Admin",
        },
        "sections": [
          {
            "section": "Produk",
            "permission_items": [
              {
                "id": 10,
                "name": "Tambah Produk",
                "key": "product.create"
              },
              {
                "id": 11,
                "name": "Edit Produk",
                "key": "product.update"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### 4. Update Employee
**PUT** `/api/employees/{id}`

#### Example JSON Payload
```json
{
  "name": "John Doe",
  "phone": "089911223344",
  "email": "johndoe@mail.com",
  "identity_number": "34012233445566",
  "is_active": true,
}
```

#### OpenAPI Schema Definition
```yaml
components:
  schemas:
    UpdateEmployeeRequest:
      type: object
      properties:
        name:
          type: string
          description: Full name of the employee
          example: "John Doe"
        phone:
          type: string
          description: WhatsApp number
          example: "89911223344"
        email:
          type: string
          format: email
          nullable: true
          description: Email address
          example: "johndoe@mail.com"
        identity_number:
          type: string
          nullable: true
          description: National Identity Number
          example: "34012233445566"
        is_active:
          type: boolean
          description: Whether the user is active
          example: true

paths:
  /api/employees/{id}:
    put:
      summary: Update employee profile
      tags:
        - Employees
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
          description: ID of the employee to update
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateEmployeeRequest'
      responses:
        '200':
          description: Employee updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserData'
        '400':
          description: Validation error
        '404':
          description: Employee not found
        '500':
          description: Server error
```

### 5. Get Permission Groups
**GET** `/api/permission-groups/selection`

**Status Code:** `200 OK`
```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": [
      {
        "id": "id-123",
        "store": {
            "id": "store-001",
            "name": "Toko A",
        },
        "position": {
            "id": "position-001",
            "name": "Kasir",
        },
        "permission_count": 15,
        "sections": [
          {
            "section": "Kasir",
            "permission_items": [
              {
                "id": 1,
                "name": "Buka Transaksi",
                "key": "transaction.open"
              },
              {
                "id": 2,
                "name": "Retur Barang",
                "key": "transaction.return"
              }
            ]
          },
          {
            "section": "Laporan Kasir",
            "permission_items": [
              {
                "id": 3,
                "name": "Lihat Laporan Harian",
                "key": "report.daily"
              }
            ]
          }
        ]
      },
      {
        "id": "id-456",
        "store": {
            "id": "store-002",
            "name": "Toko B",
        },
        "position": {
            "id": "position-002",
            "name": "Admin",
        },
        "sections": [
          {
            "section": "Produk",
            "permission_items": [
              {
                "id": 10,
                "name": "Tambah Produk",
                "key": "product.create"
              },
              {
                "id": 11,
                "name": "Edit Produk",
                "key": "product.update"
              }
            ]
          }
        ]
      }
    ]
}
```

### 6. Reset Employee Password  
**PUT** `/api/employees/{id}/reset-password`

#### Example JSON Payload
```json
{
  "password": "zahbzah12",
  "password_confirmation": "zahbzah12"
}
```

### 7. Change Employee Password  
**PUT** `/api/employees/{id}/change-password`

#### Example JSON Payload
```json
{
  "old_password": "old password",
  "password": "zahbzah12",
  "password_confirmation": "zahbzah12"
}
```

### 8. Reset Employee PIN  
**PUT** `/api/employees/{id}/reset-pin`

### 9. Change Employee PIN  
**PUT** `/api/employees/{id}/change-pin`

#### Example JSON Payload
```json
{
  "old_pin": "888888",
  "pin": "123456",
  "pin_confirmation": "123456"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "Missing required field"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

### Notes
- The `status` field indicates the current account status of the user.
- The `avatar` field is optional and may be null.
- `store_count` represents the total number of stores linked to the user.
- Disabled users will have `is_active` set to false