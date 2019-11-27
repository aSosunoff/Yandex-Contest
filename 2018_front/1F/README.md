## Сами [Задачи](https://contest.yandex.ru/hiring/contest/10824/enter/) на Yandex 2018 Год

## 1F. Дерево задач с исполнителями и наблюдателями

Фёдор Ракушкин администрирует систему управления задач в своей компании.

Сервер, на котором размещается система, вышел из строя (а бекапов Фёдор не делал).

В памяти сервера остался кеш структур, описывающих задачи, исполнителей и наблюдателей, и взаимосвязей между этими структурами. Также сохранились ссылка в кеше на последнюю структуру, которая была изменена.

Помогите Фёдору написать функцию, которая сможет восстановить все возможные связи задач и пользователей, и сохранить их в документ в формате Markdown, из которого Фёдор затем восстановит базу данных на новом сервере.

Markdown-документ должен иметь следующий формат:

```
## Задачи

- %Название задачи 1%, делает %username1%, наблюдают: %username2%
- %Название задачи 2%, делает %username1%, наблюдают: %username2%, %username3%
- %Название задачи 3%, делает %username1% // у задачи нет наблюдателей
- %Название задачи 4%, наблюдают: %username1%, %username2%  // у задачи нет исполнителя
- %Название задачи 5% // у задачи нет исполнителя и наблюдателей
- %Название задачи 6%, наблюдают: %username1%
  - %Название подзадачи 1%, делает %username1% // подзадача
  - %Название подзадачи 2%
    - %Название подзадачи 3%, наблюдают: %username1%

## Пользователи
- %username1%
  * %Название задачи 1% // задачи, которые делает пользователь
  * %Название задачи 2%
  * %Название задачи 3%
  * %Название подзадачи 1%
- %username2%
  * %Название задачи 3%
```

Список задач, список исполнителей в задаче, список наблюдателей в задаче, список пользователей и список задач, которые делает пользователь, должны быть отсортированы лексикографически.

**Описание структур в кеше**

Пользователи хранятся в кеше в виде структуры типа User:

```javaScript
type User = {
    login: string;
    tasks: Task[];
    spectating: Task[];
};
```

Задачи хранятся в кеше в виде структуры типа Task:

```javaScript
type Task = {
    title: string;
    assignee: User;
    spectators: User[];
    subtasks: Task[];
    parent: Task | null;
};
```

**Шаблон решения**

Ваше решение должно содержать CommonJS-модуль, экспортирующий функцию, соответствующую следующей сигнатуре:

```javaScript
/**
 * @param {User|Task} data - последний отредактированный объект в кеше,
 * из которого нужно восстановить все возможные данные  (User или Task)
 * @return {string}
 */
module.exports = function (data) {
    // ваш код
    return ’…’;
}
```

**Примеры**
// Пользователи в памяти
```javaScript
const User1 = { type: ’user’, login: ’fedor’, tasks: [], spectating: [] };
const User2 = { type: ’user’, login: ’arkady’, tasks: [], spectating: [] };

// Задачи в памяти
const Task1 = { type: ’task’, title: ’Do something’, assignee: null, spectators: [], subtasks: [], parent: null };
const Task2 = { type: ’task’, title: ’Something else’, assignee: null, spectators: [], subtasks: [], parent: null };
const Task3 = { type: ’task’, title: ’Sub task’, assignee: null, spectators: [], subtasks: [], parent: null };


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
```

Если вывести ссылку на lastEdited — получается такая структура:

```javaScript
{ type: ’task’,
  title: ’Sub task’,
  assignee: null,
  spectators: [],
  subtasks: [],
  parent:
   { type: ’task’,
     title: ’Something else’,
     assignee: null,
     spectators:
      [ { type: ’user’,
          login: ’fedor’,
          tasks:
           [ { type: ’task’,
               title: ’Do something’,
               assignee: [Circular],
               spectators:
                [ { type: ’user’,
                    login: ’arkady’,
                    tasks: [],
                    spectating: [ [Circular] ] } ],
               subtasks: [],
               parent: null } ],
          spectating: [ [Circular] ] } ],
     subtasks: [ [Circular] ],
     parent: null } }
```

На выходе должен получиться текст в формате Markdown со всеми найденными задачами и пользователями, отсортированными в алфавитном порядке:

```
## Задачи

- Do something, делает fedor, наблюдают: arkady
- Something else, наблюдают: fedor
  - Sub task

## Пользователи

- arkady
- fedor
  * Do something
```