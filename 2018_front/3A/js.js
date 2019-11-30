// /** @returns string */
// function solve(inputString){
//     let find = Array.from(inputString.matchAll(/ta['’](?<name>so|ko|ta|qa|goo)\s*(?<number>\d+)/ig));

//     if(find && find.length == 1){
//         let res = find[0];

//         return `${res.groups.name} ${res.groups.number}`.toLowerCase();
//     }

//     return '0';
// }
// //Ta’gh ta’So 29 jE yin
// //^.*ta['’](?<name>so|ko|ta|qa|goo)\\s*(?<number>\\d+).*$
// setTimeout(() => {
//     console.log(solve('DUN \'Ej QAD Je pAtLh TLhOQ Ta\'ta 23 PuS WoVBe\' SICh HuD,'));
//     //console.log(solve('Ta\'gh ta\'so 23 jE yin'));
// }, 500)