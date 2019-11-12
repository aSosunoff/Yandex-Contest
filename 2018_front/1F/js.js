/**
 * @param {User|Task} data - последний отредактированный объект в кеше,
 * из которого нужно восстановить все возможные данные  (User или Task)
 * @return {string}
 */
function getMarkdown(data){
    const takeApart = (d, obj) => {
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
                obj.tasks.add(d);

                if(d.parent != null && !obj.tasks.has(d.parent))
                    obj = takeApart(d.parent, obj);

                if(d.assignee != null && !obj.users.has(d.assignee))
                    obj = takeApart(d.assignee, obj);

                for(let user of d.spectators)
                    if(!obj.users.has(user))
                        obj = takeApart(user, obj);

                for(let subtask of d.subtasks)
                    if(!obj.tasks.has(subtask))
                        obj = takeApart(subtask, obj);

                break;
        }

        return obj;
    };

    let objectReady = takeApart(data);

    function getTask(task, tab){
        return `${tab} ${task.title}\n`;
    }

    let result = '## Задачи\n';

    for(let task of objectReady.tasks){
        let arr = [];

        if(task.assignee != null)
            arr.push(`делает ${task.assignee.login}`);

        if(task.spectators.length)
            arr.push(`наблюдают: ${ task.spectators.reduce((r, c) => {return !r.length ? `${c.login}` : `${r}, ${c.login}`; }, '') }`);

        if(task.assignee == null && !task.spectators.length){
            result += `- ${task.title}\n`;
        } else {
            result += `- ${task.title}, ${arr.join(', ')}\n`;
        }
    }

    result += '## Пользователи\n';

    for(let user of objectReady.users){
        result += `- ${user.login}\n`;
        for(let task of user.tasks){
            result += `${getTask(task, '  *')}`;
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

setTimeout(() => {
    console.log(getMarkdown(lastEdited));
}, 500);