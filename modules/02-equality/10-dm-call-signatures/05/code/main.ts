import {createModel} from "./model-factory";
import { KeyedRecord, Model } from "./types";

const compare = (left: unknown, right: unknown):-1|0|1=>{
  if(left<right){
    return -1;
  }
  if(right<left){
    return 1;
  }
  return 0;
}

const handler = (context: Model<KeyedRecord>)=>{
  const body = document.body;
  const field = context.orderBy;
  const ol = document.createElement('ol');
  context.rows.sort((a,b)=>compare(a[field],b[field])).forEach((item)=>{
    const line = document.createElement('li');
    line.innerText = `item: ${item.id}- ${item.name}`;
    ol.appendChild(line);
  })
  body.appendChild(ol);
}

const model = createModel();
model.rowsChanged.subscribe(handler);
model.sortChanged.subscribe(handler);
model.rows = Array.from({length:7},(_,id)=>({id,name:`name: ${Math.floor(30*Math.random())}`}));

setTimeout(()=>{model.orderBy = 'name'},3000);
