'use client';

import L from 'leaflet';
// Removed unused OpenStreetMapProvider import
// import { GeoSearchControl as LeafletGeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { Search, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

// ---------- Type Definitions ----------
// type GeoSearchControlManualProps = {
//   provider: OpenStreetMapProvider;
//   setLatLng: (lat: number, lng: number) => void;
//   triggerFormChange: (data: {
//     lat: number;
//     lng: number;
//     location: string;
//   }) => void;
// };

type LocationMarkerProps = {
  lat: number;
  lng: number;
  setLatLng: (lat: number, lng: number) => void;
  name?: string;
  address?: string;
  triggerFormChange?: (data: {
    lat?: number;
    lng?: number;
    location?: string;
    address?: string;
  }) => void;
};

type MapDialogProps = {
  lat: number;
  lng: number;
  setLatLng: (lat: number, lng: number) => void;
  name?: string;
  address?: string;
  triggerFormChange?: (data: {
    lat?: number;
    lng?: number;
    location?: string;
    address?: string;
  }) => void;
};

type SearchResult = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  importance?: number;
};

// ---------- Custom Marker Icon ----------
const aIcon = L.divIcon({
  className: '',
  html: `
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_6545_4819" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="6" y="1" width="30" height="40">
          <path d="M21 38.5C21 38.5 34.125 28 34.125 16.625C34.125 9.3765 28.2485 3.5 21 3.5C13.7515 3.5 7.875 9.3765 7.875 16.625C7.875 28 21 38.5 21 38.5Z" fill="#555555" stroke="white" stroke-width="3.5" stroke-linejoin="round"/>
          <path d="M21 21.875C21.6894 21.875 22.3721 21.7392 23.0091 21.4754C23.646 21.2115 24.2248 20.8248 24.7123 20.3373C25.1998 19.8498 25.5865 19.271 25.8504 18.6341C26.1142 17.9971 26.25 17.3144 26.25 16.625C26.25 15.9356 26.1142 15.2529 25.8504 14.6159C25.5865 13.979 25.1998 13.4002 24.7123 12.9127C24.2248 12.4252 23.646 12.0385 23.0091 11.7746C22.3721 11.5108 21.6894 11.375 21 11.375C19.6076 11.375 18.2723 11.9281 17.2877 12.9127C16.3031 13.8973 15.75 15.2326 15.75 16.625C15.75 18.0174 16.3031 19.3527 17.2877 20.3373C18.2723 21.3219 19.6076 21.875 21 21.875Z" fill="#555555" stroke="white" stroke-width="3.5" stroke-linejoin="round"/>
        </mask>
        <g mask="url(#mask0_6545_4819)">
          <rect width="42" height="42" fill="#555555"/>
        </g>
      </svg>
    `,
  iconSize: [42, 42],
  iconAnchor: [21, 38],
  popupAnchor: [0, -38],
});

// Fix default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// ---------- GeoSearch Control ----------
// function GeoSearchControlManual({
//   provider,
//   setLatLng,
//   triggerFormChange,
// }: GeoSearchControlManualProps) {
//   const map = useMap();

//   useEffect(() => {
//     // Inisialisasi kontrol pencarian lokasi
//     const searchControl = LeafletGeoSearchControl({
//       provider,
//       style: 'bar',
//       autoClose: true,
//       keepResult: true,
//       searchLabel: 'Cari alamat, daerah, atau nama jalan',
//       showMarker: false,
//       showPopup: false,
//       position: 'topleft',
//     });

//     map.addControl(searchControl);

//     // Tipe event lokasi hasil pencarian
//     type GeoSearchShowLocationEvent = {
//       location: {
//         x: number; // longitude
//         y: number; // latitude
//         label?: string;
//         bounds?: [[number, number], [number, number]];
//       };
//     };

//     // Event ketika lokasi hasil pencarian dipilih
//     map.on('geosearch/showlocation', (event: LeafletEvent) => {
//       const geoEvent = event as unknown as GeoSearchShowLocationEvent;
//       if (geoEvent.location) {
//         const { x, y } = geoEvent.location;
//         setLatLng(y, x);
//         triggerFormChange({
//           lat: y,
//           lng: x,
//           location: `${y}, ${x}`,
//         });
//       }
//     });

//     // Cleanup kontrol dan event saat unmount
//     return () => {
//       map.removeControl(searchControl);
//       map.off('geosearch/showlocation');
//     };
//   }, [map, provider, setLatLng, triggerFormChange]);

//   return null;
// }

