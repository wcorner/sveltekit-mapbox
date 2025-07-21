const postcssJitProps = require('postcss-jit-props');
const openProps = require('open-props');

module.exports = {
	plugins: [postcssJitProps(openProps)]
};
