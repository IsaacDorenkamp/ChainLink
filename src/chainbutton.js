import ChainLink from './chainlink';

import element from './element';

class ChainButton extends ChainLink {
	constructor(text) {
		super();
	}

	initialize() {
		if (this._dom === null) {
			this._dom = element.create('button');
			this._dom.innerText = this.text;
		}

		return this._dom;
	}

	updated() {
		if (this._dom) {
			this._dom.innerText = this.text;
		}
	}
}

ChainButton.TypeDefinition = {
	text: "string"
};

export default ChainButton;