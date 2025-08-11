type ProductMix = {
  name: string;
  qty: string;
};

type Props = {
  mixes: ProductMix[];
};

export function ProductMixTable({ mixes }: Props) {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Produk yang dipadukan</th>
            <th className="px-4 py-2 text-left">Jumlah yang dibutuhkan</th>
          </tr>
        </thead>
        <tbody>
          {mixes.map((mix) => (
            <tr key={mix.name} className="border-t">
              <td className="px-4 py-2">{mix.name}</td>
              <td className="px-4 py-2">{mix.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
