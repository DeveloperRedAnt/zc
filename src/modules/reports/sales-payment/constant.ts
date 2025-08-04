// Data untuk transaction stat cards
import { CreditCard, DollarSign, FileText, QrCode, Ticket } from 'lucide-react';

export const transactionStats = [
  {
    id: 'total',
    icon: FileText,
    title: 'Total Jumlah Transaksi',
    value: 835,
  },
  {
    id: 'cash',
    icon: DollarSign,
    title: 'Tunai',
    value: 275,
  },
  {
    id: 'debit-credit',
    icon: CreditCard,
    title: 'Debit / Kredit',
    value: 200,
  },
  {
    id: 'qris',
    icon: QrCode,
    title: 'QRIS',
    value: 187,
  },
  {
    id: 'voucher',
    icon: Ticket,
    title: 'Voucher',
    value: 173,
  },
];
