import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

import './src/libs/Env';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  eslint: {
    dirs: ['.'],
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
