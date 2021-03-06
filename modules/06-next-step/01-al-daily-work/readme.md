# TypeScript и трудовые будни

В этом курсе мы познакомились с важной стороной TypeScript — статическим анализов программы, который возможен благодаря системам типов. Наличие стадии компиляции и ваше внимательное отношение к предупреждениям анализатора позволяют избавиться от ошибок, связанных с неверным ожиданием значений от переменных со стороны разработчика. При этом TypeScript даёт разработчику множество других возможностей.

Опыт показывает, что вам придётся подойти внимательнее к процессу моделирования системы типов и разработке структуры данных. Зато использование анализатора и компилятора позволит сократить затраты времени и сил на сопровождение приложения. А как известно, разработчики большую часть времени читают существующий код, чем пишут новый. В этом деле TypeScript оказывает хорошую поддержку.

Использование TypeScript имеет определённые отличия для разных сценариев работы:

* При разработке прикладного проекта вы опираетесь на существующие знания и используете npm-пакеты и популярные фреймворки. TypeScript поддерживает вас на протяжении всей работы.
* При переносе проекта из чистого JavaScript в TypeScript придётся внимательно работать над постепенным созданием и внедрением системы типов.
* При написании библиотек или npm-пакетов нужно уделить особое внимание вопросам правильного использования infer.

Какой сценарий будет разворачиваться перед вами и какие навыки вам потребуются — покажет время. Но понимание отношений между типами и манипуляции над ними вам пригодятся в любом из них.
