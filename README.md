## Учебный проект «Вычислитель отличий» в рамках курса Hexlet (PHP-разработчик)
[![CI](https://github.com/MT-cod/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/MT-cod/frontend-project-46/actions)
[![Code Climate](https://codeclimate.com/github/MT-cod/frontend-project-46/badges/gpa.svg)](https://codeclimate.com/github/MT-cod/frontend-project-46)
[![Test Coverage](https://codeclimate.com/github/MT-cod/frontend-project-46/badges/coverage.svg)](https://codeclimate.com/github/MT-cod/frontend-project-46/coverage)

<h2>Цель</h2>

<p>Вычислитель отличий – проект, который, по-настоящему, прокачивает даже опытных разработчиков. Здесь пришлось столкнуться с принятием сложных архитектурных решений, автоматизированным тестированием и непрерывной интеграцией, функциональным программированием, работе с древовидными структурами данных и рекурсивными алгоритмами.</p>

<h3>Структуры данных и Алгоритмы</h3>
<p>Выбор правильных структур данных в коде – один из ключей к удачной архитектуре и простому коду. От этого зависит удобство анализа и обработки, количество и сложность условных конструкций.</p>

<p>Главный вопрос в проекте – как описать внутреннее представление дифа между файлами, так чтобы оно было максимально удобно. И хотя для этого существует множество разных способов, лишь некоторые из них приводят к простому коду.</p>

<p>Работа с деревьями и древовидной рекурсией очень хорошо прокачивает алгоритмическое мышление. Это важно, так как реальная обработка сопряжена с постоянной обработкой данных, различными преобразованиями и выводом коллекций.</p>

<h3>Архитектура</h3>
<p>Для построения дифа между двумя структурами нужно проделать множество операций: Чтение файлов, парсинг входящих данных, построение дерева различий, формирование необходимого вывода.</p>

<p>Помимо внутренней архитектуры, в этом проекте появляется необходимость работать с параметрами командной строки. Происходит углубление понимание работы операционных систем в целом и командных интерпретаторов в частности. Для организации этой части кода используется популярная библиотека <a href="https://github.com/docopt/docopt.php" target="_blank" rel="nofollow">docopt.php</a>, архитектура которой, позволяет легко строить консольные утилиты.</p>

<h3>Тестирование и Отладка</h3>
<p>Автоматизированные тесты – неотъемлемая часть профессиональной разработки. Вычислитель отличий идеальный проект для прокачки навыка тестирования. Он достаточно простой и удобный для написания тестов и достаточно сложный для того, чтобы прочувствовать важность этих тестов во время рефакторинга и отладки.</p>

<p>Для написания тестов используется фреймворк <a href="https://phpunit.de/" target="_blank" rel="nofollow">PHPUnit</a></p>
<h2 id="opisanie">Описание</h2>
<p>Вычислитель отличий –&nbsp;программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн-сервисов, например: <a href="http://www.jsondiff.com/" target="_blank">http://www.jsondiff.com/</a>. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.</p>

<p>Возможности утилиты:</p>

<ul>
<li>Поддержка разных входных форматов: yaml и json</li>
<li>Генерация отчета в виде plain text, stylish и json</li>
</ul>

<p>Пример использования:</p>
<pre class="hljs"><code class="shell"><span style="color: #999988;font-style: italic"># формат plain</span>
<span style="color: #008080">$ </span>gendiff.js <span style="color: #000080">--format</span> plain path/to/file.yml another/path/file.json

Property <span style="color: #d14">'common.follow'</span> was added with value: <span style="color: #0086B3">false
</span>Property <span style="color: #d14">'group1.baz'</span> was updated. From <span style="color: #d14">'bas'</span> to <span style="color: #d14">'bars'</span>
Property <span style="color: #d14">'group2'</span> was removed

<span style="color: #999988;font-style: italic"># формат stylish</span>
<span style="color: #008080">$ </span>gendiff.js filepath1.json filepath2.json

<span style="color: #000000;font-weight: bold">{</span>
+ follow: <span style="color: #0086B3">false
  </span>setting1: Value 1
- setting2: 200
- setting3: <span style="color: #0086B3">true</span>
+ setting3: <span style="color: #000000;font-weight: bold">{</span>
  key: value
  <span style="color: #000000;font-weight: bold">}</span>
+ setting4: blah blah
+ setting5: <span style="color: #000000;font-weight: bold">{</span>
  key5: value5
  <span style="color: #000000;font-weight: bold">}</span>
  <span style="color: #000000;font-weight: bold">}</span>
  </code></pre>
</div>

<h3>Аскинемы с примерами:</h3>

<a href="https://asciinema.org/a/HwX4IjYjV6YhX6jvt9GvosWrD">Сравнение плоских файлов (JSON) - asciinema</a>
<br>
<a href="https://asciinema.org/a/JY3Wz4d0U1FKWPs4edWREFnSg">Сравнение плоских файлов (yaml) - asciinema</a>
<br>
<a href="https://asciinema.org/a/Kv81V5RZsYLDOpfzaL5TpCKn1">Stylish формат - asciinema</a>
<br>
<a href="https://asciinema.org/a/o3W5gWcVmrGADGQFvkAxLykFG">Плоский формат - asciinema</a>
<br>
<a href="https://asciinema.org/a/OS4XBf5ARzSuswo5BYOzQRCk7">Вывод в json - asciinema</a>
