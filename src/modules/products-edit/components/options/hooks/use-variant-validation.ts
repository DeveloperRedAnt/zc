import { useVariantOptionsStore } from '@/modules/products-edit/components/options/stores';

export const useVariantValidation = () => {
  const { validationErrors, setValidationError, clearValidationError, validateForm } =
    useVariantOptionsStore();

  const validateRadioSelection = (
    attributeId: number,
    attributeName: string,
    valueId: number | null,
    customValue: string
  ) => {
    // Jika belum pilih apapun
    if (valueId === null && !customValue.trim()) {
      const updatedErrors = {
        ...(validationErrors.attributes || {}),
        [attributeId]: `Pilihan untuk ${attributeName} wajib dipilih`,
      };
      setValidationError('attributes', updatedErrors);
      return false;
    }
    // Hapus error untuk attribute ini
    if (validationErrors.attributes) {
      const newAttributeErrors = { ...validationErrors.attributes };
      delete newAttributeErrors[attributeId];
      if (Object.keys(newAttributeErrors).length === 0) {
        clearValidationError('attributes');
      } else {
        setValidationError('attributes', newAttributeErrors);
      }
    }
    return true;
  };

  const getAttributeError = (attributeId: number) => {
    return validationErrors.attributes?.[attributeId];
  };

  const getUnitError = (unitId: string, field: string) => {
    return validationErrors.variant_units?.[unitId]?.[field];
  };

  const hasAttributeErrors = () => {
    return !!validationErrors.attributes && Object.keys(validationErrors.attributes).length > 0;
  };

  const hasUnitErrors = () => {
    return (
      !!validationErrors.variant_units && Object.keys(validationErrors.variant_units).length > 0
    );
  };

  return {
    validationErrors,
    validateRadioSelection,
    validateForm,
    getAttributeError,
    getUnitError,
    hasAttributeErrors,
    hasUnitErrors,
    clearValidationError,
    setValidationError,
  };
};
