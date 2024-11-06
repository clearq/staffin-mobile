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
          textGray: "#8E8E93",
          dark: "#1A1A1A",
          bgWhite: "#FCFCFC",
          borderColor: "#B4BEC0",
          // Error
          errorTitle: "#991b1b",
          errorText: "#b91c1c",
          error: "#f87171",
          errorBg: "#fef2f2",
          // Success
          successTitle: "#166534",
          successText: "#15803d",
          success: "#4ade80",
          successBg: "#f0fdf4",
          // Warning
          warningTitle: "#854d0e",
          warningText: "#a26206",
          warning: "#facc15",
          warningBg: "#fefce8",
      }
     },
   },
   plugins: [],
}