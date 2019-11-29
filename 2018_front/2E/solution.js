function getKeyboard(){
    return Array.from(document.getElementsByClassName('key'));
}

function getNotes(){
    let buttons = [
        "C1", "D1 flat",
        "D1", "E1 flat",
        "E1",
        "F1", "G1 flat",
        "G1", "A1 flat",
        "A1", "H1 flat",
        "H1",
        "C2", "D2 flat",
        "D2", "E2 flat",
        "E2",
        "F2", "G2 flat",
        "G2", "A2 flat",
        "A2", "H2 flat",
        "H2"];
    return Array.from(document.querySelectorAll('.game .target .symbol:not(.separator)'))
        .map(e => {
            let key = [e.classList[1], e.classList[2]].filter(f => f).join(' ');
            return buttons.indexOf(key);
        });
}

let keyArray = getKeyboard();

let notes = getNotes();

let event = new Event('click');

const run = () => {
    let el = keyArray[notes.shift()];

    el.dispatchEvent(event);
    if(notes.length)
        setTimeout(run, 100);
};

run();