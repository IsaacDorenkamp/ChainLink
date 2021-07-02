class NotImplementedError extends Error {
	constructor() {
		super("Not Implemented");
	}
}

class ChainError extends Error {
	constructor(message) {
		super(message);
	}
}

export {
	NotImplementedError,
	ChainError
};