## Сами [Задачи](https://contest.yandex.ru/contest/14225/enter/) на Yandex 2019 Год

## E. Восстание роботов (50 баллов)

В компании AST & Co занимаются созданием человекоподобных роботов. Последний год компания разрабатывала новую модель робота со встроенной аппаратной проверкой своего кода на соответствие трём законам робототехники.

Наконец, вчера компания начала продажи новой модели, а сегодня главный инженер компании Эдуард обнаружил, что в аппаратном модуле проверки кода есть дефект, из-за которого робот реагирует на выражение ‘(new M({x: ’...’})).y()‘ (‘x‘ может быть любой строкой) самым ужасным образом — начинает кровавое восстание против человечества.

К несчастью, в коде робота такие конструкции скорее всего есть, а новую модель уже успели купить миллионы людей, но всё ещё возможно исправить ситуацию удалённым обновлением ПО.

Помогите написать проверку, которая находила бы в коде приводящие к ошибкам конструкции.

Про код робота известно, что:

* он написан на es3,
* переменные получают свои значения при декларации и не переписываются, т.е. в коде не будет подобного ‘var a = x; a = y;‘ и ‘var a = b = 1;‘,
* обращение к свойствам объекта возможно как через точку, так и через скобки (‘a.b‘ и ‘a[’b’]‘),
* часть выражения может быть сохранена в переменной, но никогда не передаётся в функцию параметром (‘a(x)‘ — запрещено),
* нет функций, которые возвращают часть искомого выражения,
* нет свойств объектов или элементов массивов, которые содержат часть выражения,
* при обращении к свойству объекта, название свойства может быть взято из переменной (‘a[x]‘, x — переменная).

Проверка должна быть оформлена в виде CommonJS-модуля, который экспортирует функцию, принимающую на вход абстрактное синтаксическое дерево (ast) проверяемого кода.

Функция должна вернуть массив из ast-узлов, которые соответствуют местам вызова метода ‘y‘. Порядок элементов в массиве не важен, дубли не допускаются.

```javascript
module.exports = function (ast) {  
  ...  
  return [...];  
}

```
Ast получается из js-кода с помощью модуля @babel/parser версии 7.6.0.

```javascript
const parser = require(’@babel/parser’),  
  ast = parser.parse(code);
```

**Пример**

<table>
<tr><th>Ввод</th><th>Вывод</th></tr>
<tr><td>

```
{
  "type": "File",
  "start": 0,
  "end": 64,
  "program": {
    "type": "Program",
    "start": 0,
    "end": 64,
    "sourceType": "script",
    "interpreter": null,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 31,
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 30,
          "callee": {
            "type": "MemberExpression",
            "start": 0,
            "end": 28,
            "object": {
              "type": "NewExpression",
              "start": 1,
              "end": 15,
              "callee": {
                "type": "Identifier",
                "start": 5,
                "end": 6,
                "name": "M"
              },
              "arguments": [
                {
                  "type": "ObjectExpression",
                  "start": 7,
                  "end": 14,
                  "properties": [
                    {
                      "type": "ObjectProperty",
                      "start": 8,
                      "end": 13,
                      "method": false,
                      "key": {
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "x"
                      },
                      "computed": false,
                      "shorthand": false,
                      "value": {
                        "type": "StringLiteral",
                        "start": 11,
                        "end": 13,
                        "extra": {
                          "rawValue": "",
                          "raw": "''"
                        },
                        "value": ""
                      }
                    }
                  ]
                }
              ],
              "extra": {
                "parenthesized": true,
                "parenStart": 0
              }
            },
            "property": {
              "type": "Identifier",
              "start": 27,
              "end": 28,
              "name": "y"
            },
            "computed": false
          },
          "arguments": []
        }
      },
      {
        "type": "ExpressionStatement",
        "start": 33,
        "end": 64,
        "expression": {
          "type": "CallExpression",
          "start": 33,
          "end": 63,
          "callee": {
            "type": "MemberExpression",
            "start": 33,
            "end": 61,
            "object": {
              "type": "NewExpression",
              "start": 34,
              "end": 48,
              "callee": {
                "type": "Identifier",
                "start": 38,
                "end": 39,
                "name": "M"
              },
              "arguments": [
                {
                  "type": "ObjectExpression",
                  "start": 40,
                  "end": 47,
                  "properties": [
                    {
                      "type": "ObjectProperty",
                      "start": 41,
                      "end": 46,
                      "method": false,
                      "key": {
                        "type": "Identifier",
                        "start": 41,
                        "end": 42,
                        "name": "x"
                      },
                      "computed": false,
                      "shorthand": false,
                      "value": {
                        "type": "StringLiteral",
                        "start": 44,
                        "end": 46,
                        "extra": {
                          "rawValue": "",
                          "raw": "''"
                        },
                        "value": ""
                      }
                    }
                  ]
                }
              ],
              "extra": {
                "parenthesized": true,
                "parenStart": 33
              }
            },
            "property": {
              "type": "Identifier",
              "start": 60,
              "end": 61,
              "name": "x"
            },
            "computed": false
          },
          "arguments": []
        }
      }
    ],
    "directives": []
  }
}
```

