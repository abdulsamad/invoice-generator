module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,js,html,webmanifest,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};