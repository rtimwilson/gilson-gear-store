---
name: printful-api
description: Printful REST API integration patterns for the Gil-Son merch store. Covers authentication, product sync, mockup generation, order fulfillment, shipping rates, and webhook handling.
---

# Printful API Integration

## Setup

Gil-Son uses Printful's "Manual Order / API Store" mode. This means no Shopify, no WooCommerce — the Next.js app is the only storefront, communicating directly with Printful's REST API.

Base URL: `https://api.printful.com`
Auth: Bearer token in Authorization header
Token source: Printful Dashboard → Settings → API → Generate Token

## Key Endpoints

```
Products & Catalog
GET  /store/products              → List all products synced to our store
GET  /store/products/{id}         → Single product with all variants
GET  /products                    → Browse full Printful catalog (for adding new products)
GET  /products/{id}               → Catalog product details + variant options

Mockup Images
POST /mockup-generator/create     → Request mockup generation (async)
GET  /mockup-generator/task?task_key={key} → Poll for completed mockup images

Orders & Fulfillment
POST /orders                      → Create order (after Stripe payment confirmed)
GET  /orders/{id}                 → Order status + tracking info
PUT  /orders/{id}                 → Update order (before fulfillment starts)
DELETE /orders/{id}               → Cancel order (before fulfillment starts)

Shipping
POST /shipping/rates              → Calculate shipping cost for cart contents

Reference
GET  /countries                   → Shipping destinations + state/province codes
GET  /tax/rates                   → Tax rate info by region
```

## Product Data Flow

1. Products are designed in Printful's web dashboard (upload Gil-Son artwork, choose product blanks, set placement)
2. Published products appear via `GET /store/products`
3. Each product has variants (size + colour combinations), each with a unique variant_id and price
4. Product images come from Printful mockup generator — request mockups for each variant
5. Cache product data with Next.js ISR (revalidate every hour) so the store loads fast

## Order Flow (triggered by Stripe webhook)

```
1. Customer completes Stripe Checkout
2. Stripe fires checkout.session.completed webhook → /api/webhooks/stripe
3. Webhook handler extracts line items + shipping address
4. POST /orders to Printful with:
   - recipient: { name, address1, city, state_code, country_code, zip }
   - items: [{ variant_id, quantity, files (if needed) }]
5. Printful returns order ID + status "draft" or "pending"
6. Printful prints, packs, ships → fires webhook to /api/webhooks/printful
7. Webhook updates order status in database + sends tracking email to customer
```

## Shipping Rate Calculation

Before checkout, call `POST /shipping/rates` with the cart contents and destination to show accurate shipping costs:

```json
{
  "recipient": { "country_code": "CA", "state_code": "NS" },
  "items": [
    { "variant_id": "12345", "quantity": 2 },
    { "variant_id": "67890", "quantity": 1 }
  ]
}
```

Response includes shipping method options with prices in the store's currency.

## Error Handling

- 401: API key invalid or expired → log error, return 500 to client with friendly message
- 404: Product/variant not found → likely desynced, trigger product resync
- 429: Rate limited → implement exponential backoff with 3 retries
- Printful order creation can fail if a variant is out of stock → catch this, notify customer, offer alternatives

## Printful Client Structure

Build `/src/lib/printful.ts` as a typed API client:

```typescript
class PrintfulClient {
  private baseUrl = 'https://api.printful.com';
  private token: string;

  async getProducts(): Promise<PrintfulProduct[]>
  async getProduct(id: number): Promise<PrintfulProductDetail>
  async getShippingRates(recipient: Address, items: CartItem[]): Promise<ShippingRate[]>
  async createOrder(order: PrintfulOrderInput): Promise<PrintfulOrder>
  async getOrder(id: number): Promise<PrintfulOrder>
  async generateMockup(productId: number, files: MockupFile[]): Promise<string> // returns task_key
  async getMockupResult(taskKey: string): Promise<MockupResult>
}
```

All methods should throw typed errors that the API routes can catch and translate into user-friendly responses.
