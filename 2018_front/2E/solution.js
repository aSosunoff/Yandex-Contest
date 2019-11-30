function getKeyboard(){
    return Array.prototype.slice.call(document.getElementsByClassName('key'));
}

function getNotes(){
    let buttons = {
        "C1": 0, "D1 flat": 1,
        "D1": 2, "E1 flat": 3,
        "E1": 4,
        "F1": 5, "G1 flat": 6,
        "G1": 7, "A1 flat": 8,
        "A1": 9, "H1 flat": 10,
        "H1": 11,
        "C2": 12, "D2 flat": 13,
        "D2": 14, "E2 flat": 15,
        "E2": 16,
        "F2": 17, "G2 flat": 18,
        "G2": 19, "A2 flat": 20,
        "A2": 21, "H2 flat": 22,
        "H2": 23
    };

    return Array.prototype.slice.call(document.querySelectorAll('.game .target .symbol:not(.separator)'))
        .map(e => {
            let key = [e.classList[1], e.classList[2]].filter(f => f).join(' ');
            return buttons[key];
        });
}

const keyArray = getKeyboard();

const notes = getNotes();

const run = () => {
    let el = keyArray[notes.shift()];

    el.dispatchEvent(new Event('click'));
    if(notes.length)
        setTimeout(run, 100);
};

window.onload = function() {
    run();
}