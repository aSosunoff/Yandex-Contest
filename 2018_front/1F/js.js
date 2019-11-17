const takeApart = (d, obj) => {
    if(!d) return;
    if(!obj) obj = {};
    if(!('users' in obj)) obj.users = new Set();
    if(!('tasks' in obj)) obj.tasks = new Set();

    switch (d.type) {
        case 'user':
            obj.users.add(d);

            for(let task of d.spectating)
                if(!obj.tasks.has(task))
                    obj = takeApart(task, obj);

            for(let task of d.tasks)
                if(!obj.tasks.has(task))
                    obj = takeApart(task, obj);

            break;
        case 'task':
            if(d.parent == null)
                obj.tasks.add(d);

            if(d.parent && !obj.tasks.has(d.parent))
                obj = takeApart(d.parent, obj);

            if(d.assignee && !obj.users.has(d.assignee))
                obj = takeApart(d.assignee, obj);

            for(let user of d.spectators)
                if(!obj.users.has(user))
                    obj = takeApart(user, obj);

            /*for(let subtask of d.subtasks)
                if(!obj.tasks.has(subtask))
                    obj = takeApart(subtask, obj);*/

            break;
    }

    return obj;
};

const sortUser = (a, b) => a.login < b.login ? -1 : 1;
const sortTask = (a, b) => a.title < b.title ? -1 : 1;

const getTaskArr = (task) => {
    return {
        title: task.title,
        assignee: task.assignee ? task.assignee.login : null,
        spectators: task.spectators.sort(sortUser).map(m => m.login),
        subtasks: task.subtasks.sort(sortTask).map(getTaskArr)
    };
};

const getTaskLine = (task) => {
    let line = `${task.title}`;

    if(task.assignee != null)
        line += `, делает ${task.assignee}`;

    if(task.spectators.length)
        line += `, наблюдают: ${ task.spectators.reduce((r, c) => {return !r.length ? `${c}` : `${r}, ${c}`; }, '') }`;

    line += `\n`;

    return line;
};

/**
 * @param {User|Task} data - последний отредактированный объект в кеше,
 * из которого нужно восстановить все возможные данные  (User или Task)
 * @return {string}
 */
function getMarkdown(data){
    let objectReady = takeApart(data);
    if(!objectReady) return '';

    let users = Array.from(objectReady.users)
        .sort(sortUser)
        .map(m => {
            return {
                login: m.login,
                tasks: m.tasks
                    .sort(sortTask)
                    .map(getTaskArr)
            }
        });

    let tasks = Array.from(objectReady.tasks)
        .sort(sortTask)
        .map(getTaskArr);

    let result = '';

    if(tasks.length)
        result = '## Задачи\n\n';

    for(let task of tasks){
        result += `- ${getTaskLine(task)}`;
        if(task.subtasks.length)
            task.subtasks.forEach(e => {
                result += `  - ${getTaskLine(e)}`;
            })
    }

    if(tasks.length)
        result += '\n';

    if(users.length)
        result += '## Пользователи\n\n';

    for(let user of users){
        result += `- ${user.login}\n`;
        for(let task of user.tasks){
            result += `  * ${task.title}\n`;
            for(let subtask of task.subtasks){
                result += `  * ${subtask.title}\n`;

            }
        }
    }

    return result;
}

// Пользователи в памяти
const User1 = { type: 'user', login: 'fedor', tasks: [], spectating: [] };
const User2 = { type: 'user', login: 'arkady', tasks: [], spectating: [] };
const User3 = { type: 'user', login: 'arkady3', tasks: [], spectating: [] };

// Задачи в памяти
const Task1 = { type: 'task', title: 'Do something', assignee: null, spectators: [], subtasks: [], parent: null };
const Task2 = { type: 'task', title: 'Something else', assignee: null, spectators: [], subtasks: [], parent: null };
const Task3 = { type: 'task', title: 'Sub task', assignee: null, spectators: [], subtasks: [], parent: null };

// // И связи между ними:
// // Первую задачу делает первый пользователь
// Task1.assignee = User1;
// User1.tasks.push(Task1);
// // ... а наблюдает за ней — второй
// Task1.spectators.push(User2);
// User2.spectating.push(Task1);
//
// // Вторую задачу пока никто не делает,
// // но первый пользователь за ней наблюдает
// Task2.spectators.push(User1);
// User1.spectating.push(Task2);
//
// // Третья задача является подзадачей второй
// Task3.parent = Task2;
// Task2.subtasks.push(Task3);
//
// // Известно, что последняя изменённая структура - задача 3
// const lastEdited = Task3;

const lastEdited = User1;
User1.tasks.push(Task1);
Task1.assignee = User1;
Task1.spectators.push(User2);
User2.spectating.push(Task1);
Task1.spectators.push(User3);
User3.spectating.push(Task1);

Task1.subtasks.push(Task2);
Task1.subtasks.push(Task3);

setTimeout(() => {
    console.log(getMarkdown(lastEdited));
}, 500);