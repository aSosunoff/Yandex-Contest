## Сами [Задачи](https://contest.yandex.ru/contest/14229/enter/) на Yandex 2019 Год

## E. Рельеф планеты Х (60 баллов)

В 2050 году учёные из МКС начали получать особенные сигналы из космоса с массивами чисел. Учёные предполагают, что некая инопланетная цивилизация передаёт в массивах рельеф части своей планеты.

Вам предложили присоединиться к исследованию зашифрованного сигнала, чтобы помочь воссоздать эту предположительную местность. 

Описание прилагается:

Значения h описывают высоты (h>0), низины (h<0) и уровень моря (h=0) в пикселях (px) кратные 10. (далее в h, пиксели будут опускаться).

Площади (S) объектов определяются суммой абсолютных значений элементов. ([–10,–30,–10], S=50)

Ширина одной клетки = 10px

* Солнце расположено в промежутке 100 < h < 150. Если его нет, то тема сменяется на ночную. Цвет: #ffff00 ![](1.jpg)
* Звёзды расположены на высоте h ≥ 150. Видны только ночью. Цвет: #ffffff ![](2.jpg)
* Горы — положительно определённые палиндромы нечётной длины > 1 с вершиной 30 ≤ h ≤ 100. ([0,10,30,10,0]). Нужно найти и нарисовать самую большую гору по площади (остальные возвышенности не рисуем). Цвет на день / ночь: #bb3300 / #5b3500 ![](3.jpg) ![](4.jpg)
* Озёра — отрицательно определённые палиндромы нечётной длины > 1 с глубиной −30 ≥ h ≥ −100. ([0,–10,–30,–10,0]). Нужно найти и нарисовать самое большое озеро по площади (остальные низменности не рисуем). Цвет на день / ночь: #0f5ed6 / #036bb5 ![](5.jpg) ![](6.jpg)
* Алмазы расположены на глубине h < −100, должны граничить с землёй (h ≥ 0). [0,–110,10]. Клетка перевёрнута на 45∘. Цвет: #ffffff ![](7.jpg)
* Цвет дневного неба: #5baef7
* Цвет звёздного неба: #120078
* Цвет земли: #793b0f

Учёные хотят, чтобы вы графически представили такой массив в виде прямоугольников одинаковой ширины.

**Примеры:**

День: [0,–10,–20,–30,–20,–10,0,10,–160,0,40,0,140,150,0,–120,0,–20,0,20,10,20,30,40,30,20,10,0]

![](8.png)

Ночь: [0,–10,–20,–30,–20,–10,160,10,–110,0,40,0,90,0,0,150,–130,0,–20,0,20,170,10,20,30,40,30,20,10,0]

![](9.png)

Решение представляет собой функцию, возвращющую объект со строками {script,style}, которые будут добавляться в HTML-документ с единственным элементом в теле `<div class="world»</div>`.

Задача решается при помощи разметки, без использования canvas.

```html
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8">  
    <style type="text/css">‘${style}‘</style>  
  </head>  
  <body>  
    <div class="world"></div>  
    <script type="text/javascript">‘${script}‘</script>  
  </body>  
</html>
```

Пришлите решение в таком виде:

```javascript
module.exports = function(arr) {  
    let script,style;  
    ...  
    return {  
        script: script,  
        style: style  
    };  
}
```

**Примечания**

Обратите внимание:

* ‘script’ и ‘style’ добавляются в чистом виде без тегов,
* ширина блока (класса) ‘world’ должна быть равна произведению количества элементов на ширину одной клетки (10 px). Например, для массива [0,10,150,10,–150] ширина равняется 5 × 10px = 50px,
* высота блока (класса) ‘world’ должна быть равна сумме абсолютных значений максимального и минимального элементов. Например, для массива [0,10,150,10,–150] высота равняется |150| + |–150| = 300px,
* горы и озёра не обязательно должны граничить с уровнем моря (h = 0),
* горы и озёра монотонно убывают и возрастают от центра,
* для алмаза [–150], h = −150
 определяет нижнюю грань (т.е. нужно верстать с –140 по –150),
* тесты на скриншоты будут прогоняться относительно класса ‘world’.