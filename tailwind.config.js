// tailwind.config.js

module.exports = {
  content: [
   "./App.{js,jsx,ts,tsx}",
   "./app/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the app folder
   "./components/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the components folder]
   "./constans/**/*.{js,jsx,ts,tsx}" // Include all JS, JSX, TS, and TSX files in the constants folder]
 ],
   theme: {
     extend: {
       fontFamily: {
          rmono: ['Roboto-Mono', 'sans-serif'],
          pthin: ["Poppins-Thin", "sans-serif"],
          pextralight: ["Poppins-ExtraLight", "sans-serif"],
          plight: ["Poppins-Light", "sans-serif"],
          pregular: ["Poppins-Regular", "sans-serif"],
          pmedium: ["Poppins-Medium", "sans-serif"],
          psemibold: ["Poppins-SemiBold", "sans-serif"],
          pbold: ["Poppins-Bold", "sans-serif"],
          pextrabold: ["Poppins-ExtraBold", "sans-serif"],
          pblack: ["Poppins-Black", "sans-serif"],
        },
        colors: {
          primary: "#0689A5",
          secondary: "#ED8F59",
          gray: "#5E5D5E",
          dark: "#1A1A1A",
          bgWhite: "#FCFCFC"
      }
     },
   },
   plugins: [],
}