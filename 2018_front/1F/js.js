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

const sortUser = (a, b) => a.login < b.login ? -1 : (a.login == b.login ? 0 : 1);
const sortTask = (a, b) => a.title < b.title ? -1 : (a.title == b.title ? 0 : 1);

const getTaskArr = (task) => {
    return {
        title: task.title,
        assignee: task.assignee ? task.assignee.login : null,
        spectators: task.spectators.sort(sortUser).map(m => m.login),
        subtasks: task.subtasks.sort(sortTask).map(getTaskArr)
    };
};

const getTaskLine = (task) => `${
        task.title
    }${
        task.assignee ? `, делает ${task.assignee}` : ''
    }${
        task.spectators.length ? `, наблюдают: ${task.spectators.map(m => m).join(', ')}` : ''
    }`;

const renderTask = (tasks, str) => {
    let r = '';
    for(let task of tasks){
        r += `${str} ${getTaskLine(task)}\n`;
        r += renderTask(task.subtasks, `  ${str}`);
    }
    return r;
}

const renderUser = (users) => {
    let r = '';
    for(let user of users){
        r += `\n- ${user.login}`;
        r += `${user.tasks.map(m => `\n  * ${m.title}`).join('')}`;
    }
    return r;
}


/**
 * @param {User|Task} data - последний отредактированный объект в кеше,
 * из которого нужно восстановить все возможные данные  (User или Task)
 * @return {string}
 */
function getMarkdown(data){
    let [users, tasks] = detour(data, {
        user: (e, fn) => {
            fn(e.spectating);
            fn(e.tasks);
        },
        task: (e, fn) => {
            fn(e.parent);
            fn(e.assignee);
            fn(e.spectators);
            fn(e.subtasks);
        }
    });

    users.sort(sortUser)
        .map(m => {
            return {
                login: m.login,
                tasks: m.tasks
                    .sort(sortTask)
                    .map(getTaskArr)
            }
        });

    tasks = tasks
        .filter(f => !f.parent)
        .sort(sortTask)
        .map(getTaskArr);

    let result = '';

    if(tasks.length)
        result += `## Задачи\n\n${renderTask(tasks, '-')}\n`;

    if(users.length)
        result += `## Пользователи\n${renderUser(users)}`;

    return result;
}

// Пользователи в памяти
const User1 = { type: 'user', login: 'fedor(User1)', tasks: [], spectating: [] };
const User2 = { type: 'user', login: 'arkady(User2)', tasks: [], spectating: [] };

// Задачи в памяти
const Task1 = { type: 'task', title: 'Do something(Task1)', assignee: null, spectators: [], subtasks: [], parent: null };
const Task2 = { type: 'task', title: 'Something else(Task2)', assignee: null, spectators: [], subtasks: [], parent: null };
const Task3 = { type: 'task', title: 'Sub task(Task3)', assignee: null, spectators: [], subtasks: [], parent: null };

// И связи между ними:
// Первую задачу делает первый пользователь
Task1.assignee = User1;
User1.tasks.push(Task1);
// ... а наблюдает за ней — второй
Task1.spectators.push(User2);
User2.spectating.push(Task1);

// Вторую задачу пока никто не делает,
// но первый пользователь за ней наблюдает
Task2.spectators.push(User1);
User1.spectating.push(Task2);

// Третья задача является подзадачей второй
Task3.parent = Task1;
Task1.subtasks.push(Task3);

// Известно, что последняя изменённая структура - задача 3
const lastEdited = Task3;

const User3 = { type: 'user', login: '1', tasks: [], spectating: [] };
const Task4 = { type: 'task', title: 'task4', assignee: null, spectators: [], subtasks: [], parent: null };

Task1.spectators.push(User3);
User3.spectating.push(Task1);

Task4.parent = Task3;
Task3.subtasks.push(Task4);

console.log(getMarkdown(lastEdited));