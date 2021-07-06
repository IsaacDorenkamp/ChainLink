const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompileOrderPlugin = require('./plugins/compile-order-plugin');

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

const order_plugin = new CompileOrderPlugin();

const chainlink_config = {
	entry: './bin/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'chainworks.js',
		libraryTarget: 'commonjs'
	},
	plugins: [order_plugin.nextSlot('library')]
};

const test_config = {
	entry: test_entry,
	output: {
		path: path.resolve(__dirname, 'tests'),
		filename: '[name].global.js'
	},
	resolve: {
		alias: {
			chainworks: path.resolve(__dirname, 'dist', 'chainworks.js')
		}
	},
	plugins: [order_plugin.nextSlot('tests'), ...tests.map(([test_name, _]) => {
		const scr = `./tests/${test_name}.global.js`;
		return new HtmlWebpackPlugin({
			template: './html/template.html',
			templateParameters: {
				test: test_name
			},
			filename: path.resolve(__dirname, `tests/html/${test_name}.html`),
			chunks: [test_name]
		});
	})]
};

const _export = [
	test_config, chainlink_config
];

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		chainlink_config.optimization = {
			minimize: false
		};
		test_config.optimization = {
			minimize: false
		};
	}

	return _export;
};