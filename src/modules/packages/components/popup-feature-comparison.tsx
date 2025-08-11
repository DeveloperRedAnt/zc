import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog/dialog';
import { CheckOne, CloseOne } from '@icon-park/react';
import Image from 'next/image';
import React from 'react';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import EnterprisePackage from './../../../../public/assets/images/zycasmax-logo.svg';

interface FeatureComparisonModalProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeatureComparisonModal({ title, open, onOpenChange }: FeatureComparisonModalProps) {
  const features = [
    {
      category: 'General',
      items: [
        {
          name: 'Transaksi Offline',
          gratis: true,
          bisnis: true,
          enterprise: true,
        },
        {
          name: 'Jumlah Organisasi',
          gratis: '1 Organisasi',
          bisnis: '1 Organisasi',
          enterprise: '1 Organisasi',
        },
        {
          name: 'Jumlah Toko',
          gratis: '1 Toko',
          bisnis: '2 Toko',
          enterprise: '3 Toko',
        },
        {
          name: 'Jumlah Akun Staff / Organisasi',
          gratis: '1 Owner',
          bisnis: 'Multi User\nHingga 5 Akun Staff / Organisasi',
          enterprise: 'Multi User\nHingga 10 Akun Staff / Organisasi',
        },
      ],
    },
    {
      category: 'Dashboard',
      items: [
        {
          name: 'Produk Akan Kadaluwarsa',
          gratis: false,
          bisnis: true,
          enterprise: true,
        },
        {
          name: 'Produk Kadaluwarsa (Expired)',
          gratis: false,
          bisnis: true,
          enterprise: true,
        },
        {
          name: 'Stok Hampir Habis',
          gratis: false,
          bisnis: true,
          enterprise: true,
        },
        {
          name: 'Grafik Penjualan',
          gratis: true,
          bisnis: true,
          enterprise: true,
        },
        {
          name: 'Produk Terjual Terbanyak',
          gratis: true,
          bisnis: true,
          enterprise: true,
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[950px] max-h-[98vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing Header */}
          <div className="grid grid-cols-4 gap-4">
            <div />
            <div className="text-left">
              <div className="text-gray-600 px-3 py-1 rounded text-sm font-medium mb-2">GRATIS</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-500">Paket Bisnis</div>
              <Image
                src={ZycasPlusLogo}
                alt="ZycasPlusLogo"
                className="w-[107px] h-[32px] object-contain ml-[-19px]"
              />
              <div className="text-xs font-medium">Rp 150.000 per Bulan</div>
            </div>
            <div className="text-left gap-2">
              <div className="text-xs text-gray-500">Paket Enterprise</div>
              <Image
                src={EnterprisePackage}
                alt="ZycasMaxLogo"
                className="w-[107px] h-[32px] object-contain"
              />
              <div className="text-xs font-medium">Rp 280.000 per Bulan</div>
            </div>
          </div>

          {/* Features List */}
          {features.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded border-t border-b border-gray-100 last:border-b-0">
                {category.category}
              </h3>

              {category.items.map((feature) => (
                <div
                  key={`${category.category}-${feature.name}`}
                  className="grid grid-cols-4 gap-4 py-2"
                >
                  <div className="text-sm text-gray-700 font-medium">{feature.name}</div>

                  {/* Gratis Column */}
                  <div className="text-left">
                    {typeof feature.gratis === 'boolean' ? (
                      feature.gratis ? (
                        <CheckOne theme="filled" fill="#0FA6C1" className="w-5 h-5 mx-auto" />
                      ) : (
                        <CloseOne theme="filled" fill="#F08181" className="w-5 h-5 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-gray-600 whitespace-pre-line">
                        {typeof feature.gratis === 'string' ? highlightText(feature.gratis) : null}
                      </span>
                    )}
                  </div>

                  {/* Bisnis Column */}
                  <div className="text-left">
                    {typeof feature.bisnis === 'boolean' ? (
                      feature.bisnis ? (
                        <CheckOne theme="filled" fill="#0FA6C1" className="w-5 h-5 mx-auto" />
                      ) : (
                        <CloseOne theme="filled" fill="#F08181" className="w-5 h-5 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-gray-600 whitespace-pre-line">
                        {typeof feature.bisnis === 'string' ? highlightText(feature.bisnis) : null}
                      </span>
                    )}
                  </div>

                  {/* Enterprise Column */}
                  <div className="text-left">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <CheckOne theme="filled" fill="#0FA6C1" className="w-5 h-5 mx-auto" />
                      ) : (
                        <CloseOne theme="filled" fill="#F08181" className="w-5 h-5 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-gray-600 whitespace-pre-line">
                        {typeof feature.enterprise === 'string'
                          ? highlightText(feature.enterprise)
                          : null}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function highlightText(text: string): React.JSX.Element {
  const highlightWords = ['2 Toko', '3 Toko', 'Multi User', '5 Akun', '10 Akun'];

  const parts = text.split(new RegExp(`(${highlightWords.join('|')})`, 'g'));

  // Gunakan Map untuk melacak jumlah kemunculan part
  const keyCountMap = new Map<string, number>();

  return (
    <>
      {parts.map((part) => {
        const count = keyCountMap.get(part) || 0;
        keyCountMap.set(part, count + 1);
        const uniqueKey = `${part}-${count}`;

        return (
          <span key={uniqueKey} className={highlightWords.includes(part) ? 'font-bold' : ''}>
            {part}
          </span>
        );
      })}
    </>
  );
}
