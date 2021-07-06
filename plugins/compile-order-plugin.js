class CompileOrderPlugin {
	#slot = 0;
	#slot_completed = -1;

	polltime = 100;

	constructor(options={}) {
		const keys = Object.keys(options);
		if (keys.includes('polltime') && options.polltime instanceof Number) {
			this.polltime = options.polltime;
		}
	}

	nextSlot(slotName=null) {
		const slot = this.#slot++;
		const self = this;

		const name = slotName || `#${slot}`;

		return {
			apply(compiler) {
				compiler.hooks.beforeRun.tapAsync(CompileOrderPlugin.PluginName, (comp, callback) => {
					const poll = () => {
						if (slot - 1 === self.#slot_completed) {
							console.log(`[${CompileOrderPlugin.PluginName}] building ${name}...`);
							callback();
						} else {
							setTimeout(poll, self.polltime);
						}
					};
					poll();
				});
				compiler.hooks.done.tap(CompileOrderPlugin.PluginName, stats => {
					self.#slot_completed++;
					console.log(`[${CompileOrderPlugin.PluginName}] finished building ${name}.`);
				});
			}
		};
	}

	apply(compiler) {
		throw new Error("Pass in the value of plugin.nextSlot(), not the plugin instance itself!");
	}
}

CompileOrderPlugin.PluginName = "CompileOrderPlugin";

module.exports = CompileOrderPlugin;