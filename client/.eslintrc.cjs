module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard',
		'plugin:react/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: [
				'.eslintrc.{js,cjs}'
			],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'react/prop-types': 'off'
	}
}
