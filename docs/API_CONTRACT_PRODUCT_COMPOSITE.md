# Composites API Documentation

## Overview
This API endpoint provides formatted composite product data including batch production quantities and component product details.

## Endpoint
```
GET /api/composites
```

## Response Format

### Success Response
**Status Code:** `200 OK`

**Content-Type:** `application/json`

### Response Schema

#### FormattedDataResponse
| Field | Type | Description |
|-------|------|-------------|
| `composites` | Array&lt;Composite&gt; | List of composite products |

#### Composite
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the composite product |
| `batch_production_quantity` | integer | Yes | Number of composite units produced in a single batch |
| `products` | Array&lt;CompositeProduct&gt; | Yes | List of component products required for the composite |

#### CompositeProduct
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the component product entry |
| `product_id` | string | Yes | Identifier of the product used as a component |
| `quantity` | integer | Yes | Number of units of this product required per batch |

## Example Success Response

```json
{
  "data": {
    "composites": [
      {
        "id": "456",
        "batch_production_quantity": 10,
        "products": [
          {
            "id": "p1",
            "product_id": "Product 1",
            "quantity": 20
          },
          {
            "id": "p2",
            "product_id": "Product 2",
            "quantity": 10
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
    "message": "Composites not found"
  },
  "error_code": 1152
}
```

## OpenAPI Schema Definition

```yaml
components:
  schemas:
    CompositeProduct:
      type: object
      required:
        - id
        - product_id
        - quantity
      properties:
        id:
          type: string
          description: Unique identifier for the component product entry
          example: "p1"
        product_id:
          type: string
          description: Identifier of the product used as a component
          example: "Product 1"
        quantity:
          type: integer
          description: Number of units of this product required per batch
          minimum: 1
          example: 20

    Composite:
      type: object
      required:
        - id
        - batch_production_quantity
        - products
      properties:
        id:
          type: string
          description: Unique identifier for the composite product
          example: "456"
        batch_production_quantity:
          type: integer
          description: Number of composite units produced in a single batch
          minimum: 1
          example: 10
        products:
          type: array
          description: List of component products required for the composite
          minItems: 1
          items:
            $ref: '#/components/schemas/CompositeProduct'

    FormattedDataResponse:
      type: object
      required:
        - composites
      properties:
        composites:
          type: array
          description: List of composite products
          items:
            $ref: '#/components/schemas/Composite'
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
- Each composite must have at least one component product
- The `batch_production_quantity` represents how many finished composite units are produced in one production run
- Component `quantity` values represent the number of units needed per batch production
- All quantity values must be positive integers
- The `product_id` should reference valid products in the system
- Component products can be raw materials, sub-assemblies, or finished goods used in the composite