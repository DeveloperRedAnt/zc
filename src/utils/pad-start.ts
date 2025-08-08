/**
 * Pads the current string with a given string (repeated and/or truncated, if needed)
 * so that the resulting string has a given length. The padding is applied from the start of this string.
 *
 * @param str - The string to pad
 * @param targetLength - The length of the resulting string once the current string has been padded
 * @param padString - The string to pad the current string with. Defaults to " " (space)
 * @returns A string of the specified targetLength with the padString applied from the start
 *
 * @example
 * ```typescript
 * padStart("5", 2, "0"); // "05"
 * padStart("hello", 10, "*"); // "*****hello"
 * padStart("world", 3, "0"); // "world" (no padding needed)
 *
 * // Masking example
 * const fullNumber = "2034399002125581";
 * const last4Digits = fullNumber.slice(-4);
 * const maskedNumber = padStart(last4Digits, fullNumber.length, "*");
 * // Result: "************5581"
 * ```
 */
export function padStart(str: string, targetLength: number, padString = ' '): string {
  // Convert to string if not already
  const currentStr = String(str);

  // If target length is less than or equal to current length, return original string
  if (targetLength <= currentStr.length) {
    return currentStr;
  }

  // Calculate how much padding is needed
  const padLength = targetLength - currentStr.length;

  // If padString is empty, return original string
  if (padString.length === 0) {
    return currentStr;
  }

  // Create the padding by repeating padString and truncating if necessary
  let padding = '';
  const padStringLength = padString.length;

  // Repeat padString enough times to cover the needed padding
  const repeatCount = Math.ceil(padLength / padStringLength);
  for (let i = 0; i < repeatCount; i++) {
    padding += padString;
  }

  // Truncate padding to exact length needed
  padding = padding.slice(0, padLength);

  // Return padded string
  return padding + currentStr;
}

/**
 * Alternative implementation using native String.prototype.padStart if available
 * Falls back to custom implementation for compatibility
 */
export function padStartNative(str: string, targetLength: number, padString = ' '): string {
  const currentStr = String(str);

  // Use native padStart if available
  if (typeof currentStr.padStart === 'function') {
    return currentStr.padStart(targetLength, padString);
  }

  // Fallback to custom implementation
  return padStart(currentStr, targetLength, padString);
}

/**
 * Utility function for masking strings (common use case)
 *
 * @param str - The original string
 * @param visibleChars - Number of characters to show at the end
 * @param maskChar - Character to use for masking (default: "*")
 * @returns Masked string
 *
 * @example
 * ```typescript
 * maskString("2034399002125581", 4); // "************5581"
 * maskString("john@example.com", 4, "#"); // "############.com"
 * ```
 */
export function maskString(str: string, visibleChars = 4, maskChar = '*'): string {
  const currentStr = String(str);

  if (visibleChars >= currentStr.length) {
    return currentStr;
  }

  const visiblePart = currentStr.slice(-visibleChars);
  return padStart(visiblePart, currentStr.length, maskChar);
}

/**
 * Utility function for zero-padding numbers (common use case)
 *
 * @param num - The number to pad
 * @param length - Target length
 * @returns Zero-padded string
 *
 * @example
 * ```typescript
 * zeroPad(5, 2); // "05"
 * zeroPad(123, 5); // "00123"
 * ```
 */
export function zeroPad(num: number | string, length: number): string {
  return padStart(String(num), length, '0');
}

export default padStart;
