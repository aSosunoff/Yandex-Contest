function getKeyboard(){
    return Array.from(document.getElementsByClassName('key'))
        .reduce((r, e) => {
            let n = getComputedStyle(e, ':before')
                    .content
                    .replace(/"/g,''),
                k = null;
            switch (n) {
                case 'call': k = 9; break;
                case '0': k = 10; break;
                default: k = --n;
            }
            r[k] = e;
            return r;
        },{});
}

function getPhoneNumber(){
    let buttons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "call", "zero"];
    return Array.prototype.slice.call(document.querySelectorAll('.game .target .symbol:not(.separator)'))
        .map(e => {
            return buttons.indexOf(e.classList[1]);
        });
}

let keyArray = getKeyboard();

let phones = getPhoneNumber()

const call = () => {
    let event = new Event('click');
    keyArray[phones.shift()].dispatchEvent(event);
    if(phones.length)
        setTimeout(call, 100);
};

call();