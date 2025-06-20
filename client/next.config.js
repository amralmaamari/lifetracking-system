/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   typescript: {
    ignoreBuildErrors: true, // ✅ هذا يعطّل فحص TypeScript وقت البناء
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ يعطّل ESLint وقت البناء
  },
};

module.exports = nextConfig;
