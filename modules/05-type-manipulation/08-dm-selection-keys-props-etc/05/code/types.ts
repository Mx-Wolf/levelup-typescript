export type Handler<T extends string> = (props: HandlerProps<T>) => void;

export type HandlerProps<T extends string> =
  string extends T
  ? Record<string, string>
  : (
    T extends `${infer Param}=${infer Value}&${infer Rest}`
    ? (({[K in Param | keyof HandlerProps<Rest>]: string})) // для множества пар поле-значение используем рекурсию
    : (
      T extends `${infer Param}=${infer Value}`
      ? ({[K in Param]:string}) // для единственной пары - используем имя поля в качестве ключа результирующего типа
      : ({}) //когда строка имеет любую другую форму - не используем ключей
    )
  );

type Debug1 = HandlerProps<'category=track&vendor=scania'>
//   ^^^^^^
//type Debug1 = {
//  category: string;
//  vendor: string;
//}
//'Debug1' is declared but never used.ts(6196)

type Debug2 = HandlerProps<'category=tickets'>;
//   ^^^^^^
//type Debug2 = {
//  category: string;
//}
//'Debug2' is declared but never used.ts(6196)
