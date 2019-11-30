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

const getCommentArr = (comment) => {
    comment.comments = comment.comments.sort(sort('text')).map(getCommentArr);
    return comment;
};

const renderComment = (comments, str, count = 1) => {
    debugger;
    let r = '';
    for(let comment of comments){
        r += `\n${'  '.repeat(count)}${str} ${comment.text}`;
        r += renderComment(comment.comments, str, ++count);
    }
    return r;
}

const renderGood = (goods) => {
    let r = '';
    for(let good of goods){
        r += `\n- ${good.name}`;
        r += `${good.related.map(m => `\n  * ${m}`).join('')}`;
    }
    return r;
}


/**
 * @param {Good|Comment} data - ссылка на товар, отзыв или ответ на отзыв,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
function getMarkdown(data){
    let [comment, good] = detour(data, {
        comment: (e, fn) => {
            fn(e.comments);
            fn(e.parent);
        },
        good: (e, fn) => {
            fn(e.comments);
            fn(e.related);
        }
    });
    
    good = good.sort(sort('name')).map(g => {
        g.comments = g.comments.sort(sort('text')).map(getCommentArr);
        g.related = g.related.sort(sort('name')).map(m => m.name);
        return g;
    });

    comment = comment
        .filter(f => f.parent.type == 'good')
        .sort(sort('text'))
        .map(getCommentArr);

    let result = '';

    if(comment.length){
        result += `## Отзывы\n`;
        for(let com of comment){
            result += `\n- ${com.text}`;
            if(com.parent)
                result += ` - про ${com.parent.name}${renderComment(com.comments, '-')}`;
        }
        result += '\n\n';
    }
    
    if(good.length)
        result += `## Товары\n${renderGood(good)}`;

    return result;
}

const Good1 = { type: 'good', name: 'Смесь Friso Frisolaс Gold 2035', comments: [], related: [] };
const Good2 = { type: 'good', name: 'МакБук PRO 2035 13\' w/ clickbar', comments: [], related: [] };
const Good3 = { type: 'good', name: 'Фигурка Funko POP! Vinyl: Overwatch Уинстон', comments: [], related: [] };

// Отзывы в памяти
const Comment1 = { type: 'comment', text: 'Классный ноутбук!', comments: [], parent: null };
const Comment2 = { type: 'comment', text: 'Не понравился! Кликбар не работает совсем!', comments: [], parent: null };
const Comment3 = { type: 'comment', text: 'Хорошая цена, у малыша не было аллергии на неё', comments: [], parent: null };

// Похожие товары
Good3.related.push(Good1, Good2)
Good1.related.push(Good3)
Good2.related.push(Good3)

// Расставляем комментарии
Comment1.parent = Good2;
Good2.comments.push(Comment1);

Comment2.parent = Comment1;
Comment1.comments.push(Comment2);

Comment3.parent = Good1;
Good1.comments.push(Comment3);

// А ссылка осталась только на третий отзыв :-(
const lastEdited = Comment3;


const Comment4 = { type: 'comment', text: '1', comments: [], parent: null };
Comment4.parent = Comment2;
Comment2.comments.push(Comment4);
// // Пользователи в памяти
// const User1 = { type: 'user', login: 'fedor(User1)', tasks: [], spectating: [] };
// const User2 = { type: 'user', login: 'arkady(User2)', tasks: [], spectating: [] };

// // Задачи в памяти
// const Task1 = { type: 'task', title: 'Do something(Task1)', assignee: null, spectators: [], subtasks: [], parent: null };
// const Task2 = { type: 'task', title: 'Something else(Task2)', assignee: null, spectators: [], subtasks: [], parent: null };
// const Task3 = { type: 'task', title: 'Sub task(Task3)', assignee: null, spectators: [], subtasks: [], parent: null };

// // И связи между ними:
// // Первую задачу делает первый пользователь
// Task1.assignee = User1;
// User1.tasks.push(Task1);
// // ... а наблюдает за ней — второй
// Task1.spectators.push(User2);
// User2.spectating.push(Task1);

// // Вторую задачу пока никто не делает,
// // но первый пользователь за ней наблюдает
// Task2.spectators.push(User1);
// User1.spectating.push(Task2);

// // Третья задача является подзадачей второй
// Task3.parent = Task1;
// Task1.subtasks.push(Task3);

// // Известно, что последняя изменённая структура - задача 3
// const lastEdited = Task3;

// const User3 = { type: 'user', login: '1', tasks: [], spectating: [] };
// const Task4 = { type: 'task', title: 'task4', assignee: null, spectators: [], subtasks: [], parent: null };

// Task1.spectators.push(User3);
// User3.spectating.push(Task1);

// Task4.parent = Task3;
// Task3.subtasks.push(Task4);

console.log(getMarkdown(lastEdited));