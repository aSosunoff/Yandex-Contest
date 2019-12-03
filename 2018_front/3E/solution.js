// function getKeyboard(){
//     return Array.prototype.slice.call(document.getElementsByClassName('key'));
// }

function getColor() {
	let keys = document.querySelectorAll(".keys .key");
	let keysArr = Array.from(keys);
	let keyNewObjects = keysArr.map(e => {
		let backColor = getComputedStyle(e).backgroundColor;
		return {
			color: backColor,
			el: e
		};
	});

	let keysColorIdentity = keyNewObjects
		.filter(f => { 
			return keyNewObjects
				.filter(ff => f.color == ff.color).length == 1; 
			})[0];

	return keysColorIdentity ? keysColorIdentity.el : undefined;
}

const run = () => {
    const colorElement = getColor();
	if (colorElement){
		colorElement.dispatchEvent(new Event("click"));
		setTimeout(run, 100);
	}
};

run();
