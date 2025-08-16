# Store Filter dengan Opsi "Semua Toko"

## Overview

Store Filter sekarang mendukung opsi "Semua Toko" dengan ID 0 yang memungkinkan user untuk melihat data dari semua toko sekaligus.

## Cara Kerja

### 1. **Opsi yang Tersedia**
- **Semua Toko** (ID: 0) - Menampilkan data dari semua toko
- **Toko Spesifik** (ID: 1, 2, 3, dst) - Menampilkan data dari toko tertentu

### 2. **Implementasi di Backend**

Ketika `currentStoreId === '0'`, backend API harus:

```typescript
// Contoh implementasi di API handler
const handleStoreFilter = (storeId: string, query: any) => {
  if (storeId === '0') {
    // Tidak tambahkan filter store_id, ambil data dari semua toko
    return query;
  } else {
    // Filter berdasarkan store_id spesifik
    return query.where('store_id', storeId);
  }
};
```

### 3. **Implementasi di Frontend Components**

#### **Component yang Sudah Updated:**

```typescript
// Employee Table
const currentStoreId = useStoreId(); // Bisa return '0', '1', '2', dst

const queryParams = {
  'x-store-id': currentStoreId, // '0' untuk semua toko
  body: { ... }
};

// Member Table
const currentStoreId = useStoreId();

const params = {
  'x-store-id': currentStoreId, // '0' untuk semua toko
  body: { ... }
};

// Voucher Page
const currentStoreId = useStoreId();

const requestParams = {
  params: {
    'x-store-id': currentStoreId, // '0' untuk semua toko
  },
  body: { ... }
};
```

### 4. **Handling Logic di Components**

Components tidak perlu logic khusus untuk ID 0, karena:
- Store filter otomatis set localStorage dan cookies dengan value '0'
- Hooks `useStoreId()` return string '0'
- API calls menggunakan '0' sebagai parameter
- Backend yang menentukan apakah filter atau tidak

## Testing

### Manual Testing Steps:

1. **Pilih "Semua Toko"**
   - Buka store filter
   - Pilih opsi "Semua Toko"
   - Verify localStorage dan cookies berisi '0'

2. **Verify Data Loading**
   - Check network requests memiliki `x-store-id: 0`
   - Verify data yang ditampilkan dari semua toko

3. **Refresh Page**
   - Refresh halaman
   - Verify "Semua Toko" tetap terpilih
   - Verify data tetap menampilkan semua toko

4. **Switch Between Options**
   - Pilih toko spesifik
   - Verify data berubah untuk toko tersebut
   - Pilih kembali "Semua Toko"
   - Verify data kembali menampilkan semua toko

## Backend API Requirements

API endpoints harus mendukung `x-store-id: 0` dengan logic:

```typescript
// Pseudo-code untuk API handler
if (headers['x-store-id'] === '0') {
  // Return data dari semua toko yang user memiliki akses
  // Jangan filter berdasarkan store_id
} else {
  // Filter berdasarkan store_id spesifik
  // WHERE store_id = headers['x-store-id']
}
```

## Security Considerations

- User hanya bisa melihat data dari toko yang mereka memiliki akses
- Backend harus validate permission untuk masing-masing toko
- Opsi "Semua Toko" tetap respect user permissions