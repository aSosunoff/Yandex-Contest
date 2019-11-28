## Сами [Задачи](https://contest.yandex.ru/hiring/contest/10824/enter/) на Yandex 2018 Год

## 4C. Картинка с заданной вариативностью


![](statement-image.png)

Дизайнер разработал логотип. Его потребуется использовать в самых разных условиях. Чтобы это было максимально удобно, сверстайте его с помощью одного HTML-элемента на чистом CSS.

Использовать картинки (даже через data:uri) нельзя.

**Примечания**

- Ширина: 223px
- Высота: 142px
- Цвет лейбла: #ﬀdb4d
- Цвет фона: #ﬀf
- Цвет стежков: rgba(0, 0, 0, .3) + rgba(255, 255, 255, .5)
- Вырубка по углам: 18x18
- Центральное отверстие: 12x12

>Решение нужно предоставить в виде CSS-файла.
Ваш файл будет подключен как solution.css к HTML-странице вида:

```html
<!DOCTYPE html>  
<html>  
    <head>  
        <meta http-equiv="Content-Security-Policy" content="default-src ’self’; style-src ’unsafe-inline’ ’self’"/>  
        <style>  
            div {  
                width: 223px;  
                height: 142px;  
            }  
        </style>  
        <link rel="stylesheet" href="solution.css">  
    </head>  
    <body>  
        <div></div>  
    </body>  
</html>
```