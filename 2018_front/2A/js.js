/** @returns string */
function solve(inputString){
    let regexp = new RegExp("^.*ta'(?<name>so|ko|ta|qa|goo)\\s*(?<date>\\d+).*$", "i");

    if(regexp.test(inputString)){
        let res = regexp.exec(inputString);
        return `${res.groups.name.toLowerCase()} ${res.groups.date}`;
    }

    return '0';
}

setTimeout(() => {
    console.log(solve('DUN \'Ej QAD Je pAtLh TLhOQ Ta\'ta 494 PuS WoVBe\' SICh HuD,'));
    //console.log(solve('Ta\'gh ta\'so 23 jE yin'));
}, 500)