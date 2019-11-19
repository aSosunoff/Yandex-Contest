function detour(top){
    let queue = [],
        queueVisit = new Set();

    queue.push(top);

    while (queue.length){
        let item = queue.shift();

        switch (item.type) {
            case 'user':
                for(let task of item.spectating)
                    if(!queueVisit.has(task))
                        queue.push(task);

                for(let task of item.tasks)
                    if(!queueVisit.has(task))
                        queue.push(task);

                break;
            case 'task':
                if(item.parent && !queueVisit.has(item.parent))
                    queue.push(item.parent);

                if(item.assignee && !queueVisit.has(item.assignee))
                    queue.push(item.assignee);

                for(let user of item.spectators)
                    if(!queueVisit.has(user))
                        queue.push(user);

                for(let subtask of item.subtasks)
                    if(!queueVisit.has(subtask))
                        queue.push(subtask);

                break;
        }

        queueVisit.add(item);
    }

    return Array.from(queueVisit)
        .filter(f => {
            if('parent' in f && f.parent)
                return false;

            return true;
        });
}

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

function getBlockTask(tasks, str){
    let r = '';
    for(let task of tasks){
        r += `${str} ${getTaskLine(task)}`;
        r += getBlockTask(task.subtasks, `  ${str}`);
    }
    return r;
}


/**
 * @param {User|Task} data - последний отредактированный объект в кеше,
 * из которого нужно восстановить все возможные данные  (User или Task)
 * @return {string}
 */
function getMarkdown(data){
    let objectReady = detour(data);

    if(!objectReady.length) return '';

    let users = objectReady.filter(f => f.type == 'user')
        .sort(sortUser)
        .map(m => {
            return {
                login: m.login,
                tasks: m.tasks
                    .sort(sortTask)
                    .map(getTaskArr)
            }
        });

    let tasks = objectReady.filter(f => f.type == 'task')
        .sort(sortTask)
        .map(getTaskArr);

    let result = '';

    if(tasks.length){
        result += '## Задачи\n\n';
        result += getBlockTask(tasks, '-');
        result += '\n';
    }

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

// Задачи в памяти
const Task1 = { type: 'task', title: 'Do something', assignee: null, spectators: [], subtasks: [], parent: null };
const Task2 = { type: 'task', title: 'Something else', assignee: null, spectators: [], subtasks: [], parent: null };
const Task3 = { type: 'task', title: 'Sub task', assignee: null, spectators: [], subtasks: [], parent: null };

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
Task3.parent = Task2;
Task2.subtasks.push(Task3);

// Известно, что последняя изменённая структура - задача 3
const lastEdited = Task3;

const User3 = { type: 'user', login: '1', tasks: [], spectating: [] };
const Task4 = { type: 'task', title: 'task4', assignee: null, spectators: [], subtasks: [], parent: null };

Task1.spectators.push(User3);
User3.spectating.push(Task1);

Task4.parent = Task3;
Task3.subtasks.push(Task4);

setTimeout(() => {
    //console.log(detour(lastEdited));
    console.log(getMarkdown(lastEdited));
}, 500);

// const top1 = { login: '1', tasks: [], parent: null };
// const top2 = { login: '2', tasks: [], parent: null };
// const top3 = { login: '3', tasks: [], parent: null };
// const top4 = { login: '4', tasks: [], parent: null };
// const top5 = { login: '5', tasks: [], parent: null };
// const top6 = { login: '6', tasks: [], parent: null };
//
// top1.tasks.push(top2);
// top1.tasks.push(top3);
// top2.parent = top1;
// top3.parent = top1;
//
// top2.tasks.push(top4);
// top2.tasks.push(top5);
// top4.parent = top2;
// top5.parent = top2;
//
// top3.tasks.push(top6);
// top6.parent = top3;
//
// function detour(top){
//     let queue = [],
//         queueVisit = [];
//     queue.push(top);
//
//     while (queue.length){
//
//         let item = queue.shift();
//         item.tasks.forEach(e => {
//             queue.push(e);
//         });
//         queueVisit.push(item);
//     }
//     debugger;
//     return queueVisit;
// }