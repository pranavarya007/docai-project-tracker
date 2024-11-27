/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    images: {
      unoptimized: true // Required for static export
    },
    basePath: process.env.NODE_ENV === 'production' ? '/[REPO-NAME]' : '',
  }
  
  module.exports = nextConfig