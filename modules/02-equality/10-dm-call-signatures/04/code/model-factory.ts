import { createEventManager } from "./event-manager";
import {Model, KeyedRecord} from "./types";

export const createModel = ():Model<KeyedRecord>=>{
  const rowIndex = new Map<number,KeyedRecord>();
  let sortField:string = 'id';
  const rowsChangedManager = createEventManager<Model<KeyedRecord>>();
  const sortChangedManager = createEventManager<Model<KeyedRecord>>();

  return {
    get rows(){
      return [...rowIndex.values()];
    },
    set rows(value: KeyedRecord[]){
      value.forEach((item)=>rowIndex.set(item.id,item));
      rowsChangedManager(this);
    },

    get orderBy(){
      return sortField;
    },
    set orderBy(value:string){
      sortField = value;
      sortChangedManager(this);
    },

    update(row:KeyedRecord){
      if(rowIndex.has(row.id)){
        rowIndex.set(row.id,row);
      }
      throw new RangeError('not found');
    },

    rowsChanged: rowsChangedManager,
    sortChanged: sortChangedManager,
  }

}