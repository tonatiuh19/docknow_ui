/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n,
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
};

module.exports = nextConfig;