// ---------- Location Marker ----------
function LocationMarker({ lat, lng, setLatLng, name, triggerFormChange }: LocationMarkerProps) {
  const [_wilayah, setWilayah] = useState<string>('');
  const [alamatLengkap, setAlamatLengkap] = useState<string>('');
  const lastFetchedRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;
    if (
      lastFetchedRef.current &&
      lastFetchedRef.current.lat === lat &&
      lastFetchedRef.current.lng === lng
    ) {
      return;
    }

    // Abort fetch sebelumnya jika ada
    const controller = new AbortController();
    lastFetchedRef.current = { lat, lng };

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        const addr = data.address || {};
        const alamat = [
          addr.road,
          addr.house_number,
          addr.neighbourhood,
          addr.suburb,
          addr.village,
          addr.town,
          addr.city_district,
          addr.city,
          addr.county,
          addr.state,
          addr.postcode,
        ]
          .filter(Boolean)
          .join(', ');
        setAlamatLengkap(alamat);
        setWilayah(addr.city || addr.town || addr.village || addr.county || addr.state || '');
        triggerFormChange?.({ address: alamat });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          // Optional: handle error lain
        }
      });

    // Cleanup: abort fetch jika lat/lng berubah sebelum selesai
    return () => {
      controller.abort();
    };
  }, [lat, lng, triggerFormChange]);

  // Event klik pada peta untuk update koordinat marker
  useMapEvents({
    click(e) {
      setLatLng(e.latlng.lat, e.latlng.lng);
      triggerFormChange?.({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        location: `${e.latlng.lat}, ${e.latlng.lng}`,
      });
    },
  });

  return (
    <Marker position={[lat, lng]} icon={aIcon}>
      <Popup closeButton={false} minWidth={340} maxWidth={360}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            marginBottom: 8,
          }}
        >
          {/* Icon lokasi */}
          <svg width="28" height="28" fill="none" style={{ marginTop: 2 }}>
            <circle cx="14" cy="9" r="5" stroke="#2CA4D8" strokeWidth="2" />
            <path d="M5 24c0-2.76 4.03-5 9-5s9 2.24 9 5" stroke="#2CA4D8" strokeWidth="2" />
          </svg>
          <div>
            {/* Nama toko */}
            <div
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: '#222',
                marginBottom: 2,
              }}
            >
              {name || ''}
            </div>
            {/* Alamat */}
            <div
              style={{
                color: '#444',
                fontSize: 15,
                marginBottom: 0,
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '22px',
                maxWidth: 250,
              }}
            >
              {alamatLengkap || 'Alamat belum diisi'}
            </div>
          </div>
        </div>
        {/* Koordinat */}
        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            margin: '16px 0 0 0',
            paddingTop: 10,
            textAlign: 'right',
            fontSize: 15,
            color: '#444',
            letterSpacing: 0.2,
          }}
        >
          {lat && lng ? `${lat}, ${lng}` : ''}
        </div>
      </Popup>
    </Marker>
  );
}

// ---------- MapDialog Component ----------

const MapDialog = ({ lat, lng, setLatLng, name, address, triggerFormChange }: MapDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const safeLat = typeof lat === 'number' ? lat : -7.797068;
  const safeLng = typeof lng === 'number' ? lng : 110.370529;

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5&addressdetails=1`,
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data: SearchResult[]) => {
          setSearchResults(data);
          setShowResults(true);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') setSearchResults([]);
        })
        .finally(() => setSearchLoading(false));
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [searchQuery]);

  const handleSearchResultSelect = (result: SearchResult) => {
    const newLat = parseFloat(result.lat);
    const newLng = parseFloat(result.lon);
    setLatLng(newLat, newLng);
    triggerFormChange?.({
      lat: newLat,
      lng: newLng,
      location: `${newLat}, ${newLng}`,
      address: result.display_name,
    });
    setSearchQuery('');
    setShowResults(false);
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setSearchResults([]);
  };

  // Komponen untuk set view ke Indonesia (Yogyakarta) saat mount
  function SetViewIndonesia() {
    const map = useMap();
    const isSet = useRef(false);

    useEffect(() => {
      if (!isSet.current) {
        map.setView([-7.797068, 110.370529], 13); // Yogyakarta
        isSet.current = true;
      }
    }, [map]);
    return null;
  }

  return (
    <div className="relative w-full h-full">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-[1000] w-80">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-white shadow-lg border border-gray-200 rounded-lg h-10 w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {searchLoading && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
            </div>
          )}
        </div>
        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                type="button"
                key={result.place_id}
                onClick={() => handleSearchResultSelect(result)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" strokeWidth="2" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {result.display_name.split(',')[0]}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{result.display_name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        {/* No results message */}
        {showResults && searchResults.length === 0 && !searchLoading && searchQuery.length > 2 && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">Tidak ada hasil ditemukan</p>
          </div>
        )}
      </div>
      {/* <div className="absolute bottom-6 right-6 z-[1000]">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center gap-2"
          onClick={() => {
            triggerFormChange?.({
              lat,
              lng,
              location: `${lat}, ${lng}`,
            });
          }}
        >
          <span>✓</span>
          <span>Pilih Lokasi</span>
        </button>
      </div> */}

      {/* Map Container */}
      <MapContainer
        center={[safeLat, safeLng]}
        zoom={16}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        scrollWheelZoom={true}
        className="rounded-xl"
        zoomControl={false}
      >
        {/* Set view ke Indonesia saat mount */}
        <SetViewIndonesia />
        {/* Layer peta */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Marker lokasi */}
        <LocationMarker
          lat={safeLat}
          lng={safeLng}
          setLatLng={setLatLng}
          name={name}
          address={address}
          triggerFormChange={triggerFormChange}
        />
        <ZoomControl />
      </MapContainer>
    </div>
  );
};

function ZoomControl() {
  const map = useMap();

  const handleZoomIn = () => {
    map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    map.setZoom(map.getZoom() - 1);
  };

  return (
    <div className="absolute top-6 right-6 z-[1000] flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 border-b border-gray-200 text-lg font-semibold"
        aria-label="Zoom in"
        onClick={handleZoomIn}
      >
        +
      </button>
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-lg font-semibold"
        aria-label="Zoom out"
        onClick={handleZoomOut}
      >
        −
      </button>
    </div>
  );
}

export default MapDialog;
