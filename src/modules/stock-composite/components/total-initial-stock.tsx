type Props = {
  total: number;
};

export function TotalInitialStock({ total }: Props) {
  return (
    <div>
      Jumlah Stok Awal Produk: <span className="font-semibold">{total} pcs</span>
    </div>
  );
}
