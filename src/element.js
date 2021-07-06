function create(type, props={}) {
	const el = document.createElement(type);

	for (const key of Object.keys(props)) {
		if (key.startsWith('on')) {
			// event listener
			const evt_type = key.substring(2);
			el.addEventListener(evt_type, props[key]);
		} else {
			el.setAttribute(key, props[key]);
		}
	}

	return el;
}

function query(selector) {
	return document.querySelector(selector);
}

export {
	create,
	query
};

export default {
	create,
	query
};