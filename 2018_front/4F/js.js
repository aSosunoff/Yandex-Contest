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

const getBandArr = (data) => {
    data.friends = data.friends.sort(sort('name'));
    /*data.genres = data.genres.sort(sort('name')).map(getGanreArr);*/
    return data;
};

const getGanreArr = (data) => {
    data.bands = data.bands.sort(sort('name')).map(getBandArr);
    data.subgenres = data.subgenres.sort(sort('name')).map(getGanreArr);
    return data;
};

const getLine = (data) => `${
    data.name
}${
    data.bands.length ? `: ${data.bands.map(m => m.name).join(', ')}` : ''
}`;

const renderGanrePackage = (datas, separatorCount = 0) => {
    let r = '';
    for(let data of datas){
        r += `\n${'  '.repeat(separatorCount)}- ${getLine(data)}`;
        if(data.subgenres.length)
            r += `${renderGanrePackage(data.subgenres, ++separatorCount)}`;
    }
    return r;
}

const renderBand = (datas) => {
    let r = '';
    for(let data of datas){
        r += `\n- ${data.name}`;
        if(data.friends.length)
            r += `, друзья: ${data.friends.map(m => m.name).join(', ')}`;
    }
    return r;
}


/**
 * @param {Band|Genre} data - ссылка на группу или жанр,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
function getMarkdown(data){
    if(!('type' in data && !!~['genre','band'].indexOf(data.type)))
        return '';
    
    let [genre, band] = detour(data, {
        genre: (e, fn) => {
            fn(e.bands);
            fn(e.subgenres);
            fn(e.parent);
        },
        band: (e, fn) => {
            fn(e.friends);
            fn(e.genres);
        }
    });
    
    genre = genre.filter(e => !e.parent).sort(sort('name')).map(getGanreArr);

    band = band.sort(sort('name')).map(getBandArr);

    let result = '';

    if(genre.length)
        result += `## Жанры\n${renderGanrePackage(genre)}`;
    
    if(genre.length && band.length)
        result += `\n\n`;

    if(band.length)
        result += `## Группы\n${renderBand(band)}`;

    return result;
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

const SubGenre3Sub1 = { type: 'genre', name: '12', bands: [], subgenres: [], parent: null };
Genre1Sub3.subgenres.push(SubGenre3Sub1);
SubGenre3Sub1.parent = Genre1Sub3;

const SubGenre3Sub2 = { type: 'genre', name: '123', bands: [], subgenres: [], parent: null };
SubGenre3Sub1.subgenres.push(SubGenre3Sub2);
SubGenre3Sub2.parent = SubGenre3Sub1;

const Band4 = { type: 'band', name: 'Жёлтый мох', friends: [], genres: [] };

// Помнит Коля только про Бритый Гриб :-(
const lastEdited = Genre1Sub3;

console.log(getMarkdown({}));