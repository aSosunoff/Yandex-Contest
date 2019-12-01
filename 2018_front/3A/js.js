/** @returns Array<string>|null */  
function solve(inputString){
    let arr = inputString.split(', ');

    let _word = '[А-Я][а-я]{2,7}',
    _digit = '[0-9~$]',
    _name = 'Сёб|Рёб|Моб|Сян|Рян|Ман',
    _surname = 'Сё|Рё|Мо|Ся|Ря|Ма|Сю|Рю|Му';
    
    let _a = `^${_word}(?:[ -]${_word})?$`,
    _b = `^(?:${_digit}{3})$|^(?:${_digit}{2}-${_digit}{2})$`,
    _c = `^(?:${_surname}) (?:${_name})?`;

    let validAddress = [_a, _a, _a, _b, _c]; 
    
    let resultArray = [];

    let i = 0;
    arr.forEach(element => {
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
    //console.log(solve('Старый Оскол, Бравый, Слон, 12-34, Му Рян'));
    //console.log(solve('Старый Оскол, Бравый, Слон, 123, Му Рян'));
    //console.log(solve('Старый Оскол, Бравый, Му Рян'));
    //console.log(solve('Старый Оскол, Бравый, Му Рян'));
    //console.log(solve('Старый, Оскол-Бравый, Му Рян'));
    console.log(solve('Старый оскол, бр, 12345, Му Рьян Мар'));
}, 500)