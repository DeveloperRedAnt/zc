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
