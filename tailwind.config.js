/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens:{
xs:'320px'
      },
      colors: {
        primary1: "#004054",
        primary2: "#00CBFE",
        secondary: "#D3CFC9",
        yellow:"#F7E135", 
        neutral: {                    
          white: '#ffffff',
          gray: '#666666',           
          black: '#000000',        
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

