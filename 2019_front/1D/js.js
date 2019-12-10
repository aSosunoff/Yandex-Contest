function solution(input){
	if(input.length == 0) return '';
    let table = new DOMParser().parseFromString(input, 'text/html').body.childNodes[0];
    if(table.tagName != 'TABLE') return '';

    let resultObject = {
        line: []
    };

    const AL_LEFT = 'left',
        AL_CENTER = 'center',
        AL_RIGHT = 'right';

    const addedElement = (nameTag) => {
        let el = table.getElementsByTagName(nameTag);
        if(!el.length) return;
        let trs = el[0].getElementsByTagName('tr');
        for(let i = 0; i < trs.length; i++){
            resultObject['line'].push([]);
            let child = trs[i].children;
            for(let valueChild of child){
                let item = {};
                item[valueChild.tagName] = valueChild.innerHTML;
                resultObject['line'][resultObject['line'].length - 1].push(item);
            }
        }
    };

    let colgroup = table.getElementsByTagName('colgroup');
    if(colgroup.length){
        resultObject['colgroup'] = [];
        let col = colgroup[0].getElementsByTagName('col');
        for(let i = 0; i < col.length; i++){
            let align = col[i].getAttribute('align');
            align = align ? align.toLowerCase() : '';
            resultObject['colgroup'].push(align);
        }
    }

    for(let i = 0; i < table.children.length; i++){
        switch (table.children[i].tagName) {
            case 'THEAD': addedElement('thead'); break;
            case 'TBODY': addedElement('tbody'); break;
        }
    }

    const getVal = (key, val) => {
        let separator = '';
        switch (key) {
            case 'TD': separator = ''; break;
            case 'TH': separator = '**'; break;
        }

        val = val.trim().replace(/\s{2,}/g, ' ');

        return `${separator}${val}${separator}`;
    };

    const print = (line) => {
        for(let i = 0; i < line.length; i++){
            let [key, val] = Object.entries(line[i])[0];
            resultStr += `| ${getVal(key, val)} `;
        }
        resultStr += '|\n';
    }

    let resultStr = '';

    print(resultObject.line[0]);

    if('colgroup' in resultObject){
        resultObject.colgroup.forEach((e, index) => {
            if(index in resultObject.colgroup){
                let align = resultObject.colgroup[index];
                let str = '';
                switch (align) {
                    case AL_LEFT: str = `:---`; break;
                    case AL_CENTER: str = `:---:`; break;
                    case AL_RIGHT: str = `---:`;break;
                    default: str = `:---`;
                }
                resultStr += `| ${str} `;
            }
        });
        resultStr += '|\n';
    } else {
        let w = resultObject.line[0].length;
        while(w){
            resultStr += '| :--- ';
            w--;
        }
        resultStr += '|\n';
    };

    for(let i = 1; i < resultObject.line.length; i++)
        print(resultObject.line[i]);


    return resultStr.substr(0, resultStr.length-1);
}