module.exports = {
  purge: ['./src/**/*.{html,ts}'
    ,
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite/**/*.js"
]
}
