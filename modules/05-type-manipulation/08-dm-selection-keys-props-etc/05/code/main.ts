import {registerHandler} from "./query-string-router"

registerHandler(
  'catalog=string&vendor=string',
  ({
    catalog, // <<---catalog: string
    vendor,  // <<---vendor: string
  })=>{
  window.console.log({catalog,vendor});
})