# Product Variant API Documentation

## Overview
This API endpoint provides formatted product variant data including pricing information, inventory details, and product metadata.

## Endpoint
```
GET /api/product/{id}
```
POST /api/product
```
PUT /api/product/{id}/edit
```
DELETE /api/product/{id}
```
BATCH /api/product
```

## Response Format

### Success Response
**Status Code:** `200 OK`

**Content-Type:** `application/json`

### Response Schema

#### FormattedDataResponse
| Field | Type | Description |
|-------|------|-------------|
| `formatted_data` | Array&lt;FormattedVariant&gt; | List of formatted product variants |

#### FormattedVariant
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the product variant |
| `name` | string | Yes | Display name of the product variant |
| `barcode` | string | Yes | Product barcode (EAN/UPC format) |
| `sku` | string | Yes | Stock Keeping Unit identifier |
| `minStock` | integer | Yes | Minimum stock threshold for inventory management |
| `thumbnail` | string | Yes | URL to product thumbnail image |
| `prices` | Array&lt;PricesVariantOption&gt; | Yes | Available pricing options for the variant |

#### PricesVariantOption
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the pricing option |
| `name_price` | string | Yes | Display name for the pricing package |
| `price` | number | Yes | Price in the base currency unit |
| `quantity` | integer | Yes | Number of items included in this pricing option |

## Example Success Response

```json
{
  "data": {
    "message": "Product variants created successfully",
    "formatted_data": [
      {
        "id": "123",
        "name": "Product A Variant 1",
        "barcode": "8991234567890",
        "sku": "SKU123",
        "min_stock": 10,
        "thumbnail": "https://example.com/image.jpg",
        "prices": [
          {
            "id": "p1",
            "name_price": "Paket 1",
            "price": 10000,
            "quantity": 1
          }
        ]
      }
    ]
  },
  "error_code": null
}
```

## Example Error Response

```json
{
  "data": {
    "message": "Product variants not found"
  },
  "error_code": 1151
}
```

## OpenAPI Schema Definition

```yaml
components:
  schemas:
    PricesVariantOption:
      type: object
      required:
        - id
        - name_price
        - prices
        - quantity
      properties:
        id:
          type: string
          description: Unique identifier for the pricing option
          example: "p1"
        name_price:
          type: string
          description: Display name for the pricing package
          example: "Paket 1"
        price:
          type: number
          description: Price in the base currency unit
          example: 10000
        quantity:
          type: integer
          description: Number of items included in this pricing option
          minimum: 1
          example: 1

    FormattedVariant:
      type: object
      required:
        - id
        - name
        - barcode
        - sku
        - min_stock
        - thumbnail
        - prices
      properties:
        id:
          type: string
          description: Unique identifier for the product variant
          example: "123"
        name:
          type: string
          description: Display name of the product variant
          example: "Product A Variant 1"
        barcode:
          type: string
          description: Product barcode (EAN/UPC format)
          pattern: '^[0-9]{13}$'
          example: "8991234567890"
        sku:
          type: string
          description: Stock Keeping Unit identifier
          example: "SKU123"
        min_stock:
          type: integer
          description: Minimum stock threshold for inventory management
          minimum: 0
          example: 10
        thumbnail:
          type: string
          format: uri
          description: URL to product thumbnail image
          example: "https://example.com/image.jpg"
        prices:
          type: array
          description: Available pricing options for the variant
          minItems: 1
          items:
            $ref: '#/components/schemas/PricesVariantOption'

    FormattedDataResponse:
      type: object
      required:
        - formatted_data
      properties:
        formatted_data:
          type: array
          description: List of formatted product variants
          items:
            $ref: '#/components/schemas/FormattedVariant'
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "Detailed error description"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Notes
- All prices are returned in the base currency unit (e.g., cents, smallest denomination)
- Barcodes follow standard EAN-13 format
- Thumbnail URLs should be valid HTTP/HTTPS URLs
- The `min_stock` field is used for inventory management and low-stock alerts
- Each variant must have at least one pricing option