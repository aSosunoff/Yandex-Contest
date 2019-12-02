/***  
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку ‘str‘  
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам  
 * @param min {number} минимальный размер свойства word-spacing (целое число)  
 * @param max {number} максимальный размер свойства word-spacing (целое число)  
 * @return {number | null} вычисленный размер свойства word-spacing (целое число) или null, если вписать нельзя  
 */ 
function computeWordSpacing (container, str, min, max) {
    // if(!container) return null;

    // if(!(str && str.length <= 100
    //     && Number.isInteger(min)
    //     && Number.isInteger(max)
    //     && max >= min))
    //     return null;

    // const check = size => {
    //     container.style.setProperty('letter-spacing', `${size}px`, 'important');
    //     const {height, width} = container.getBoundingClientRect();
    //     return container.scrollWidth <= width && container.scrollHeight <= height;
    // };

    // container.textContent = str;

    // if(!check(min)) return null;
    // if(check(max)) return max;

    // const getNewLetterSpacing = (l, r) => Math.round((r + l) / 2);

    // let l = min;
    // let r = max;
    // while(l < r - 1){
    //     let m = getNewLetterSpacing(l, r);

    //     if(check(m))
    //         l = m;
    //     else
    //         r = m;
    // }

    // return l;
}


computeWordSpacing (document.getElementById("container"), "lorem ipsum dolor sit amet", 10, 100)