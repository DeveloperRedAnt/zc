export function toFormData(
  payload: Record<
    string,
    string | number | boolean | File | Blob | (string | number | boolean | File | Blob)[]
  >
): FormData {
  const formData = new FormData();

  for (const key in payload) {
    const value = payload[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}
