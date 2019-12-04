function getKeyboard(){
    return Array.prototype.slice.call(document.getElementsByClassName('key'));
}

function getNotes(){
    let notes = Array.prototype.slice.call(document.querySelectorAll('.game .target .symbol:not(.separator)'));

    let notesGlobal = {
        1: {
            'C': { '': 0, '♯': 1, '♭': -1 },
            'D': { '': 2, '♯': 3, '♭': 1 },
            'E': { '': 4, '♯': 5, '♭': 3 },
            'F': { '': 5, '♯': 6, '♭': 4 },
            'G': { '': 7, '♯': 8, '♭': 6 },
            'A': { '': 9, '♯': 10, '♭': 8 },
            'H': { '': 11, '♯': 12, '♭': 10 },
        },
        2: {
            'C': { '': 12, '♯': 13, '♭': 11 },
            'D': { '': 14, '♯': 15, '♭': 13 },
            'E': { '': 16, '♯': 17, '♭': 15 },
            'F': { '': 17, '♯': 18, '♭': 16 },
            'G': { '': 19, '♯': 20, '♭': 18 },
            'A': { '': 21, '♯': 22, '♭': 20 },
            'H': { '': 23, '♯': 24, '♭': 22 },
        }
        
    };

    return notes
        .map(e => {
            let [noteName, octave] = e.classList[1].split('');
            let sign = getComputedStyle(e, ':before').content;
            sign = sign.replace(/"/g, '');
            return notesGlobal[octave][noteName][sign];
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