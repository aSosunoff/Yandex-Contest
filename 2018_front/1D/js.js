/***
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку ‘str‘
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам
 * @param min {number} минимальный размер шрифта (целое число, min >= 1)
 * @param max {number} максимальный размер шрифта (целое число, max >= min >= 1)
 * @return {number | null} искомый размер шрифта (целое число) или null, если текст вписать нельзя
 */
function calcFontSize(container, str, min, max) {
    if(!container) return null;

    if(!(str && str.length <= 100
        && Number.isInteger(min)
        && Number.isInteger(max)
        && min >= 1
        && max >= min))
        return null;

    const check = size => {
        container.style.setProperty('font-size', `${size}px`, 'important');
        const {height, width} = container.getBoundingClientRect();
        return container.scrollWidth <= width && container.scrollHeight <= height;
    };

    container.textContent = str;

    if(!check(min)) return null;
    if(check(max)) return max;

    const getNewSize = (l, r) => Math.floor((r + l) / 2);

    let l = min;
    let r = max;
    while(l < r - 1){
        debugger;
        let m = getNewSize(l, r);
        if(check(m))
            l = m;
        else
            r = m;
    }

    return l;
}

/***
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку ‘str‘
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам
 * @param min {number} минимальный размер шрифта (целое число, min >= 1)
 * @param max {number} максимальный размер шрифта (целое число, max >= min >= 1)
 * @return {number | null} искомый размер шрифта (целое число) или null, если текст вписать нельзя
 */
// function calcFontSize(container, str, min, max) {
//     const checkFit = size => {
//         container.style.setProperty('font-size', `${size}px`, 'important');
//         const {height, width} = container.getBoundingClientRect();
//         return container.scrollHeight <= height && container.scrollWidth <= width;
//     };
//     const getNewSize = (min, max) => Math.round((max + min) / 2);
//
//     container.textContent = str;
//     let newMin = min;
//     let newMax = max;
//     let current = getNewSize(min, max);
//     let newCurrent;
//     let size = null;
//
//     if (checkFit(max)) return max;
//     if (!checkFit(min)) return null;
//     if (!str) return null;
//
//     while (true){
//         if (checkFit(current)){
//             size = current;
//             newMin = current;
//             newCurrent = getNewSize(newMin, newMax);
//             if (current === newCurrent) break;
//             current = newCurrent;
//         } else {
//             newMax = current;
//             newCurrent = getNewSize(newMin, newMax);
//             if (current === newCurrent) break;
//             current = newCurrent;
//         }
//     }
//
//     return size;
// }


calcFontSize(document.getElementById("container"), "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", 10, 100)