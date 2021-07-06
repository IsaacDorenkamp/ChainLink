import ChainLink from './chainlink';

import element from './element';
import { ChainError } from './errors';

class ChainWorks {
	#target = null;

	constructor(target) {
		if (typeof(target) === "string") {
			const _target = element.query(target);
			if (_target === null) {
				throw new ChainError("Cannot create ChainWorks with null render target!");
			} else {
				this.#target = _target;
			}
		} else if (target instanceof HTMLElement) {
			this.#target = target;
		} else {
			throw new TypeError("target must be a selector or an element!");
		}
	}

	render(clink) {
		if (clink instanceof ChainLink) {
			if (this.target.childNodes.length !== 0) {
				// TODO - remove all children instead? provide an option for this?
				throw new ChainError("Cannot render to a populated element!");
			}
			this.target.appendChild(clink.render());
		} else {
			throw new TypeError("must provide a ChainLink to render");
		}
	}

	get target() {
		return this.#target;
	}

	/* Returns a Promise which will resolve to a ChainWorks
	   instance once the page is loaded (even if it already is) */
	static lazy(selector) {
		if (typeof(selector) !== 'string') {
			throw new Error("lazy() expects a selector, not " + typeof(selector));
		}
		if (document.readyState === 'complete') {
			return Promise.resolve(new ChainWorks(selector));
		} else {
			return new Promise(resolve => {
				window.addEventListener('load', () => {
					resolve(new ChainWorks(selector));
				});
			});
		}
	}
}

export default ChainWorks;