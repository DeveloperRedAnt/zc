import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';
import React from 'react';

interface TotalTransactionAmountProps {
  value: number;
}

export function TotalTransactionAmount({ value }: TotalTransactionAmountProps) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 1, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  React.useEffect(() => {
    count.set(value);
  }, [value, count]);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow p-4 flex items-center gap-4 w-full h-20"
        style={{ marginTop: '-11px', height: '70px' }}
      >
        <div
          className="p-3 rounded-lg flex items-center justify-center"
          style={{ marginLeft: '-25px' }}
        >
          <ClipboardCheck className="w-20 h-10 text-gray-700" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Jumlah Transaksi</p>
          <motion.p className="text-xl font-semibold">
            {rounded.get()}
            {' Transaksi'}
          </motion.p>
        </div>
      </div>
    </>
  );
}
