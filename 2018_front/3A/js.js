/** @returns Array<string>|null */  
function solve(inputString){
    if(!inputString) return null;

    let arr = inputString.split(/\s*,\s*/);

    let _word = '[А-Я][а-я]{2,7}',
    _digit = '[0-9~§]',
    _name = 'Сёб|Рёб|Моб|Сян|Рян|Ман',
    _surname = 'Сё|Рё|Мо|Ся|Ря|Ма|Сю|Рю|Му';
    
    let _a = `^${_word}(?:[ -]${_word})?$`,
    _b = `^(?:${_digit}{3})$|^(?:${_digit}{2}-${_digit}{2})$`,
    _c = `^(?:${_surname}) (?:${_name})$`;

    let validAddress = [_a, _a, _a, _b, _c]; 
    
    let resultArray = [];

    let i = 0;
    arr.forEach(element => {
        debugger;
        while(i < 5){
            let rule = validAddress[i];
            let data = element.match(rule);
    
            if(data){
                resultArray.push(data[0]);
                i++;
                break;
            }
            resultArray.push(null);
            i++;
        }
    });
    
    if(resultArray.every(e => e == null))
        return null;

    return resultArray;
}

setTimeout(() => {
    test();
}, 500);

let date = [
    ['Старый, Оскол-Бравый, Му Рян1', ['Старый', 'Оскол-Бравый', null, null, null]],

    ['Старый Оскол, Бравый, Слон, ~2-3§, Му Рян', ['Старый Оскол', 'Бравый', 'Слон', '~2-3§', 'Му Рян']],
    ['Старый Оскол, Бравый, Слон, 12-34, Му Рян', ['Старый Оскол', 'Бравый', 'Слон', '12-34', 'Му Рян']],
    ['Старый Оскол, Бравый, Слон, ~~3, Му Рян', ['Старый Оскол', 'Бравый', 'Слон', '~~3', 'Му Рян']],
    ['Старый Оскол, Бравый, Слон, 123, Му Рян', ['Старый Оскол', 'Бравый', 'Слон', '123', 'Му Рян']],
    ['Старый Оскол, Бравый, Му Рян', ['Старый Оскол', 'Бравый', null, null, 'Му Рян']],
    ['Старый-Оскол, Бравый, Му Рян', ['Старый-Оскол', 'Бравый', null, null, 'Му Рян']],
    ['Старый, Оскол-Бравый, Му Рян', ['Старый', 'Оскол-Бравый', null, null, 'Му Рян']],
    ['Старый оскол, бр, 12345, Му Рьян Мар', null],
    ['Старыйоскол, 1-34, МуРен', null],
];

function test(){
    for([str, res] of date){
        
        let solving = solve(str);

        if(!(solving == null && res == null))
            if((solving == null && Array.isArray(res)) || (Array.isArray(solving) && res == null)){
                console.log(str);
            } else {
                for(let i = 0; i < solving.length; i++){
                    if(solving[i] !== res[i]){
                        console.log(str, solving[i], res[i]);
                        break;
                    }
                }
            }

    }
}