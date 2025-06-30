import { ArrowRightUp } from '@icon-park/react';
import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { Label } from '../label/label';

export interface BulkEditData {
  id: string;
  name: string;
}

export interface BulkEditPopoverProps {
  // Data & callbacks
  variants: BulkEditData[];
  onUpdate: (selectedIds: string[], updates: Partial<BulkEditData>) => void;

  // Trigger button configuration
  triggerButtonText?: string;
  triggerButtonIcon?: ReactNode;
  triggerButtonClassName?: string;
  triggerButtonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  // Popover content configuration
  title?: string;
  description?: string;
  selectAllLabel?: string;
  actionButtonLabel?: string;
  actionButtonIcon?: ReactNode;
  emptyStateText?: string;

  // Popover styling & behavior
  popoverClassName?: string;
  popoverWidth?: string;
  disabled?: boolean;
  closeOnBackdropClick?: boolean;

  // Position configuration
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'top-center';

  // Advanced configurations
  maxHeight?: string;
  gridColumns?: 1 | 2 | 3 | 4;
  showSelectAll?: boolean;
}

export const BulkEditPopover: React.FC<BulkEditPopoverProps> = ({
  // Data & callbacks
  variants = [],
  onUpdate,

  // Trigger button configuration
  triggerButtonText = 'Bulk Edit',
  triggerButtonIcon,
  triggerButtonClassName = 'bg-[#0fa6c1] hover:bg-[#0fa6c1]/90 text-white',

  // Popover content configuration
  title = 'Pilih Varian',
  description = 'Silahkan pilih varian untuk diisikan datanya secara massal',
  selectAllLabel = 'Pilih Semua',
  actionButtonLabel = 'Lanjut Isi Detail Secara Massal',
  actionButtonIcon = <ArrowRightUp size={16} />,
  emptyStateText = 'Tidak ada varian tersedia',

  // Popover styling & behavior
  popoverClassName = '',
  popoverWidth = 'w-[505px]',
  disabled = false,
  closeOnBackdropClick = true,

  // Position configuration
  position = 'bottom-left',

  // Advanced configurations
  maxHeight = 'max-h-96',
  gridColumns = 3,
  showSelectAll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Update selectAll state when selectedVariants changes
  useEffect(() => {
    if (variants.length > 0) {
      setSelectAll(selectedVariants.length === variants.length);
    }
  }, [selectedVariants, variants.length]);

  // Reset selections when popover closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedVariants([]);
      setSelectAll(false);
    }
  }, [isOpen]);

  const handleOpenPopover = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClosePopover = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      handleClosePopover();
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedVariants(variants.map((v) => v.id));
    } else {
      setSelectedVariants([]);
    }
  };

  const handleSelectVariant = (variantId: string, checked: boolean) => {
    if (checked) {
      setSelectedVariants((prev) => [...prev, variantId]);
    } else {
      setSelectedVariants((prev) => prev.filter((id) => id !== variantId));
    }
  };

  const handleBulkUpdate = () => {
    if (selectedVariants.length > 0 && !disabled) {
      onUpdate(selectedVariants, {});
      handleClosePopover();
    }
  };

  const formatVariantLabel = (variant: BulkEditData) => {
    return `${variant.name}`;
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'bottom-right':
        return 'top-full right-0 mt-2';
      case 'bottom-center':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      case 'top-center':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      default:
        return 'top-full left-0 mt-2';
    }
  };

  const getGridClasses = () => {
    switch (gridColumns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <Button
        onClick={handleOpenPopover}
        disabled={disabled}
        className={`${triggerButtonClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {triggerButtonText}
        {triggerButtonIcon && <span className="ml-2">{triggerButtonIcon}</span>}
      </Button>

      {/* Popover */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-opacity-30 z-40" onClick={handleBackdropClick} />

          {/* Popover Content */}
          <div className={`absolute ${getPositionClasses()} z-50`}>
            <div
              className={`${popoverWidth} bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-6 ${popoverClassName}`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-medium text-[#555555]">{title}</h3>
                    <button
                      type="button"
                      onClick={handleClosePopover}
                      className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-[14px] text-[#555555]">{description}</p>
                </div>

                {/* Select All */}
                {variants.length > 0 && showSelectAll && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      disabled={disabled}
                    />
                    <Label className="text-[14px] font-medium text-[#555555]">
                      {selectAllLabel}
                    </Label>
                  </div>
                )}

                {/* Variant List */}
                {variants.length > 0 ? (
                  <div className={`${maxHeight} overflow-y-auto`}>
                    <div className={`grid ${getGridClasses()} gap-4`}>
                      {variants.map((variant) => (
                        <div key={variant.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedVariants.includes(variant.id)}
                            onCheckedChange={(checked) =>
                              handleSelectVariant(variant.id, !!checked)
                            }
                            disabled={disabled}
                          />
                          <Label className="text-[14px] font-medium text-[#555555] flex-1 cursor-pointer">
                            {formatVariantLabel(variant)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[14px] text-gray-400">{emptyStateText}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleBulkUpdate}
                  disabled={selectedVariants.length === 0 || disabled}
                  className="w-fit bg-[#0fa6c1] hover:bg-[#0fa6c1]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {actionButtonLabel}
                  {actionButtonIcon && <span className="ml-2">{actionButtonIcon}</span>}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkEditPopover;
