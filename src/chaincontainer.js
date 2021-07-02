import ChainLink from './chainlink';
import { ChainError } from './errors';

import { copy_array } from './util';

class ChainContainer extends ChainLink {
	#children = [];
	#with = null;

	constructor() {
		super();
	}

	with(fn) {
		if (fn instanceof Function) {
			if (this.#with !== null) {
				fn(this.#with);
			} else {
				throw new ChainError("No context to call with() on!");
			}
		} else {
			throw new TypeError("fn must be a function!");
		}
	}

	add(child) {
		if (child instanceof ChainLink) {
			this.#children.push(child);
			this.#with = child;
		} else {
			throw new TypeError("type of child must be a subclass of ChainLink!");
		}
	}

	remove(child) {
		const idx = this.#children.includes(child);
		if (idx >= 0) {
			this.#children.splice(idx, 1);
			this.#with = null;
		} else {
			throw new ChainError(`No such child '${child}'`);
		}
	}

	get $children() {
		return copy_array(this.#children);
	}
}

export default ChainContainer;