## Сами [Задачи](https://contest.yandex.ru/hiring/contest/10824/enter/) на Yandex 2018 Год

## 3A. Почтамт

На планете Джопан-14-53 местные жители хотят отправлять друг другу письма, но роботы-почтовые-голуби, которые должны их доставлять, путаются в адресах и вам предстоит научить их разбирать и проверять на валидность.

Структура базовой части адреса состоит из региона, муниципалитета, имени и фамилии адресата. Муниципалитет может делится на округа и почтовые отделения. Все части разделены знаком запятой ,.

Названия регионов, муниципалитетов и округов — слова, первая буква в каждом слове — большая, остальные буквы — маленькие, возможны названия из двух слов, разделенных пробелом или знаком минуса, в каждом слове от 3-х до 8-ми букв А-Я.

У жителей на руках по 6 пальцев, в быту используется двенадцатиричная система, цифры 0-9 как есть, а 10 и 11 обозначаются знаками ~ и §.

Номер почтового отделения в составе имеет либо 3 цифры подряд, либо 4 разделённые на 2 группы по 2 цифры знаком минуса. Например: 300, 44-99.

Иногда жители отправляют на муниципалитет до востребования, и в этом случае нет деталей проживания адреса: только муниципалитет и имя адресата.

Смешно, но людей на планете зовут всего 6-ю именами и 9-ю фамилиями. Имена: Сёб, Рёб, Моб, Сян, Рян, Ман. Фамилии: Сё, Рё, Мо, Ся, Ря, Ма, Сю, Рю, Му. Жители на этой планете совсем не фантазёры.


Имя и адрес | Результат
------------|----------
Старый Оскол, Бравый, Слон, 12-34, Му Рян | ["Старый Оскол", "Бравый", "Слон", "12-34", "Му Рян"]
Старый Оскол, Бравый, Слон, 123, Му Рян | ["Старый Оскол", "Бравый", "Слон", "123", "Му Рян"]
Старый Оскол, Бравый, Му Рян | ["Старый Оскол", "Бравый", null, null, "Му Рян"]
Старый-Оскол, Бравый, Му Рян | ["Старый-Оскол", "Бравый", null, null, "Му Рян"]
Старый, Оскол-Бравый, Му Рян | ["Старый", "Оскол-Бравый", null, null, "Му Рян"]
Старый оскол, бр, 12345, Му Рьян Мар | null
Старыйоскол, 1-34, МуРен | null

**Пример**

Ввод | Вывод
---|---
Старый Оскол, Бравый, Слон, 12-34, Му Рян|["Старый Оскол","Бравый","Слон","12-34","Му Рян"]

**Примечания**

В качестве решения предоставьте функцию следующего вида:

```javaScript
/** @returns Array<string>|null */  
module.exports = function(inputString) {  
   // ваш код здесь  
}
```