// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./ui/**/*.{js,jsx}", // Add shadcn/ui components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
