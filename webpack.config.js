const fs = require('fs');
const path = require('path');

const tests = fs.readdirSync(path.resolve(__dirname, 'tests')).filter(f => {
	const isjs = f.endsWith('.js') && !f.endsWith('.global.js');
	if (isjs) {
		return fs.lstatSync(path.resolve(__dirname, 'tests', f)).isFile();
	} else {
		return false;
	}
}).map(f => [f.substring(0, f.length - 3), `./tests/${f}`]);

const test_entry = {}

for (const test of tests) {
	test_entry[test[0]] = test[1];
}

const chainlink_config = {
	entry: './bin/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'chainlink.js',
		libraryTarget: 'commonjs'
	}
};

const test_config = {
	entry: test_entry,
	output: {
		path: path.resolve(__dirname, 'tests'),
		filename: '[name].global.js'
	},
	resolve: {
		alias: {
			chainlink: path.resolve(__dirname, 'dist', 'chainlink.js')
		}
	}
};

module.exports = [
	chainlink_config, test_config
];