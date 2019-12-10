/**  
 * Отрисовать отладочную информацию кофемашины в element  
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация  
 * @param element {HTMLDivElement} - div с фиксированным размером 300x96 пикселей,  
 *     в который будет отрисовываться баркод  
 */  
function renderBarcode(debugInfo, element) {  
    const isValidObj = (c) => {
        if(typeof c !== 'object') return false;
        if(!['id', 'code', 'message'].reduce((r, e) => { return r && e in c;}, true)) return false;
        /* check id */
        if(typeof c.id != 'string') return false;
        if(c.id.length != 10) return false;
        let regexp = new RegExp('^[a-z0-9]*$', 'i');
        if(!regexp.test(c.id)) return false;

        /* check code */
        if(typeof c.code != 'number') return false;
        if(c.code < 0 || c.code > 999) return false;

        /* check birthday */
        if(typeof c.message != 'string') return false;

        return true;
    }

    if(!isValidObj(debugInfo)) return null;

    let canvas = document.createElement('canvas');
    canvas.id = `b_${debugInfo.id}`;
    element.appendChild(canvas);

    const draw = (function(_canvas, _width, _height){
        canvas.width = _width;
        canvas.height = _height;

        let ctx = _canvas.getContext('2d');

        const createSeparator = (x) => {
            ctx.strokeStyle = "ffffff";
            let r = [4,5,4,5,4];
            let ll = _width - r.reduce((l,r) => l + r);
            r.forEach((e, i, arr) => {
                let xx = arr.slice(0, i).reduce((l, r) => l + r, 0);

                if((i + 1) % 2){
                    ctx.fillRect(xx, 0, e, canvas.height);
                    ctx.fillRect(xx + ll, 0, e, canvas.height);
                } else {
                    ctx.clearRect(xx, 0, e, canvas.height);
                    ctx.clearRect(xx + ll, 0, e, canvas.height);
                }
            });
        };

        const createRect = (b, x) => {
            if(b){
                ctx.fillRect(x, positionY * 8, 8, 8);
            } else {
                ctx.clearRect(x, positionY * 8, 8, 8);
            }
        };

        const createRectContent = (b) => {
            createRect(b, 22 + positionX * 8);
        };

        let positionX = 0,
            positionY = 0,
            arr = [];

        createSeparator();

        return {
            setContent: function(b){
                createRectContent(b);

                if(positionX == 31){
                    positionX = 0;
                    positionY++;
                } else {
                    positionX++;
                }
            },
            reset: function(){
                positionX = 0;
                positionY = 0;
                arr = [];
            }
        }
    })(canvas, 300, 96);

    debugInfo.code = debugInfo.code.toString().padStart(3, '0');
    debugInfo.message = debugInfo.message.padEnd(34, ' ');
    let line = `${debugInfo.id}${debugInfo.code}${debugInfo.message}`;


    let arr = Array.from(line)
        .map(ch => ch.charCodeAt(0));

    arr = arr.concat(arr.reduce((l,r) => l ^ r));

    let strokeAr = arr
        .map(d => d.toString('2'))
        .map(p => p.padStart(8, '0'))
        .reduce((r, e) => { r += e; return r; });


    for(let stroke of strokeAr){
        draw.setContent(stroke == 1);
    }
}