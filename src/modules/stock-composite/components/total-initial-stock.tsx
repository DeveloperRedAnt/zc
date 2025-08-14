type Props = {
  total: number;
};

/**
 * TotalInitialStock
 *
 * Komponen untuk menampilkan jumlah stok awal produk
 *
 * @param {Props} props
 * @prop {number} total Jumlah stok awal produk
 *
 * @example
 * <TotalInitialStock total={10} />
 */
export function TotalInitialStock({ total }: Props) {
  return (
    <div>
      Jumlah Stok Awal Produk: <span className="font-semibold">{total} pcs</span>
    </div>
  );
}
