'use client';

import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import FormFieldError from '@/components/form-field-error/form-field-error';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { Check, Refresh, SettingConfig } from '@icon-park/react';
import { useState } from 'react';

const optionsResetRotation: OptionType[] = [
  { label: '1 Hari', value: 1 },
  { label: '7 Hari', value: 7 },
  { label: '1 Bulan', value: 30 },
];

type FormData = {
  counter: number;
  prefix: string;
  counter_start: number;
  rotation: OptionType | null;
};

function PageContent() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedResetRotation, setSelectedResetRotation] = useState<OptionType | null>(null);
  const [formKey, setFormKey] = useState(0); // untuk trigger ulang UI

  const [_formData, setFormData] = useState<FormData>({
    counter: 0,
    prefix: '',
    counter_start: 0,
    rotation: null,
  });

  const { getRegisteredFields, setErrors } = useFormValidationContext();
  const { validateFields } = useFormValidator();

  const handleFormChange = (newData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = () => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);
    setErrors(errors);

    if (!isValid) {
      setIsConfirmOpen(false);
      toast.error('Harap lengkapi data No. Urut Nota terlebih dahulu!');
      return;
    }

    toast.success('Tersimpan!', {
      description: 'No. Urut Nota Anda telah berhasil tersimpan',
    });

    setIsConfirmOpen(false);
    setIsEditOpen(false);
  };

  const {
    ref: counterRef,
    error: counterError,
    handleChange: onCounterChange,
  } = useRegisterField('counter');
  const {
    ref: prefixRef,
    error: prefixError,
    handleChange: onPrefixChange,
  } = useRegisterField('prefix');
  const {
    ref: counterStartRef,
    error: counterStartError,
    handleChange: onCounterStartChange,
  } = useRegisterField('counter_start');
  const { error: resetRotationError, handleChange: onResetRotationChange } = useRegisterField(
    'rotation',
    true,
    {
      getValue: () => selectedResetRotation?.value?.toString() ?? '',
    }
  );

  const handleResetRotationErrorChange = (val: OptionType | null) => {
    setSelectedResetRotation(val);
    onResetRotationChange();
    handleFormChange({ rotation: val });
  };

  const handleResetForm = () => {
    setFormData({
      counter: 0,
      prefix: '',
      counter_start: 0,
      rotation: null,
    });
    setSelectedResetRotation(null);
    setErrors({});
    setFormKey((prev) => prev + 1); // trigger ulang input
    // setIsEditOpen(false); // ← jika ingin reset sekaligus menutup form
  };

  return (
    <div className="box-border flex flex-col gap-6 items-start w-full text-[#555555]">
      <div className="flex-row flex justify-between items-start w-full">
        <div className="flex flex-col font-semibold text-[16px] text-[#555555]">No. Urut Nota</div>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" type="button" onClick={() => setIsEditOpen(true)}>
              <SettingConfig />
              Atur No. Urut
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <div key={formKey}>
              <DialogHeader>
                <DialogTitle>No. Urut Nota</DialogTitle>
              </DialogHeader>
              <div className="w-full gap-4 py-4">
                <div>
                  <CustomInput
                    required
                    isWidthFull
                    placeholder="3"
                    label="Jumlah Digit"
                    inputNumber
                    ref={counterRef}
                    onChange={(e) => {
                      onCounterChange();
                      handleFormChange({ counter: Number(e.target.value) });
                    }}
                    className={`border ${counterError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                  />
                  <FormFieldError message={counterError} />
                </div>
                <div className="mt-2">
                  <CustomInput
                    required
                    isWidthFull
                    placeholder="HQS"
                    label="Prefix"
                    ref={prefixRef}
                    onChange={(e) => {
                      onPrefixChange();
                      handleFormChange({ prefix: e.target.value });
                    }}
                    className={`border ${prefixError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                  />
                  <FormFieldError message={prefixError} />
                </div>
                <div className="mt-2">
                  <CustomInput
                    required
                    isWidthFull
                    placeholder="1"
                    label="No. Urut Awal"
                    inputNumber
                    ref={counterStartRef}
                    onChange={(e) => {
                      onCounterStartChange();
                      handleFormChange({ counter_start: Number(e.target.value) });
                    }}
                    className={`border ${
                      counterStartError ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                    }`}
                  />
                  <FormFieldError message={counterStartError} />
                </div>
                <div>
                  <Dropdown
                    label="Reset Rotasi"
                    options={optionsResetRotation}
                    value={selectedResetRotation}
                    onChange={handleResetRotationErrorChange}
                    placeholder="Pilih..."
                    className="mt-2"
                    required
                  />
                  <FormFieldError message={resetRotationError} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" type="button" onClick={handleResetForm}>
                  <Refresh />
                  Reset
                </Button>
                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="success" onClick={() => setIsConfirmOpen(true)}>
                      Simpan No. Urut Nota
                      <Check />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Anda akan menyimpan No. Urut Nota</DialogTitle>
                      <DialogDescription className="pt-4">
                        Apakah Anda yakin akan menyimpan No. Urut Nota tersebut?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Tidak</Button>
                      </DialogClose>
                      <Button variant="info" onClick={handleSubmit}>
                        Ya, Saya Yakin
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="box-border flex flex-col gap-2 p-2 w-full">
        <InformationText text="Untuk menentukan no. urut di Nota yang tercetak" />
        <div className="flex flex-wrap w-full mt-3 space-y-10">
          <div className="w-1/2 mb-4">
            <p className="font-semibold text-[14px]">Jumlah Digit:</p>
            <p className="font-[400] mt-1"> 3 </p>
          </div>
          <div className="w-1/2">
            <p className="font-semibold text-[14px]">Prefix:</p>
            <p className="font-[400] mt-1"> HQS </p>
          </div>
          <div className="w-1/2">
            <p className="font-semibold text-[14px]">No. Urut Awal:</p>
            <p className="font-[400] mt-1"> 1 </p>
          </div>
          <div className="w-1/2">
            <p className="font-semibold text-[14px]">Reset Rotasi:</p>
            <p className="font-[400] mt-1"> 1 Hari </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <FormValidationProvider>
      <PageContent />
    </FormValidationProvider>
  );
}
