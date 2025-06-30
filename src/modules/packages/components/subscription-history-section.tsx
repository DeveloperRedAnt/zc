import Image from 'next/image';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';

const historyData = [
  {
    date: '14 September 2025',
    description: ['10 Kasir', 'Produk Paduan', 'Akan berakhir pada 14 Oktober 2025'],
    package: 'Add On',
    packageType: 'addon',
    amount: 'Rp 100.000',
  },
  {
    date: '12 September 2025',
    description: 'Akan berakhir pada 11 Oktober 2025',
    package: 'ZYCAS MAX',
    packageType: 'max',
    amount: 'Rp 280.000',
  },
  {
    date: '12 Agustus 2025',
    description: 'Akan berakhir pada 11 September 2025',
    package: 'ZYCAS MAX',
    packageType: 'max',
    amount: 'Rp 280.000',
  },
  {
    date: '1 Februari 2025',
    description: 'Akan berakhir pada 28 Februari 2025',
    package: 'ZYCAS +',
    packageType: 'plus',
    amount: 'Rp 150.000',
  },
  {
    date: '1 Januari 2025',
    description: 'Akan berakhir pada 31 Januari 2025',
    package: 'ZYCAS +',
    packageType: 'plus',
    amount: 'Rp 150.000',
  },
];

export default function () {
  return (
    <div className="w-full px-4 md:px-6">
      <h1 className="text-base font-semibold text-gray-800 mb-6  ml-[23px]">
        Riwayat Langganan Anda
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Tanggal Langganan
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Deskripsi</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Paket</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historyData.map((item) => (
                <tr key={item.date} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {Array.isArray(item.description) ? (
                      <div>
                        {item.description.map((desc) => (
                          <div key={desc}>• {desc}</div>
                        ))}
                      </div>
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.packageType === 'addon' && (
                      <span className="text-sm text-gray-700">Add On</span>
                    )}
                    {item.packageType === 'max' && (
                      <div className="w-[110px] h-[32px] flex items-start justify-start">
                        <Image
                          src={Zycasmaxlogo}
                          alt="ZYCAS Plus Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    {item.packageType === 'plus' && (
                      <div className="w-[110px] h-[32px] flex items-start justify-start">
                        <Image
                          src={ZycasPlusLogo}
                          alt="ZYCAS Plus Logo"
                          className="w-full h-full object-contain ml-[-12px]"
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-white text-right border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Kami hanya menampilkan riwayat langganan Anda selama 1 tahun kebelakang
          </p>
        </div>
      </div>
    </div>
  );
}
