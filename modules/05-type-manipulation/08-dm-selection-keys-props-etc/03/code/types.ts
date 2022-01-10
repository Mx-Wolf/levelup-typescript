export type Handler = <T extends string>(props:HandlerProps<T>)=>void;

export type HandlerProps<T extends string> = 
string extends T
? "a"
: "b";

type Debug1 = HandlerProps<'category=track&vendor=scania'>
//   ^^^^^^
//type Debug1 = "b"
//'Debug1' is declared but never used.ts(6196)

type Debug2 = HandlerProps<string>;
//   ^^^^^^
//type Debug2 = "a"
//'Debug2' is declared but never used.ts(6196)