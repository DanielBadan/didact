const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name != "children";
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

function updateDomProperties(dom, prevProps, nextProps) {
	// Remove event listeners
	Object.keys(prevProps)
		.filter(isEvent)
		.forEach(name => {
			const eventType = name.toLowerCase().substring(2);
			dom.removeEventListener(eventType, prevProps[name]);
		});

	// Remove attributes
	Object.keys(prevProps)
		.filter(isAttribute)
		.filter(isGone(prevProps, nextProps))
		.forEach(name => {
			dom[name] = null;
		});

	// Set attributes
	Object.keys(nextProps)
		.filter(isAttribute)
		.filter(isNew(prevProps, nextProps))
		.forEach(name => {
			dom[name] = nextProps[name];
		});

	// Set style
	prevProps.style = prevProps.style || {};
	nextProps.style = nextProps.style || {};
	Object.keys(nextProps.style)
		.filter(isNew(prevProps.style, nextProps.style))
		.forEach(key => {
			dom.style[key] = nextProps.style[key];
		});
	Object.keys(prevProps.style)
		.filter(isGone(prevProps.style, nextProps.style))
		.forEach(key => {
			dom.style[key] = "";
		});

	// Add event listeners
	Object.keys(nextProps)
		.filter(isEvent)
		.filter(isNew(prevProps, nextProps))
		.forEach(name => {
			const eventType = name.toLowerCase().substring(2);
			dom.addEventListener(eventType, nextProps[name]);
		});
}