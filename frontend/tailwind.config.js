/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			fontFamily: {
				dmserif: ["DM Serif Display", "serif"],
				arvo: ["Arvo", "serif"],
			},
			colors: {
				news: "#ab0613",
				"news-text": "#fff4f2",
				opinion: "#bd5318",
				"opinion-text": "#fef9f5",
				sport: "#005689",
				"sport-text": "#f1f8fc",
				lifestyle: "#7d0068",
				"lifestyle-text": "#feeef7",
			},
		},
	},
	plugins: [],
};
