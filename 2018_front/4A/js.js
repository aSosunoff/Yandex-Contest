/** @returns Array<string>|null */  
function solve(inputString){
    if(!inputString) return null;

    let spaceCode = '[GHKLMNOPQRSTU][3-8]{3}';
    
    let departamentCode = '[BT]',
    departmentSubCodeBio = '[CKMB][GJP]',
    departmentSubCodeTechno = '[ORS][J8ME]',
    depBioOrTechno = `(?:(?<=B)${departmentSubCodeBio}|${departmentSubCodeTechno})`;

    let randomNumber = '[1-9A-Y][0-9A-Y]{0,23}';
    let lineClose = 'Z';

    let validLineArr = [
        {
            validate: [spaceCode, departamentCode, depBioOrTechno, randomNumber, lineClose],
            line: [0, 1, 2, 3]
        }
    ];

    let resultArray = [];

    for(let valid of validLineArr){
        let rule = valid
            .validate
            .reduce((r, e) => { 
                return !r ? `(${e})` : `${r}(${e})` 
            }, '');

        let data = inputString.match(new RegExp(`^${rule}$`));

        if(data){
            let preArr = Array.from(data).slice(1);
            resultArray = valid.line.map(e => { return e == null ? null : preArr[e]; });
            break;
        }
    };
    
    if(resultArray.every(e => e == null))
        return null;

    return resultArray;
}

setTimeout(() => {
    test();
}, 500);

let date = [
    ['O464YR849BM182BDZ', null],
    ['G333TR81Z', ["G333","T","R8","1"],
    ['G333tR81Z', null],
    ['O464TR849BM182BDZ', ["O464", "T", "R8", "49BM182BD"]],
    ['U345BMG123456789ABCDEFZ', ["U345", "B", "MG", "123456789ABCDEF"]],]
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
                        console.log(str, '|', solving[i], res[i]);
                        break;
                    }
                }
            }

    }
}

;(function(_w){
    let testTable = new (class TestTable{
        constructor(_w){
            this._doc = _w.document;
        }
        start(){
            let body = this._doc.querySelector('body');
            body.appendChild(this.createElement('div', 'test-table'));
        }
        createElement(tagName, ...className){
            let e = this._doc.createElement(tagName);
            e.classList.add(...className);
            e.addEventListener('click', this.click.bind(this, e));
            return e;
        }
        click(e,r,t){
            debugger;
            console.log(e);
        }
    })(_w);
    testTable.start();
})(window);