/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
]);
module.exports = withTM();
