## Сами [Задачи](https://contest.yandex.ru/hiring/contest/10824/enter/) на Yandex 2018 Год

## 3F. Сломался пакетный менеджер

Вася Пипеткин пишет собственный менеджер пакетов для js. В процессе Вася допустил ошибку, и все зависимости проекта, с которым он работал, были удалены (git Вася не использует).

К счастью, в памяти при падении менеджера пакетов осталась структура всех зависимостей, и ссылка на последнюю изменённую структуру, описывающую пакет или мейнтейнера пакета. Напишите программу, которая восстановит зависимости и сможет записать их в markdown-файл нужного формата, по которому Вася сможет восстановить структуру директорий с зависимостями и описание всех устанавливаемых пакетов.

```
## Пакеты

- %название пакета #1%, @%мейнтейнер пакета #1%; использует: %название пакета #2% %название пакета #3%
- %название пакета #2%, @%мейнтейнер пакета #2%
- %название пакета #3%, @%мейнтейнер пакета #3%; использует: %название пакета #4%
- %название пакета #4%; использует: %название пакета #2%

## Пользователи

- %мейнтейнер #1%
  * %пакет этого разработчка%
- %мейнтейнер #2%
  * %пакет этого разработчка%
  * %пакет этого разработчка%
```

Список зависимостей на каждом уровне, список мейнтейнеров и список пакетов мейнтейнера должны быть отсортированы лексикографически.

**Описание структур в памяти**

Пакеты хранятся в памяти в виде структуры типа Package:

```javascript
type Package = {
    name: string;
    maintainer: User;
    deps: Package[];
    requiredBy: Package[];
}
```

Мейнтейнеры хранятся в памяти в виде структуры типа User:

```javascript
class User {
    name: string;
    maintaining: Package[];
}
```

**Шаблон решения**

Ваше решение должно содержать CommonJS-модуль, экспортирующий функцию, соответствующую следующей сигнатуре:

```javaScript
/**
 * @param {Package|User} data - последний измененный объект в памяти,
 * из которого нужно восстановить все возможные данные  (Package или User)
 * @return {string}
 */
module.exports = function (data) {
    // ваш код
    return ’’;
}
```

**Примеры**

```javaScript
// Товары в памяти

// мейнтейнеры в памяти
const User1 = { type: ’user’, name: ’tj’, maintaining: [] };
const User2 = { type: ’user’, name: ’dougwilson’, maintaining: [] };
const User3 = { type: ’user’, name: ’nzakas’, maintaining: [] };

// Пакеты с мейнтейнерами
const Package1 = { type: ’package’, name: ’express’, maintainer: User1, deps: [], requiredBy: [] };
const Package2 = { type: ’package’, name: ’body-parser’, maintainer: User2, deps: [], requiredBy: [] };
const Package3 = { type: ’package’, name: ’eslint’, maintainer: User3, deps: [], requiredBy: [] };
const Package4 = { type: ’package’, name: ’leftpad’, maintainer: null, deps: [], requiredBy: [] };

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
module.exports = User2;
// Если вывести ссылку, получается такая структура:

{ type: ’user’,
  name: ’dougwilson’,
  maintaining:
   [ { type: ’package’,
       name: ’body-parser’,
       maintainer: [Circular],
       deps:
        [ { type: ’package’,
            name: ’eslint’,
            maintainer: { type: ’user’, name: ’nzakas’, maintaining: [ [Circular] ] },
            deps: [],
            requiredBy:
             [ { type: ’package’,
                 name: ’express’,
                 maintainer: { type: ’user’, name: ’tj’, maintaining: [ [Circular] ] },
                 deps:
                  [ [Circular],
                    { type: ’package’,
                      name: ’leftpad’,
                      maintainer: null,
                      deps: [ [Circular] ],
                      deps: [],
                      requiredBy: [ [Circular] ] },
                    [Circular] ],
                 requiredBy:
                  [ { type: ’package’,
                      name: ’leftpad’,
                      maintainer: null,
                      deps: [ [Circular] ],
                      requiredBy: [ [Circular] ] } ] },
               [Circular] ] } ],
       requiredBy:
        [ { type: ’package’,
            name: ’express’,
            maintainer: { type: ’user’, name: ’tj’, maintaining: [ [Circular] ] },
            deps:
             [ [Circular],
               { type: ’package’,
                 name: ’leftpad’,
                 maintainer: null,
                 deps: [ [Circular] ],
                 requiredBy: [ [Circular] ] } ],
            deps:
             [ { type: ’package’,
                 name: ’eslint’,
                 maintainer: { type: ’user’, name: ’nzakas’, maintaining: [ [Circular] ] },
                 deps: [],
                 requiredBy: [ [Circular], [Circular] ] } ],
            requiredBy:
             [ { type: ’package’,
                 name: ’leftpad’,
                 maintainer: null,
                 deps: [ [Circular] ],
                 requiredBy: [ [Circular] ] } ] } ] } ] }
```

На выходе должен получится текст в формате Markdown со всеми найденными пакетами и мейнтейнерами, отсортированными в алфавитном порядке.

```
## Пакеты

- body-parser, @dougwilson; использует: eslint
- eslint, @nzakas
- express, @tj; использует: body-parser eslint leftpad
- leftpad; использует: express

## Пользователи

- dougwilson
  * body-parser
- nzakas
  * eslint
- tj
  * express
```