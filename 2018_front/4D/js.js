/***  
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку ‘str‘  
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам  
 * @param min {number} минимальное значение ‘font-variation-settings‘ (целое число)  
 * @param max {number} максимальное значение ‘font-variation-settings‘ (целое число)  
 * @return {number | null} искомое значение ‘font-variation-settings‘ (целое число) или null, если текст вписать нельзя  
 */  
function calcFontVariationSettings(container, str, min, max) {
    if(!container) return null;

    if(!(str && str.length <= 100
        && Number.isInteger(min)
        && Number.isInteger(max)
        && min >= 0
        && max >= min))
        return null;

    const check = size => {
        container.style.setProperty('word-spacing', `${size}px`, 'important');
        const {height, width} = container.getBoundingClientRect();
        return container.scrollWidth <= width && container.scrollHeight <= height;
    };

    container.textContent = str;

    // if(!check(min)) return null;
    // if(check(max)) return max;

    // const getNewWordSpacing = (l, r) => Math.round((r + l) / 2);

    // let l = min;
    // let r = max;
    // while(l < r - 1){
    //     let m = getNewWordSpacing(l, r);

    //     if(check(m))
    //         l = m;
    //     else
    //         r = m;
    // }

    // return l;
}


calcFontVariationSettings(document.getElementById("container"), 'DEMO', 0, 150);