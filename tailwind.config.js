/** @type {import('tailwindcss').Config} */
module.exports = {
 
  /**Configure template paths */
  content: ["./src/**/*.{html,js,jsx,css}"],

   
  theme: {
    // colors: {
    //   'grent': '#39edb8"',
    // },

    /**this where responsiveness will be handled customizing breakpoints*/
    screens: {
      xs: "480px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    /**The back-ground image will be accessed directly. e.g bg-image will refer to 'img' its specific path. */
    extend: {
      backgroundImage:{
        'bg-image':'url("./file-path/img")',
      },

      //this will be our global colors
      colors: {
        appColor: "yellow", 
        bgColor: "#e5e7eb", 
        dangerColor: '#ef4444',
      },
      /**Fonts  */
      fontFace: {
        'fontawesome': {
          'fontFamily': 'Font Awesome',
          'src': 'url(/fonts/font-awesome/fonts/fontawesome-webfont.woff) format("woff")',
          'fontStyle': 'normal',
          'fontWeight': 'normal',
          'fontDisplay': 'auto',
        }
      },
      
    },
  },
  plugins: [],
}
