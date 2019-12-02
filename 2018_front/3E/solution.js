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

	let keysColorIdentity = keyNewObjects.reduce((r, e) => {
		if (!r.length) return [e];

		return r.map(m => m.color).includes(e.color) ? r : [...r, e];
	}, []);

	let table = document.querySelectorAll(".keys")[0];

	return {
		nameTable: table.classList[1],
		keysColorIdentity
	};
}

const manager = (function() {
    let _keysColorIdentity = {};
    
	const _clear = color => {
		for (let [key, value] of Object.entries(_keysColorIdentity)) {
            let _newColors = value
                .reduce((r, e) => {
                    return e.color != color ? [...r, e] : [...r];
                }, []);
                
            _keysColorIdentity[key] = _newColors;
		}
    };
    
	return {
		getColor: keysColorIdentity => {
			if (!(keysColorIdentity.nameTable in _keysColorIdentity)) {
				_keysColorIdentity[keysColorIdentity.nameTable] = keysColorIdentity.keysColorIdentity;
			}

			let color = _keysColorIdentity[keysColorIdentity.nameTable].pop();
			_clear(color);
			return color;
		}
	};
})();

let d = [];

const run = () => {
    const keysColorIdentity = manager.getColor(getColor());
    d.push(keysColorIdentity.color);
	debugger;
	keysColorIdentity.el.dispatchEvent(new Event("click"));
	//if (notes.length)
	setTimeout(run, 1000);
};

run();
