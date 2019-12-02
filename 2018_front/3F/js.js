function detour(top, strategy){
    let queue = [],
        queueVisit = new Set();

    queue.push(top);

    while (queue.length){
        let item = queue.shift();

        strategy[item.type](item, (e) => {
            if(!e) return;

            for(let i of [].concat(e))
                if(!queueVisit.has(i))
                    queue.push(i);
        });

        queueVisit.add(item);
    }

    let line = Array.from(queueVisit);

    return Object.keys(strategy).map(m => {
        return line.filter(f => f.type == m);
    });
}

const sort = (nameField) => {
    return (a, b) => a[nameField] < b[nameField] ? -1 : (a[nameField] == b[nameField] ? 0 : 1); 
};

const getPackageArr = (data) => {
    data.deps = data.deps.sort(sort('name'));
    data.requiredBy = data.requiredBy.sort(sort('name'));
    return data;
};

const getLine = (data) => `${
    data.name
}${
    data.maintainer ? `, @${data.maintainer.name}` : ''
}${
    data.deps.length ? `; использует: ${data.deps.map(m => m.name).join(' ')}` : ''
}`;

const renderPackage = (datas) => {
    let r = '';
    for(let data of datas){
        r += `\n- ${getLine(data)}`;
    }
    return r;
}

const renderUser = (datas) => {
    let r = '';
    for(let data of datas){
        r += `\n- ${data.name}`;
        r += `${data.maintaining.map(m => `\n  * ${m.name}`).join('')}`;
    }
    return r;
}


/**
 * @param {Package|User} data - последний измененный объект в памяти,
 * из которого нужно восстановить все возможные данные  (Package или User)
 * @return {string}
 */
function getMarkdown(data){
    if(!data) return '';
    
    let [user, package] = detour(data, {
        user: (e, fn) => {
            fn(e.maintaining);
        },
        package: (e, fn) => {
            fn(e.maintainer);
            fn(e.deps);
            fn(e.requiredBy);
        }
    });
    
    user = user.sort(sort('name')).map(g => {
        g.maintaining = g.maintaining.sort(sort('name')).map(getPackageArr);
        return g;
    });

    package = package
        .sort(sort('name'))
        .map(getPackageArr);

    let result = '';

    if(package.length)
        result += `## Пакеты\n${renderPackage(package)}`;
    
    if(package.length && user.length)
        result += `\n\n`;

    if(user.length)
        result += `## Пользователи\n${renderUser(user)}`;

    return result;
}

// мейнтейнеры в памяти
const User1 = { type: 'user', name: 'tj', maintaining: [] };
const User2 = { type: 'user', name: 'dougwilson', maintaining: [] };
const User3 = { type: 'user', name: 'nzakas', maintaining: [] };

// Пакеты с мейнтейнерами
const Package1 = { type: 'package', name: 'express', maintainer: User1, deps: [], requiredBy: [] };
const Package2 = { type: 'package', name: 'body-parser', maintainer: User2, deps: [], requiredBy: [] };
const Package3 = { type: 'package', name: 'eslint', maintainer: User3, deps: [], requiredBy: [] };
const Package4 = { type: 'package', name: 'leftpad', maintainer: null, deps: [], requiredBy: [] };

User1.maintaining.push(Package1);
User2.maintaining.push(Package2);
User3.maintaining.push(Package3);

// Все используют eslint
Package1.deps.push(Package3);
Package2.deps.push(Package3);
Package3.requiredBy.push(Package1, Package2);

// Первый пакет использует второй
Package1.deps.push(Package2);
Package2.requiredBy.push(Package1);

// Циклическая зависимость
Package1.deps.push(Package4);
Package4.deps.push(Package1);
Package1.requiredBy.push(Package4);
Package4.requiredBy.push(Package1);

// А ссылка осталась только на какого-то мейнтенера :-(
const lastEdited = User2;

console.log(getMarkdown(lastEdited));