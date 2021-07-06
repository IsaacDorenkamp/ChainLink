import { ChainError } from './errors';
import ChainContainer from './chaincontainer';

import element from './element';

class ChainPanel extends ChainContainer {
	#dom = null;

	constructor() {
		super();
	}

	render() {
		if (this.#dom === null) {
			this.#dom = element.create('div');
		}

		return this.#dom;
	}

	unrender() {
		this.#dom.remove();
		this.#dom = null;
	}

	mount(child) {
		if (this.#dom === null) {
			throw new ChainError("Cannot mount to a panel that has not been rendered!");
		} else {
			const dom_element = child.render();
			this.#dom.appendChild(dom_element);
			child.mounted();
			this.updated(); // No-op?
		}
	}

	dismount(child) {
		if (this.#dom === null) {
			throw new ChainError("Cannot dismount from a panel that has not been rendered!");
		} else {
			child.unrender();
			child.dismounted();
			this.updated(); // No-op?
		}
	}
}

export default ChainPanel;