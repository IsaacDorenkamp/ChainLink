import { NotImplementedError } from './errors';

class ChainLink {
	constructor() {}

	initialized() {}
	mounted() {}
	updated() {}
	dismounted() {}

	render() {
		throw new NotImplementedError();
	}
}

export default ChainLink;