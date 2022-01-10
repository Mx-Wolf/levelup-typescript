import {registerHandler} from "./query-string-router"

registerHandler('catalog=string&vendor=string',({catalog,vendor})=>{
  window.console.log({catalog,vendor});
})