// dependency-cruiser.config.js
module.exports = {
	forbidden: [],
	options: {
		maxDepth: 20,
		// Only include files under the src folder
		doNotFollow: {
			path: "node_modules"
		},
		exclude: "node_modules",
		// You can also adjust the output options as needed.
	}
};
