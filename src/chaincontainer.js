import ChainLink from './chainlink';
import { ChainError, NotImplementedError } from './errors';

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
				return this;
			} else {
				throw new ChainError("No context to call with() on!");
			}
		} else if (!fn) {
			const _with = this.#with;
			this.#with = null;
			return _with;
		} else {
			throw new TypeError("fn must be a function!");
		}
	}

	add(child) {
		if (child instanceof ChainLink) {
			this.#children.push(child);
			this.#with = child;
			this.mount(child);
			return this;
		} else {
			throw new TypeError("type of child must be a subclass of ChainLink!");
		}
	}

	remove(child) {
		const idx = this.#children.includes(child);
		if (idx >= 0) {
			this.#children.splice(idx, 1);
			this.#with = null;
			this.dismount(child);
			return this;
		} else {
			throw new ChainError(`No such child '${child}'`);
		}
	}

	get $children() {
		return copy_array(this.#children);
	}

	// -- Abstract Methods --
	mount(child) {
		throw new NotImplementedError();
	}
	dismount(child) {
		throw new NotImplementedError();
	}
}

export default ChainContainer;