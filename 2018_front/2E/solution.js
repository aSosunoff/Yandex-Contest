function getKeyboard(){
    return Array.prototype.slice.call(document.getElementsByClassName('key'));
}

function getNotes(){
    let buttons = {
        "C1": 0, "C1 sharp": 1, "D1 flat": 1,
        "D1": 2, "D1 sharp": 3, "E1 flat": 3,
        "E1": 4,
        "F1": 5, "F1 sharp": 6, "G1 flat": 6,
        "G1": 7, "G1 sharp": 8, "A1 flat": 8,
        "A1": 9, "A1 sharp": 10, "H1 flat": 10,
        "H1": 11,
        "C2": 12, "C2 sharp": 13, "D2 flat": 13,
        "D2": 14, "D2 sharp": 15, "E2 flat": 15,
        "E2": 16,
        "F2": 17, "F2 sharp": 18, "G2 flat": 18,
        "G2": 19, "G2 sharp": 20, "A2 flat": 20,
        "A2": 21, "A2 sharp": 22, "H2 flat": 22,
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

run();