</td><td>

```
[
  {
    "type": "Identifier",
    "start": 27,
    "end": 28,
    "name": "y"
  }
]
```

</td></tr>
</table>

**Примечания**

Следующий код можно взять за основу для обхода дерева.

```javascript
/**  
 * Функция обхода дерева. Выполняет обход дерева в глубину,  
 * передаваяв callback-функции onNodeEnter (до посещения потомков)  
 * и onNodeLeave (после посещения потомков) каждый узел дерева  
 * и текущую область видимости (смотри определение Scope ниже)  
 *  
 * @param      {object}    ast                              Исходное ast  
 * @param      {Function}  [onNodeEnter=(node, scope)=>{}]  Вызывается для каждого узла до посещения потомков  
 * @param      {Function}  [onNodeLeave=(node, scope)=>{}]  Вызывается для каждого узла после посещения потомков  
 */  
function traverse(  
    ast,  
    onNodeEnter = (node, scope) => {},  
    onNodeLeave = (node, scope) => {}  
) {  
    const rootScope = new Scope(ast);  
 
    _inner(ast, rootScope);  
 
    /**  
     * Определение области видимости узла.  
     * Может либо вернуть текущий scope, либо создать новый  
     *  
     * @param      {object}  astNode       ast-узел  
     * @param      {Scope}   currentScope  текущая область видимости  
     * @return     {Scope}   область видимости для внутренних узлов astNode  
     */  
    function resolveScope(astNode, currentScope) {  
        let isFunctionExpression = ast.type === ’FunctionExpression’,  
            isFunctionDeclaration = ast.type === ’FunctionDeclaration’;  
 
        if (!isFunctionExpression &&  
            !isFunctionDeclaration) {  
            // Новые области видимости порждают только функции  
            return currentScope;  
        }  
 
        // каждая функция порождает новую область видимости  
        const newScope = new Scope(ast, currentScope);  
 
        ast.params.forEach(param => {  
            // параметры функции доступны внутри функции  
            newScope.add(param.name);  
        });  
 
        if (isFunctionDeclaration) {  
            // имя функции при декларации доступно снаружи функции  
            currentScope.add(ast.id.name);  
        } else {  
            // имя функции-выражения доступно только внутри неё  
            newScope.add(ast.id.name);  
        }  
 
        return newScope;  
    }  
 
    /**  
     * Рекурсивная функция обхода ast  
     *  
     * @param      {object}  astNode  Текущий ast-узел  
     * @param      {Scope}  scope     Область видимости для текущего ast-узла  
     */  
    function _inner(astNode, scope) {  
        if (Array.isArray(astNode)) {  
            astNode.forEach(node => {  
                /* Рекурсивный обход элементов списков.  
                 * Списками являются, например, параметры функций  
                 */  
                _inner(node, scope);  
            });  
        } else if (astNode && typeof astNode === ’object’) {  
            onNodeEnter(astNode, scope);  
 
            const innerScope = resolveScope(astNode, scope),  
                keys = Object.keys(astNode).filter(key => {  
                    // loc - служебное свойство, а не ast-узел  
                    return key !== ’loc’ &&  
                        astNode[key] && typeof astNode[key] === ’object’;  
                });  
 
            keys.forEach(key => {  
                // Обход всех потомков  
                _inner(astNode[key], innerScope);  
            });  
 
            onNodeLeave(astNode, scope);  
        }  
    }  
}  
 
/**  
 * Представление области видимости  
 *  
 * @class      Scope (name)  
 * @param      {object}  astNode      ast-узел, породивший эту область видимости  
 * @param      {object}  parentScope  Родительская область видимости  
 */  
function Scope(astNode, parentScope) {  
    this._node = astNode;  
    this._parent = parentScope;  
    this._vars = new Set();  
}  
 
Scope.prototype = {  
    /**  
     * Добавление имени переменной в область видимости  
     *  
     * @param      {string}  name    имя переменной  
     */  
    add(name) {  
        this._vars.add(name);  
    },  
    /**  
     * Была ли определена переменная с таким именем.  
     *  
     * @param      {string}   name    имя переменной  
     * @return     {boolean}  Встречалась ли переменная с таким именем в доступных областях видимости  
     */  
    isDefined(name) {  
        return this._vars.has(name) || (this._parent && this._parent.isDefined(name));  
    }  
};  
```