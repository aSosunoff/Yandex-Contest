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

    let { width, height } = container.getBoundingClientRect();

    const check = size => {
        container.style.setProperty('font-size', `${size}px`, 'important');
        return container.scrollWidth <= width && container.scrollHeight <= height;
    };

    container.textContent = str;

    if(!check(min)) return null;
    if(check(max)) return max;

    let l = min;
    let r = max;
    while(l < r - 1){
        debugger;
        let m = Math.floor((l + r) / 2);
        if(check(m))
            l = m;
        else
            r = m;
    }

    return l;
}

calcFontSize(document.getElementById("container"), "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", 10, 100)