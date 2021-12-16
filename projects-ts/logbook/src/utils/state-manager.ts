export type StateManager<Context> = {
  getState:()=>Context,
  setState:(next:Context)=>void;
}

export const createStateManager=<T>(init:T):StateManager<T>=>{
  let state = init;
  const setState = (next: T) => { state = next; };
  const getState = ():Readonly<T>=>state;
  return{
    getState,
    setState,
  };
};
