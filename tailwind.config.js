/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,tsx,mdx}",
    "./pages/**/*.{js,jsx,tsx,mdx}",
    "./components/**/*.{js,jsx,tsx,mdx}",
    
    // If you have a src directory:
    "./src/**/*.{js,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions can go here
      colors: {
        // Add custom colors if needed
        'brand-blue': '#3b82f6',
      },
      fontFamily: {
        // Custom font families
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}