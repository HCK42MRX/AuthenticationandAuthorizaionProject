/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'image-authentication': "url('./src/assets/images/bg-header-odoo.jpg')"
			},
			fontFamily: {
				Poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui')]
}
