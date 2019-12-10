module.exports = function(input){
	let mod;
		let elem;
		const regex = /[^a-z]{1,}/g;
		const match = input.match(regex);
	debugger;
		if (match.length === 2){
	// если два совпадения, то первый это mod а второй - elem
			return `{
		mod: "${match[0]}",
		elem: "${match[1]}"
	}`;
		} else {
	// иначе смотрим, какой уникален
			const likeFirst = match.filter(el => el === match[0]);
			const notLikeFirst = match.filter(el => el !== match[0]);
	
			if (likeFirst.length > 1){
	// первый - mod
				mod = likeFirst[0];
				elem = notLikeFirst[0];
			} else {
	// первый - elem
				elem = likeFirst[0];
				mod = notLikeFirst[0]
			}
		}
	
		return `{
		mod: "${mod}",
		elem: "${elem}"
	}`;
	}