function findLatestWeight(weights) {
	let sorted = weights.sort((a,b) => -a + b);
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

function findLatestWeight3(weights) {
	if(!weights.length) return 0;

	let i = weights.length - 1;

	while(i != 0){
		weights.sort((a, b) => a - b);
		debugger;
		if(weights[i] === weights[i - 1]){
			let count = weights.filter(f => f === weights[i]).length;
			if(count % 2 == 0)
				weights.splice(-count);
			else
				weights.splice(-(--count));
		} else {
			weights[i - 1] = weights[i] - weights[i - 1];
			weights.splice(-1);
		}

		if(!weights.length) return 0;

		i = weights.length - 1;
	}

	return weights[i];
}

var findLatestWeight2 = function(weights, i = weights.length - 1) {
	const cur = weights.length - 1 === i;  
   
	if (i === 0) return weights[0];  
   
	weights.sort((a, b) => a - b);  
	weights[i - 1] = (weights[i] === weights[i-1]) ? 0 : weights[i] - weights[i-1];  
   
	return findLatestWeight2(weights, i - 1);  
  }


function test(q){
	console.log(findLatestWeight2(q.slice()), findLatestWeight(q.slice()), findLatestWeight3(q.slice()));
}
//[1,2,-3,-4,0,-1,-1,1,1,10,0]
//test([2,7,4,1,8,1,2,43,2,1,0,2,1,2,7,4,1,8,1,2,43,2,1,0,2,1,2,-2,-2])
//test([-1,8,-3])
//console.log(findLatestWeight([2,7,4,1,8,1]));