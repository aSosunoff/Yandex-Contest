## Сами [Задачи](https://contest.yandex.ru/hiring/contest/10824/enter/) на Yandex 2018 Год

## 1C. Картинка с заданной вариативностью

![](/2018_front/1C/statement-image.png)

Дизайнер разработал логотип. Его потребуется использовать в самых разных условиях. Чтобы это было максимально удобно, сверстайте его с помощью одного HTML-элемента на чистом CSS.
Использовать картинки (даже через data:uri) нельзя.

**Примечания**

- Общая ширина: 180px
- Общая высота: 180px
- Высота желтой секции: 90px
- Ширина белой секции: 90px
- Радиус скругления: 9px
- Цвета:
- черный: #0c0c0c
- желтый: #f8e34b
- белый: #eeedef
- тень: #c8c8c8, 178 градусов

>Решение нужно предоставить в виде CSS-файла.
Ваш файл будет подключен как solution.css к HTML-странице вида:

```html
<!DOCTYPE html>  
<html>  
    <head>  
        <meta http-equiv="Content-Security-Policy" content="default-src ’self’; style-src ’unsafe-inline’ ’self’"/>  
        <style>  
            div {  
                width: 180px;  
                height: 180px;  
            }  
        </style>  
        <link rel="stylesheet" href="solution.css">  
    </head>  
    <body>  
        <div></div>  
    </body>  
</html>
```