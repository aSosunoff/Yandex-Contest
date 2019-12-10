## Сами [Задачи](https://contest.yandex.ru/contest/14225/enter/) на Yandex 2019 Год

## F. Педро бросает пить (60 баллов)

Педро бросает пить. У него есть часы, которые показывают, сколько времени он не пьёт. Когда Педро на очередной вечеринке не удаётся сдержать себя, он нажимает на кнопку, и отсчёт сбрасывается к нулю. Недавно Педро уронил часы, из-за чего перестали работать все стрелки кроме секундной. Но самое печальное — перестала работать кнопка сброса. Пожалуйста, помогите Педро починить часы. Без них в его жизни будет полная неразбериха.

Часы работают на JavaScript и в их основе лежит js-фреймворк под названием Framework. У часов есть 4 стрелки: дни, часы, минуты, секунды. Cтрелки должны двигаться не постоянно, а только в момент переключения периода, который они отсчитывают (по аналогии с работающей секундной стрелкой). При нажатии на кнопку сброса стрелки должны переводиться в 0 движением вперёд за кратчайшее время. После того, как все стрелки достигают 0, они должны продолжить движение.

**Пример кода прошивки часов**

```javascript
const ONE_SECOND_DEGREES = 6;  
const ONE_SECOND_FACTOR = 1 / Framework.SPEED * ONE_SECOND_DEGREES;  
 
class MyClock extends Framework.Clock {  
    constructor() {  
        super();  
 
        this.arrows.push(new Framework.Arrow("seconds", {  
            color: "red"  
        }));  
 
        this.arrows.push(new Framework.Arrow("minutes", {  
            weight: 3,  
            length: 80  
        }));  
 
        this.arrows.push(new Framework.Arrow("hours", {  
            weight: 3,  
            length: 60  
        }));  
 
        this.arrows.push(new Framework.Arrow("days", {  
            weight: 3,  
            length: 60  
        }));  
 
        this.buttons.push(new Framework.Button("Reset", () => {  
            alert("reset");  
        }));  
 
        this.tick = 0;  
    }  
 
    onBeforeTick() {  
        const [arrow] = this.arrows;  
 
        this.tick++;  
 
        arrow.rotateFactor = this.tick % 10 ? 0 : ONE_SECOND_FACTOR;  
 
        console.log("before: " + arrow.pos);  
    }  
 
    onAfterTick() {  
        const [arrow] = this.arrows;  
 
        console.log("after: " + arrow.pos);  
    }  
}
```

**Пример**

<table>
<tr><th>Ввод</th><th>Вывод</th></tr>
<tr><td>

```
{
    "comment": "положение стрелок",
    "steps": [
        { "ticks": 36000 },
        { "ticks": 1200 },
        { "ticks": 150 },
        { "button": 0, "ticks": 4 },
        { "ticks": 9 },
        { "ticks": 2 }
    ]
}
```

</td><td>

```
[
  {
    "seconds": 0,
    "minutes": 0,
    "hours": 30,
    "days": 0
  },
  {
    "seconds": 0,
    "minutes": 12,
    "hours": 30,
    "days": 0
  },
  {
    "seconds": 90,
    "minutes": 12,
    "hours": 30,
    "days": 0
  },
  {
    "seconds": 0,
    "minutes": 0,
    "hours": 0,
    "days": 0
  },
  {
    "seconds": 0,
    "minutes": 0,
    "hours": 0,
    "days": 0
  },
  {
    "seconds": 6,
    "minutes": 0,
    "hours": 0,
    "days": 0
  }
]
```

</td></tr>
</table>

**Примечания**

Откройте HTML-файл тестовой страницы по ссылке «Скачать условие задачи» в конце описания. Вам нужно написать на JavaScript класс с названием MyClock, который реализует поведение, описанное в условии.

```javascript
class MyClock extends Framework.Clock {  
    // ваш код  
}

```

При проверке, файл с вашим решением будет подключен на тестовую страницу в место, обозначенное комментарием:

```html
<!-- в качестве решения предоставьте файл solution.js -->  
<script src="solution.js"></script>

```

Идентификаторы стрелок (первый параметр их конструктора) должны быть такими же, как в примере: "seconds", "minutes", "hours", "days".

Считайте, что деления отсчета дней совпадают с делениями минутной/секундной стрелок. Т.е. один 
оборот стрелки "days" — это 60 дней.

Ваше решение будет тестироваться в браузере Google Chrome 77.

[Скачать условия задачи](https://contest.yandex.ru/contest/14225/download/F/) или [Скачать условия задачи](index_ex.html)