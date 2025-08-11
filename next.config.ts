import { execSync } from 'child_process';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

import './src/libs/Env';

// Get commit hash and version info
let commitHash = 'dev';
let appVersion = '0.1.2';

try {
  // Get the short commit hash
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  // Get version from package.json
  const packageJson = require('./package.json');
  appVersion = packageJson.version;
} catch (_error) {
  console.warn('Could not retrieve git info, using fallback values');
}

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: appVersion,
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false, // Use true if this should be a permanent redirect (308)
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // Nonaktifkan ESLint bawaan Next.js saat build
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com'],
    // Add more domains if you use external images
  },
  compress: true, // Enable gzip compression for assets
  productionBrowserSourceMaps: false, // Disable source maps in production for faster deploys
  // Enhanced bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunks for better performance
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Reports feature chunk
            reports: {
              name: 'reports',
              test: /[\\/]modules[\\/]reports[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Products feature chunk
            products: {
              name: 'products',
              test: /[\\/]modules[\\/]product/,
              chunks: 'all',
              priority: 30,
            },
            // Auth feature chunk
            auth: {
              name: 'auth',
              test: /[\\/]modules[\\/]auth[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Devices feature chunk
            devices: {
              name: 'devices',
              test: /[\\/]modules[\\/]devices[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Master data feature chunk
            masterData: {
              name: 'master-data',
              test: /[\\/]modules[\\/]master-data[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Member feature chunk
            member: {
              name: 'member',
              test: /[\\/]modules[\\/]member[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Organization feature chunk
            organization: {
              name: 'organization',
              test: /[\\/]modules[\\/]organization[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Packages feature chunk
            packages: {
              name: 'packages',
              test: /[\\/]modules[\\/]packages[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Voucher feature chunk
            voucher: {
              name: 'voucher',
              test: /[\\/]modules[\\/]voucher[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Profile feature chunk
            profile: {
              name: 'profile',
              test: /[\\/]modules[\\/]profile[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Stock opname feature chunk
            stockOpname: {
              name: 'stock-opname',
              test: /[\\/]modules[\\/]stock-opname[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Store feature chunk
            store: {
              name: 'store',
              test: /[\\/]modules[\\/]store[\\/]/,
              chunks: 'all',
              priority: 30,
            },
          },
        },
      };
    }
    return config;
  },
  // Not using path-based i18n to avoid path prefixes
};

let configWithPlugins = baseConfig;

// Conditionally enable bundle analysis
if (process.env.ANALYZE === 'true') {
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);
}

// Sentry configuration has been removed

const nextConfig = configWithPlugins;
export default nextConfig;
