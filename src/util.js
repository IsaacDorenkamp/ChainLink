export const copy_array = (array) => {
	let copied = [];
	for (const el of array) {
		copied.push(el);
	}
	return copied;
};

export const is_type = (value_or_type) => {
	return value_or_type.prototype !== undefined;
};

export const create_validator = (type) => {
	if (type === null) {
		return () => true;
	} else if (typeof(type) === "string") {
		return val => typeof(val) === type;
	} else if (type.prototype !== undefined) {
		return val => val instanceof type;
	} else {
		throw new Error(`'${type}' is not a type!`);
	}
};