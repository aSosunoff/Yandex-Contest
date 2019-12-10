/**
 *
 * @param {String} imageSrc - base64 картинки, например ’data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...’
 * @returns {Promise}
 */
function traceImage(imageSrc) {
    return new Promise((resolve) => {
        let can = document.createElement('canvas'),
            c = can.getContext('2d'),
            img = new Image();

        img.onload = function(){
            let start = null;
            let finish = null;
            let colors = null;

            c.drawImage(img, 0, 0, img.width, img.height);
            for(let i = 0; i < img.height; i++){
                for(let j = 0; j < img.width; j++){
                    let pixel = c.getImageData(i, j, 1, 1);
                    let data = pixel.data;
                    if (data.reduce((r, e) => { return r || (e !== 255)}, false) && data.reduce((r, e) => { return r || (e !== 0)}, false)){
                        if (!start)
                            start = [i, j];
                        colors = [...data];
                        finish = [i, j];
                    }
                }
            }
// зарезолвить промису
            resolve(`
<div>
<div style="
position: absolute;
width: ${finish[0] - start[0] + 1}px;
height: ${finish[1] - start[1] + 1}px;
top: ${start[1]}px;
left: ${start[0]}px;
background-color: rgb(${colors[0]}, ${colors[1]}, ${colors[2]});
">
</div>
</div>
`)
        };

        img.src = imageSrc;
    });
}