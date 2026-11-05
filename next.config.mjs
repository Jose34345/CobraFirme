/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sitio estático: no requiere servidores, base de datos ni secretos.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  ...(process.env.GITHUB_PAGES === 'true'
    ? { basePath: '/CobraFirme', assetPrefix: '/CobraFirme/' }
    : {}),
};
export default nextConfig;
