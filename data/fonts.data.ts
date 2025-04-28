import localFont from "next/font/local";

const neue = localFont({
  src: "../assets/fonts/PPNeueMontreal-Regular.woff",
  variable: "--font-neue",
});

const fonts = `${neue.variable}`;

export default fonts;
