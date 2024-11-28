
module.exports = {
  content: [
   "./App.{js,jsx,ts,tsx}",
   "./app/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the app folder
   "./components/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the components folder]
   "./constants/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the constants folder]
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
        textGray:"#858889",
        textWhite:"#FCFCFC",
        primaryDark: "#303A3D",
        secondaryDark: "#9B420E",
        primaryLight: "#C5DDE2",
        secondaryLight: "#F3D8C9",
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
        //Opacity70
        white70: "rgba(252, 252, 252, 0.7)"
    }
    },
  },
   plugins: [],
}