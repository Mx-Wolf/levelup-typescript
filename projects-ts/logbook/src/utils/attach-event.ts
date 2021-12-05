export const attach = <K extends keyof HTMLElementEventMap>(eventName:K, button:HTMLElement | null,  handler:()=>void)=>{
  if(button === null){
    return;
  }
  button.addEventListener(eventName,handler);
};
