export type Handler = <T extends string>(props: HandlerProps<T>) => void;

export type HandlerProps<T extends string> =
  string extends T
  ? Record<string, string>
  : (
    T extends `${infer Param}=${infer Value}&${infer Rest}`
    ? 'a'
    : 'b'
  );

type Debug1 = HandlerProps<'category=track&vendor=scania'>
//   ^^^^^^
//type Debug1 = "a"
//'Debug1' is declared but never used.ts(6196)

type Debug2 = HandlerProps<'category=tickets'>;
//   ^^^^^^
//type Debug2 = "b"
//'Debug2' is declared but never used.ts(6196)