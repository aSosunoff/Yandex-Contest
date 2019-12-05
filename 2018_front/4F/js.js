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

// const getPackageArr = (data) => {
//     data.deps = data.deps.sort(sort('name'));
//     data.requiredBy = data.requiredBy.sort(sort('name'));
//     return data;
// };

// const getLine = (data) => `${
//     data.name
// }${
//     data.maintainer ? `, @${data.maintainer.name}` : ''
// }${
//     data.deps.length ? `; использует: ${data.deps.map(m => m.name).join(' ')}` : ''
// }`;

// const renderPackage = (datas) => {
//     let r = '';
//     for(let data of datas){
//         r += `\n- ${getLine(data)}`;
//     }
//     return r;
// }

// const renderUser = (datas) => {
//     let r = '';
//     for(let data of datas){
//         r += `\n- ${data.name}`;
//         r += `${data.maintaining.map(m => `\n  * ${m.name}`).join('')}`;
//     }
//     return r;
// }


/**
 * @param {Band|Genre} data - ссылка на группу или жанр,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
function getMarkdown(data){
    // let [user, package] = detour(data, {
    //     user: (e, fn) => {
    //         fn(e.maintaining);
    //     },
    //     package: (e, fn) => {
    //         fn(e.maintainer);
    //         fn(e.deps);
    //         fn(e.requiredBy);
    //     }
    // });
    
    // user = user.sort(sort('name')).map(g => {
    //     g.maintaining = g.maintaining.sort(sort('name')).map(getPackageArr);
    //     return g;
    // });

    // package = package
    //     .sort(sort('name'))
    //     .map(getPackageArr);

    // let result = '';

    // if(package.length)
    //     result += `## Пакеты\n${renderPackage(package)}`;
    
    // if(package.length && user.length)
    //     result += `\n\n`;

    // if(user.length)
    //     result += `## Пользователи\n${renderUser(user)}`;

    // return result;
}

// Жанры в памяти
const Genre1 = { type: 'genre', name: 'Рок', bands: [], subgenres: [], parent: null };
const Genre1Sub1 = { type: 'genre', name: 'Классик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub2 = { type: 'genre', name: 'Акустик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub3 = { type: 'genre', name: 'Полурок', bands: [], subgenres: [], parent: null };
const Genre2 = { type: 'genre', name: 'Нерок', bands: [], subgenres: [], parent: null };

// Разбираемся с роком
Genre1.subgenres.push(Genre1Sub1, Genre1Sub2, Genre1Sub3);
Genre1Sub1.parent = Genre1Sub2.parent = Genre1Sub3.parent = Genre1;

// Группы в памяти
const Band1 = { type: 'band', name: 'Жёлтый мох', friends: [], genres: [] };
const Band2 = { type: 'band', name: 'Красный слой', friends: [], genres: [] };
const Band3 = { type: 'band', name: 'Бритый гриб', friends: [], genres: [] };

// И в жанрах
Band1.genres.push(Genre1Sub1);
Genre1Sub1.bands.push(Band1);

Band2.genres.push(Genre1Sub2);
Genre1Sub2.bands.push(Band2);

// А Бритый гриб лабает в двух жанрах
Band3.genres.push(Genre2);
Genre2.bands.push(Band3);
Band3.genres.push(Genre1Sub3);
Genre1Sub3.bands.push(Band3);

// Группы умеют дружить
Band1.friends.push(Band2);
Band2.friends.push(Band1);

// С некоторыми — по 2 раза, но это не взаимно
Band1.friends.push(Band3);

// Помнит Коля только про Бритый Гриб :-(
const lastEdited = Band3;

console.log(getMarkdown(lastEdited));