'use client';

import CustomInput from '@/components/input/custom-input';
import React, { useState, useEffect } from 'react';

export type FilterStoreListProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function Index({ search: searchParams, setSearch }: FilterStoreListProps) {
  const [searchTerm, setSearchTerm] = useState(searchParams);

  // debounce 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, setSearch]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-1/2">
          <div>
            <CustomInput
              label="Cari Toko"
              prependIcon="Search"
              placeholder="Cari..."
              className="h-10"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
