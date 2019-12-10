function findLatestWeight(weights) {
	let sorted = weights.sort((a,b)=> -a + b);
	let delta = 0;

	sorted.forEach(el => {
		if (delta >= 0){
			delta = delta - el;
		} else {
			delta = delta + el;
		}
	});

	delta = Math.abs(delta);

	return delta;
}

module.exports = findLatestWeight;