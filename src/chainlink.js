import { NotImplementedError } from './errors';
import { is_type, create_validator } from './util';

/*
Type Definition Structure:

{
	property_with_type: [type | any],
	property_with_options: {
		type: [type | any],
		default: [default value | null]
	}
}
*/

class ChainLink {
	#dict = {};
	#dom = null;
	#events = {};

	constructor() {
		const typedef = this.__proto__.constructor.TypeDefinition;
		for(const key of Object.keys(typedef)) {

			const def = typedef[key];
			let validator = null;
			if (is_type(def) || def === null || typeof def === "string") {
				validator = create_validator(def);
			} else if (def instanceof Object) {
				const tp = def.type || null;
				validator = create_validator(tp);
				if (def.default) {
					const valid_default = validator(def.default);
					if (valid_default) {
						this.#dict[key] = def.default;
					} else {
						throw new TypeError(`Invalid type '${typeof(def.default)}' for property '${key}'`);
					}
				}
			} else {
				throw new Error("Invalid value type for type definition: " + typeof(def));
			}

			Object.defineProperty(this, key, {
				enumerable: true,
				get: () => this.#dict[key] || null,
				set: val => {
					const valid_value = validator(val);
					if (valid_value) {
						this.#dict[key] = val;
						this.updated();
					} else {
						throw new TypeError(`Invalid type '${typeof(val)}' for property '${key}'`);
					}
				}
			});
		}
	}

	use(fn) {
		if (typeof(fn) === "function") {
			fn(this);
			return this;
		} else {
			throw new TypeError("use() must be called with a function!");
		}
	}

	mounted() {}
	updated() {}
	dismounted() {}

	get _dom() {
		return this.#dom;
	}

	set _dom(to) {
		this.#dom = to;
	}

	set(prop, value) {
		this[prop] = value;
		return this;
	}

	event(evt_type, cbk) {
		if (typeof(name) !== "string" || typeof(cbk) !== "function") throw new TypeError("event must be called with an event type and a callback respectively.");
		if (Object.hasOwnProperty(this.#events, evt_type)) {
			this.#events[evt_type].push(cbk);
		} else {
			this.#events[evt_type] = [cbk];
		}
		if (this.#dom !== null) {
			this.#dom.addEventListener(evt_type, cbk);
		}
		return this;
	}

	initialize() {
		throw new NotImplementedError();
	}

	render() {
		if (this.#dom === null) {
			this.initialize();
			if (this.#dom === null) {
				throw new ChainError("initialize() must assign the _dom element!");
			}

			for (const evt_type of Object.keys(this.#events)) {
				const listeners = this.#events[evt_type];
				for (const listener of listeners) {
					this.#dom.addEventListener(evt_type, listener);
				}
			}
		}

		return this.#dom;
	}
	unrender() {
		this.#dom.remove();
		this.#dom = null;
	}
}

ChainLink.TypeDefinition = {};

export default ChainLink;