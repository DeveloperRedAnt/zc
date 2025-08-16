/**
 * Parse a formatted price string (e.g., "Rp 10.000") into a number.
 * Works with Indonesian Rupiah style formatting where dots are thousand separators.
 */
export function parsePrice(price: string): number {
  // Remove all non-digit characters (e.g., "Rp", spaces, dots, commas)
  const numeric = price.replace(/[^\d]/g, '');

  // Convert to integer. If string is empty, default to 0
  return numeric ? parseInt(numeric, 10) : 0;
}

// Example usage
// const price1 = parsePrice("Rp 10.000");     // Expected output: 10000
// const price2 = parsePrice("Rp 1.250.500");  // Expected output: 1250500
// const price3 = parsePrice("Rp 0");          // Expected output: 0

// console.log(price1, price2, price3);
