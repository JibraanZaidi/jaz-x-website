/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Required for @react-three/fiber / drei: the three.js ecosystem ships
  // untranspiled ESM add-ons that Next.js needs to run through its compiler.
  transpilePackages: ["three"],
};

module.exports = nextConfig;
