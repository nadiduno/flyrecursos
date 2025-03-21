/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary1: "#004054",
        primary2: "#00CBFE",
        secondary: "#D3CFC9",
        neutral: {                    
          white: '#ffffff',
          gray: '#666666',           
          black: '#000000'           
        },
      },
    },
  },
  plugins: [],
}

