/***
 * @param container {Node} ссылка на DOM-node контейнера
 * @param str {string} строка с текстом предупреждения
 * @param min {number} минимальное значение letter-spacing (целое число)
 * @param max {number} максимальное значение letter-spacing (целое число)
 * @return {number} значение letter-spacing (целое число, px) или null, если поместить предупреждение не удаётся
 */
function getLetterSpacing (container, str, min, max) {
    if(!container) return null;

    if(!(str && str.length <= 100
        && Number.isInteger(min)
        && Number.isInteger(max)
        && max >= min))
        return null;

    const check = size => {
        container.style.setProperty('letter-spacing', `${size}px`, 'important');
        const {height, width} = container.getBoundingClientRect();
        return container.scrollWidth <= width && container.scrollHeight <= height;
    };

    container.textContent = str;

    if(!check(min)) return null;
    if(check(max)) return max;

    const getNewLetterSpacing = (l, r) => Math.round((r + l) / 2);

    let l = min;
    let r = max;
    while(l < r - 1){
        let m = getNewLetterSpacing(l, r);

        if(check(m))
            l = m;
        else
            r = m;
    }

    return l;
}


getLetterSpacing (document.getElementById("container"), "ПРОГРАММИРОВАНИЕ НА JS МОЖЕТ БЫТЬ ОПАСНО ДЛЯ ЗДОРОВЬЯ", 5, 20)