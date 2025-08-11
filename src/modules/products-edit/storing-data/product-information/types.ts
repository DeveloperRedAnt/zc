// types/product-information.ts
export interface ProductTag {
  label: string;
  value: number;
}

export interface ProductInformationState {
  // Image/Thumbnail
  thumbnailFile: File | null;
  thumbnailUrl: string | null;

  // Product Name
  productName: string;

  // Switches
  isActiveProduct: boolean;
  isFavorite: boolean;

  // Tags
  selectedTags: ProductTag[];
}

export interface ProductInformationActions {
  // Thumbnail actions
  setThumbnailFile: (file: File | null) => void;
  setThumbnailUrl: (url: string | null) => void;

  // Product name actions
  setProductName: (name: string) => void;

  // Switch actions
  setIsActiveProduct: (isActive: boolean) => void;
  setIsFavorite: (isFavorite: boolean) => void;

  // Tag actions
  setSelectedTags: (tags: ProductTag[]) => void;
  addTag: (tag: ProductTag) => void;
  removeTag: (tagValue: number) => void;

  // Reset action
  resetProductInformation: () => void;
}

export interface ProductInformationStore
  extends ProductInformationState,
    ProductInformationActions {}
