function getElements() {
	let keys = document.querySelectorAll(".keys .key");
	let keysArr = Array.from(keys);
	let keyNewObjects = keysArr.map(e => {
		let content = getComputedStyle(e, ':before').content;
		return {
			content,
			el: e
		};
	});

	return keyNewObjects;
}

function isClick(key){
	let symbols = document.querySelectorAll(".target .symbol:not(.separator)");
	let symbolsArr = Array.from(symbols);
	let symbolsNewObjects = symbolsArr.map(e => {
		let content = getComputedStyle(e, ':before').content;
		return content;
	});
	
	return symbolsNewObjects.filter(f => f == key).length > 1;
}

const elements = getElements();

const run = (index = 0) => {
	if(index == elements.length) return;
	
	let {content, el} = elements[index];

	if(isClick(content))
		el.dispatchEvent(new Event("click"));

	setTimeout(run, 1000, ++index);
};

run();
