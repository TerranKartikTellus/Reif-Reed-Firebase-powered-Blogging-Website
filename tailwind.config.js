module.exports = {
  content: ["./pages/**/*.{html,js,ts,tsx}","./components/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-rev': 'spin 3s linear infinite',
      }
    }
  },
  plugins: [],
}